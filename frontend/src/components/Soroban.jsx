import { useState } from "react";
import { setValue, getValue } from "../api";

export default function Soroban() {
  const [secret, setSecret] = useState("");
  const [value, setVal] = useState("");
  const [stored, setStored] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSet() {
    setError("");
    setLoading(true);
    try {
      await setValue(secret, value);
      const res = await getValue(secret);
      setStored(
        typeof res === "object"
          ? JSON.stringify(res, null, 2)
          : String(res)
      );
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  }

  async function handleGet() {
    setError("");
    setLoading(true);
    try {
      const res = await getValue(secret);
      setStored(
        typeof res === "object"
          ? JSON.stringify(res, null, 2)
          : String(res)
      );
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  }

  return (
  <div className="card">
    <h2 className="card-title">Soroban</h2>

    <div className="field">
      <input
        type="password"
        placeholder="Secret Key"
        value={secret}
        onChange={(e) => setSecret(e.target.value)}
      />
    </div>

    <div className="field">
      <input
        type="number"
        placeholder="Value"
        value={value}
        onChange={(e) => setVal(e.target.value)}
      />
    </div>

    <div className="actions">
      <button onClick={handleSet} disabled={loading || !secret}>
        Set
      </button>
      <button onClick={handleGet} disabled={loading || !secret}>
        Get
      </button>
    </div>

    {loading && <p>Processing...</p>}
    {stored && <pre>{stored}</pre>}
    {error && <p className="error">{error}</p>}
  </div>
);
}