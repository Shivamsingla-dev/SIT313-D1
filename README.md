# DEV@Deakin — D1 Subscription Application

## Project Overview

DEV@Deakin is a web application developed for the SIT313 Secure Frontend Applications D1 Subscription task. It provides user authentication, session management, and a subscription interface where users can view Free and Paid plans and demonstrate an upgrade to a Paid subscription.

## Features

- **User Registration:** Validates user details and securely hashes passwords using bcrypt.
- **User Login:** Verifies credentials and returns a signed JSON Web Token (JWT).
- **Session Management:** Stores the JWT in localStorage and uses React Context to manage authentication state.
- **Logout:** Clears the saved authentication information.
- **Pricing Page:** Displays Free and Paid subscription plans.
- **Upgrade Plan:** Provides a payment-details modal with form validation for demonstration purposes.
- **Firebase Integration:** Stores user profiles and subscription plans in Cloud Firestore.
- **Backend Validation:** Protects authenticated endpoints using JWT verification.

## Technologies Used

- React
- Vite
- React Router
- Node.js
- Express.js
- Firebase Authentication
- Cloud Firestore
- JSON Web Tokens (JWT)
- bcryptjs
- CSS

## Project Structure

```text
SIT313 D1/
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── AuthContext.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── Backend/
    ├── server.js
    ├── firebaseAdmin.js
    ├── package.json
    └── .gitignore
```

## Setup and Installation

### 1. Clone the repository

```bash
git clone https://github.com/Shivamsingla-dev/SIT313-D1.git
cd SIT313-D1
```

### 2. Configure the backend

```bash
cd Backend
npm install
```

Create a `.env` file with the required configuration:

```env
JWT_SECRET=your_strong_random_secret
SENDGRID_API_KEY=your_sendgrid_api_key
```

Configure Firebase Admin SDK credentials using a service account key stored securely on your local machine. Do not commit credentials or secret values to the repository.

Start the backend:

```bash
npm start
```

The backend runs at `http://localhost:3000`.

### 3. Configure the frontend

Open another terminal:

```bash
cd Frontend
npm install
npm run dev
```

Open the local URL displayed by Vite, usually `http://localhost:5173`.

## Subscription Workflow

1. Register a new account.
2. Log in using the registered credentials.
3. View the available subscription plans on the Pricing page.
4. Select Upgrade Plan while using the Free plan.
5. Enter valid demonstration payment-form details.
6. On successful validation, the account's subscription plan is updated to Paid in Firestore.
7. A user already on the Paid plan cannot upgrade again.

## Security Notes

- Environment variables and Firebase service account credentials must remain private.
- The `node_modules` directory should not be committed.
- JWTs are signed and expire after the configured validity period.
- The payment form is for demonstration only. No real payment is processed.

## Academic Context

**Unit:** SIT313 — Secure Frontend Applications  
**Task:** D1 — Subscription

This project demonstrates frontend and backend integration, authentication, session management, data persistence, and subscription-plan handling.

## Author

Shivam Singla
