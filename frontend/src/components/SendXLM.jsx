import { useState } from "react";
import { sendXLM } from "../api";

export default function SendXLM() {
  const [secretKey, setSecretKey] = useState("");
  const [destination, setDestination] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  async function handleSend() {
    setError("");
    setStatus("");

    if (!secretKey || !destination || !amount) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await sendXLM(secretKey, destination, amount);
      setStatus("XLM sent successfully");
      setAmount("");
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  }

  return (
    <div className="card">
      <h2 className="card-title">Send XLM</h2>

      <div className="field">
        <input
          type="password"
          placeholder="Sender Secret Key"
          value={secretKey}
          onChange={(e) => setSecretKey(e.target.value)}
        />
      </div>

      <div className="field">
        <input
          type="text"
          placeholder="Destination Public Key"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>

      <div className="field">
        <input
          type="number"
          placeholder="Amount (XLM)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <button onClick={handleSend} disabled={loading}>
        {loading ? "Sending..." : "Send XLM"}
      </button>

      {status && <p>{status}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
}
