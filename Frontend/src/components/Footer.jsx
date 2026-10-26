
import { useState } from "react";

function Footer() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubscribe(e) {
        e.preventDefault();
        setMessage("");

        const trimmedEmail = email.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(trimmedEmail)) {
            setMessage("Please enter a valid email address.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("http://localhost:3000/subscribe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: trimmedEmail }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message || "Subscription successful!");
                setEmail("");
            } else {
                setMessage(data.message || `Request failed (${response.status}).`);
            }
        } catch (error) {
            console.error("Newsletter subscription error:", error);
            setMessage("Could not connect to the server. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <footer className="footer" id="about">
            <form className="newsletter" onSubmit={handleSubscribe}>
                <strong>SIGN UP FOR OUR DAILY INSIDER</strong>

                <div>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? "Sending..." : "Subscribe"}
                    </button>
                </div>

                {message && (
                    <p role="status" aria-live="polite">{message}</p>
                )}
            </form>

            <div className="footer-content">
                <div>
                    <h3>Explore</h3>
                    <a href="/">Home</a>
                    <a href="/#articles">Questions</a>
                    <a href="/#articles">Articles</a>
                    <a href="/#tutorials">Tutorials</a>
                </div>

                <div>
                    <h3>Support</h3>
                    <a href="#">FAQs</a>
                    <a href="#">Help</a>
                    <a href="#">Contact Us</a>
                </div>

                <div>
                    <h3>Stay Connected</h3>
                    <div className="social">
                        <span>f</span>
                        <span>𝕏</span>
                        <span>◎</span>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <strong>DEV@Deakin</strong>

                <div>
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms</a>
                    <a href="#">Code of Conduct</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
