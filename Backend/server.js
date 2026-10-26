const { admin, db, auth } = require("./firebaseAdmin");
const { FieldValue } = require("firebase-admin/firestore");
const cors = require("cors");
const express = require("express");
const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const app = express();
app.use(cors());
const PORT = 3000;

// Set the SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Allow Express to read JSON data
app.use(express.json());

// Serve the frontend files
app.use(express.static(__dirname));

// Handle newsletter subscriptions
app.post("/subscribe", async (req, res) => {

    const email = req.body.email;

    if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        return res.status(400).json({
            message: "Please enter a valid email address."
        });
    }
    const message = {
        to: email,
        from: "shivamsingla972@gmail.com",
        subject: "Welcome to DEV@Deakin",
        text: "Thank you for subscribing to the DEV@Deakin Daily Insider!",
        html: `
            <h2>Welcome to DEV@Deakin!</h2>
            <p>Thank you for subscribing to our Daily Insider.</p>
            <p>You will receive our latest updates and news.</p>
        `
    };


    try {
        const [sendGridResponse] = await sgMail.send(message);

        console.log("SendGrid API Status:", sendGridResponse.statusCode);
        console.log("Welcome email accepted for:", email);

        return res.status(200).json({
            message: "Thank you for subscribing! A welcome email has been requested."
        });

    } catch (error) {
        console.error(
            "Email error:",
            error.response?.body || error.message
        );

        return res.status(500).json({
            message: "The email could not be sent. Please try again."
        });
    }


});


const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Authentication token required."
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token."
        });
    }
}


// Register a new user
app.post("/api/register", async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        if (
            !firstName?.trim() ||
            !lastName?.trim() ||
            !email?.trim() ||
            typeof password !== "string" ||
            password.length < 8
        ) {
            return res.status(400).json({
                message: "Please provide valid details and a password of at least 8 characters."
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const existingUser = await auth.getUserByEmail(normalizedEmail)
            .catch((error) => {
                if (error.code === "auth/user-not-found") return null;
                throw error;
            });

        if (existingUser) {
            return res.status(409).json({
                message: "This email is already registered."
            });
        }

        const passwordHash = await bcrypt.hash(password, 12);

        const userRecord = await auth.createUser({
            email: normalizedEmail,
            password,
            displayName: `${firstName.trim()} ${lastName.trim()}`
        });

        await db.collection("users").doc(userRecord.uid).set({
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: normalizedEmail,
            passwordHash,
            plan: "Free",
            createdAt: FieldValue.serverTimestamp()
        });

        return res.status(201).json({
            message: "Registration successful. Please log in."
        });
    } catch (error) {
        console.error("Registration error:", error.message);
        return res.status(500).json({
            message: "Registration failed. Please try again."
        });
    }
});

// Login and return a signed JWT
app.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (
            typeof email !== "string" ||
            typeof password !== "string" ||
            !email.trim() ||
            !password
        ) {
            return res.status(400).json({
                message: "Email and password are required."
            });
        }

        const userRecord = await auth.getUserByEmail(
            email.trim().toLowerCase()
        );

        const userDoc = await db.collection("users")
            .doc(userRecord.uid).get();

        if (!userDoc.exists) {
            return res.status(401).json({
                message: "Invalid email or password."
            });
        }

        const userData = userDoc.data();
        const passwordMatches = await bcrypt.compare(
            password,
            userData.passwordHash || ""
        );

        if (!passwordMatches) {
            return res.status(401).json({
                message: "Invalid email or password."
            });
        }

        const token = jwt.sign(
            { uid: userRecord.uid, email: userRecord.email },
            process.env.JWT_SECRET,
            { expiresIn: "2h" }
        );

        return res.status(200).json({
            message: "Login successful.",
            token,
            user: {
                uid: userRecord.uid,
                email: userRecord.email,
                firstName: userData.firstName,
                lastName: userData.lastName,
                plan: userData.plan || "Free"
            }
        });
    } catch (error) {
        if (error.code === "auth/user-not-found") {
            return res.status(401).json({
                message: "Invalid email or password."
            });
        }

        console.error("Login error:", error.message);
        return res.status(500).json({
            message: "Login failed. Please try again."
        });
    }
});


app.get("/api/me", verifyToken, async (req, res) => {
    try {
        const userRecord = await auth.getUser(req.user.uid);
        const userDoc = await db.collection("users")
            .doc(userRecord.uid)
            .get();

        if (!userDoc.exists) {
            return res.status(404).json({
                message: "User profile not found."
            });
        }

        const userData = userDoc.data();

        return res.status(200).json({
            user: {
                uid: userRecord.uid,
                email: userRecord.email,
                firstName: userData.firstName,
                lastName: userData.lastName,
                plan: userData.plan || "Free"
            }
        });
    } catch (error) {
        console.error("Session verification error:", error.message);
        return res.status(401).json({
            message: "Unable to verify user session."
        });
    }
});


app.post("/api/upgrade", verifyToken, async (req, res) => {
    try {
        const userId = req.user.uid;

        const userDocRef = db.collection("users").doc(userId);
        const userDoc = await userDocRef.get();

        if (!userDoc.exists) {
            return res.status(404).json({
                message: "User profile not found."
            });
        }

        const userData = userDoc.data();

        if (userData.plan === "Paid") {
            return res.status(409).json({
                message: "You are already on the Paid plan."
            });
        }

        await userDocRef.update({
            plan: "Paid",
            upgradedAt: FieldValue.serverTimestamp()
        });

        return res.status(200).json({
            message: "Your plan has been upgraded to Paid.",
            plan: "Paid"
        });
    } catch (error) {
        console.error("Upgrade error:", error.message);

        return res.status(500).json({
            message: "Unable to upgrade your plan. Please try again."
        });
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});