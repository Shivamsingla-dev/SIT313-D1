
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext.jsx";
import "./Pricing.css";
import "./Upgrade.css";

function Pricing() {
    const [showModal, setShowModal] = useState(false);
    const [cardName, setCardName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { user, setUser } = useAuth();
    const token = localStorage.getItem("token");

    async function handleUpgrade(e) {
        e.preventDefault();
        setMessage("");
        setError("");

        if (!token || !user) {
            setShowModal(false);
            navigate("/login");
            return;
        }

        if (user.plan === "Paid") {
            setError("You are already on the Paid plan.");
            return;
        }

        const digits = cardNumber.replace(/\s/g, "");
        const expiryMatch = expiry.match(/^(0[1-9]|1[0-2])\/(\d{2})$/);

        if (
            !cardName.trim() ||
            !/^\d{16}$/.test(digits) ||
            !expiryMatch ||
            !/^\d{3,4}$/.test(cvv)
        ) {
            setError("Please enter valid payment form details.");
            return;
        }

        const month = Number(expiryMatch[1]);
        const year = 2000 + Number(expiryMatch[2]);
        const now = new Date();
        const expiryDate = new Date(year, month);

        if (expiryDate <= new Date(now.getFullYear(), now.getMonth())) {
            setError("Your card has expired. Please enter a valid expiry date.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("http://localhost:3000/api/upgrade", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ plan: "Paid" }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Upgrade failed.");
            }

            const updatedUser = { ...user, plan: "Paid" };
            localStorage.setItem("user", JSON.stringify(updatedUser));
            setUser(updatedUser);
            setMessage("Your plan has been upgraded to Paid!");
        } catch (err) {
            setError(
                err.message === "Failed to fetch"
                    ? "Cannot connect to the server."
                    : err.message
            );
        } finally {
            setLoading(false);
        }
    }

    function openUpgrade() {
        setError("");
        setMessage("");

        if (!token || !user) {
            navigate("/login");
            return;
        }

        if (user.plan === "Paid") {
            setError("You are already on the Paid plan.");
            return;
        }

        setShowModal(true);
    }

    return (
        <main className="pricing-page">
            <section className="pricing-heading">
                <h1>Simple Plans for Every Developer</h1>
                <p>Choose the plan that suits your learning journey.</p>
                {error && !showModal && <p className="upgrade-error">{error}</p>}
            </section>

            <section className="pricing-cards">
                <article className="pricing-card">
                    <h2>Free Plan</h2>
                    <p className="pricing-price">$0 <span>/ forever</span></p>
                    <ul>
                        <li>Browse articles and tutorials</li>
                        <li>Read community posts</li>
                        <li>Limited post creation</li>
                        <li>Basic image uploads</li>
                    </ul>
                    <button
                        type="button"
                        className="pricing-button"
                        onClick={() => navigate("/register")}
                    >
                        Get Started
                    </button>
                </article>

                <article className="pricing-card paid-plan">
                    <h2>Paid Plan</h2>
                    <p className="pricing-price">$9 <span>/ month</span></p>
                    <ul>
                        <li>All Free plan features</li>
                        <li>More posts and tutorials</li>
                        <li>Higher image upload limits</li>
                        <li>Enhanced creator features</li>
                    </ul>
                    <button
                        type="button"
                        className="pricing-button"
                        onClick={openUpgrade}
                        disabled={loading}
                    >
                        {user?.plan === "Paid" ? "Current Paid Plan" : "Upgrade Plan"}
                    </button>
                </article>
            </section>

            {showModal && (
                <div
                    className="upgrade-modal-backdrop"
                    onMouseDown={(e) => {
                        if (e.target === e.currentTarget && !loading) {
                            setShowModal(false);
                        }
                    }}
                >
                    <section
                        className="upgrade-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="upgrade-title"
                    >
                        <button
                            type="button"
                            className="upgrade-modal-close"
                            onClick={() => setShowModal(false)}
                            disabled={loading}
                            aria-label="Close upgrade form"
                        >
                            ×
                        </button>

                        <h2 id="upgrade-title">Upgrade to Paid</h2>
                        <p>Demonstration form only. No payment will be processed.</p>

                        <form onSubmit={handleUpgrade}>
                            <label htmlFor="cardName">Name on Card</label>
                            <input
                                id="cardName"
                                value={cardName}
                                onChange={(e) => setCardName(e.target.value)}
                                autoComplete="cc-name"
                                required
                            />

                            <label htmlFor="cardNumber">Card Number</label>
                            <input
                                id="cardNumber"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                inputMode="numeric"
                                autoComplete="cc-number"
                                placeholder="16-digit test number"
                                maxLength={19}
                                required
                            />

                            <div className="upgrade-row">
                                <div>
                                    <label htmlFor="expiry">Expiry (MM/YY)</label>
                                    <input
                                        id="expiry"
                                        value={expiry}
                                        onChange={(e) => setExpiry(e.target.value)}
                                        placeholder="MM/YY"
                                        autoComplete="cc-exp"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="cvv">CVV</label>
                                    <input
                                        id="cvv"
                                        type="password"
                                        value={cvv}
                                        onChange={(e) => setCvv(e.target.value)}
                                        autoComplete="cc-csc"
                                        inputMode="numeric"
                                        maxLength={4}
                                        required
                                    />
                                </div>
                            </div>

                            {error && <p className="upgrade-error">{error}</p>}
                            {message && <p role="status">{message}</p>}

                            <button type="submit" disabled={loading || Boolean(message)}>
                                {loading ? "Processing..." : "Upgrade to Paid"}
                            </button>

                            {message && (
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                >
                                    Close
                                </button>
                            )}
                        </form>
                    </section>
                </div>
            )}
        </main>
    );
}

export default Pricing;
