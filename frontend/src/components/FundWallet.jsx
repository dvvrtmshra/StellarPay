import { useState } from "react";
import { fundWallet } from "../api";

export default function FundWallet() {
  const [publicKey, setPublicKey] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleFund() {
    setError("");
    setStatus("");
    setLoading(true);
    try {
      const res = await fundWallet(publicKey);
      setStatus(res.message);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  }

  return (
    <div className="card">
      <h2 className="card-title">Fund Wallet</h2>

      <div className="field">
        <input
          type="text"
          placeholder="Public Key"
          value={publicKey}
          onChange={(e) => setPublicKey(e.target.value)}
        />
      </div>

      <button onClick={handleFund} disabled={!publicKey || loading}>
        Fund Wallet (Testnet)
      </button>

      {loading && <p>Funding...</p>}
      {status && <p>{status}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
}
