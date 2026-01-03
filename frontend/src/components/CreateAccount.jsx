import { useState } from "react";
import { createWallet, createAccount } from "../api";
import { connect, getPublicKey } from "@stellar/freighter-api";

export default function CreateAccount() {
  const [publicKey, setPublicKey] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  // 1️⃣ Create wallet in-app
  async function handleCreateWallet() {
    setError("");
    setStatus("");
    try {
      const w = await createWallet();
      setPublicKey(w.public_key);
      setSecretKey(w.secret_key);
    } catch (e) {
      setError(e.message);
    }
  }

  // 2️⃣ Connect via Freighter (optional)
  async function handleFreighter() {
    setError("");
    setStatus("");
    try {
      await connect();
      const pk = await getPublicKey();
      setPublicKey(pk);
      setSecretKey("");
    } catch {
      setError("Freighter not available or permission denied");
    }
  }

  // 3️⃣ Register wallet
  async function handleRegister() {
    if (!publicKey) {
      setError("Public key required");
      return;
    }

    try {
      const res = await createAccount(publicKey);
      setStatus(res.message);
    } catch (e) {
      setError(e.message);
    }
  }

  function copy(text) {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard");
  }

  return (
    <div className="card">
      <h2 className="card-title">Wallet Setup</h2>

      {/* Option 1 */}
      <button onClick={handleCreateWallet}>
        Create New Wallet (In‑App)
      </button>

      {/* Option 2 */}
      <button onClick={handleFreighter}>
        Connect with Freighter (Coming Soon)
      </button>

      {/* Option 3 */}
      <div className="field">
        <input
          type="text"
          placeholder="Or paste public key manually"
          value={publicKey}
          onChange={(e) => setPublicKey(e.target.value)}
        />
      </div>

      {/* Display keys */}
      {publicKey && (
        <>
          <p><b>Public Key</b></p>
          <pre>{publicKey}</pre>
          <button onClick={() => copy(publicKey)}>
            Copy Public Key
          </button>
        </>
      )}

      {secretKey && (
        <>
          <p style={{ color: "#f87171", fontWeight: "600" }}>
            Secret Key (SAVE THIS – shown once)
          </p>
          <pre>{secretKey}</pre>
          <button onClick={() => copy(secretKey)}>
            Copy Secret Key
          </button>
        </>
      )}

      <button onClick={handleRegister}>
        Register Wallet
      </button>

      {status && <p>{status}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
}
