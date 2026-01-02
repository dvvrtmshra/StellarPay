import { useState } from "react";
import { setValue, getValue } from "./api";

export default function App() {
  const [secret, setSecret] = useState("");
  const [value, setVal] = useState("");
  const [stored, setStored] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSet() {
    setError("");
    setLoading(true);
    try {
      await setValue(secret, value);
      const res = await getValue(secret);
      setStored(res.value ?? res);
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
      setStored(res.value ?? res);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  }

  return (
    <div className="container">
      <h1>StellarPay</h1>

      <input
  type="password"
  placeholder="Secret Key"
  value={secret}
  onChange={(e) => setSecret(e.target.value)}
/>


      <input
        type="number"
        placeholder="Value"
        value={value}
        onChange={(e) => setVal(e.target.value)}
      />

      <div className="row">
        <button
  onClick={handleSet}
  disabled={loading || !secret}
>
  Set
</button>

<button
  onClick={handleGet}
  disabled={loading || !secret}
>
  Get
</button>

      </div>

      {loading && <p>Processing...</p>}
      {stored !== null && <p>Stored Value: {stored}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
}
