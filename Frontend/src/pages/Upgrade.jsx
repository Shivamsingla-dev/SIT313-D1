
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Upgrade.css";

function Upgrade() {
    const [cardName, setCardName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user") || "null");

    async function handleUpgrade(e) {
        e.preventDefault();
        setMessage("");
        setError("");

        if (!localStorage.getItem("token") || !user) {
            navigate("/login");
            return;
        }

        if (user.plan === "Paid") {
            setError("You are already on the Paid plan.");
            return;
        }

        const digits = cardNumber.replace(/\s/g, "");

        if (!cardName.trim() || !/^\d{16}$/.test(digits) ||
            !/^\d{2}\/\d{2}$/.test(expiry) ||
            !/^\d{3,4}$/.test(cvv)) {
            setError("Please enter valid payment form details.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("http://localhost:3000/api/upgrade", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ plan: "Paid" }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Upgrade failed.");
            }

            localStorage.setItem(
                "user",
                JSON.stringify({ ...user, plan: "Paid" })
            );
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

    return (
        <main className="upgrade-page">
            <section className="upgrade-card">
                <h1>Upgrade Your Plan</h1>
                <p>Enter your details to upgrade to the Paid plan.</p>

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

                    <p className="payment-note">
                        Demonstration form only. No payment will be processed.
                        Do not enter real card details.
                    </p>

                    {error && <p className="upgrade-error">{error}</p>}
                    {message && <p role="status">{message}</p>}

                    <button type="submit" disabled={loading}>
                        {loading ? "Processing..." : "Upgrade to Paid"}
                    </button>
                </form>
            </section>
        </main>
    );
}

export default Upgrade;
