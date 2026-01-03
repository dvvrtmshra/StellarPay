import { useState } from "react";
import { getBalance } from "../api";

export default function Balance() {
  const [publicKey, setPublicKey] = useState("");
  const [balances, setBalances] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleGetBalance() {
    setError("");
    setLoading(true);
    try {
      const res = await getBalance(publicKey);
      setBalances(res);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  }

  return (
    <div className="card">
      <h2 className="card-title">Wallet Balance</h2>

      <div className="field">
        <input
          type="text"
          placeholder="Public Key"
          value={publicKey}
          onChange={(e) => setPublicKey(e.target.value)}
        />
      </div>

      <button onClick={handleGetBalance} disabled={!publicKey || loading}>
        Get Balance
      </button>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {balances.length > 0 && (
        <ul>
          {balances.map((b, i) => (
            <li key={i}>
              {b.asset_code || "XLM"} : {b.balance}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
