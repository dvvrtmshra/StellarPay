import { useState } from "react";
import { createWallet, fundWallet, getBalance } from "../api";

export default function Wallet() {
  const [wallet, setWallet] = useState(null);
  const [balances, setBalances] = useState([]);

  async function handleCreate() {
    const w = await createWallet();
    setWallet(w);
  }

  async function handleFund() {
    await fundWallet(wallet.public_key);
    const b = await getBalance(wallet.public_key);
    setBalances(b);
  }

  return (
    <div>
      <h2>Wallet</h2>

      <button onClick={handleCreate}>Create Wallet</button>

      {wallet && (
        <>
          <p><b>Public Key:</b> {wallet.public_key}</p>

          <button onClick={handleFund}>Fund Wallet</button>

          <ul>
            {balances.map((b, i) => (
              <li key={i}>
                {b.asset_type === "native" ? "XLM" : b.asset_code}: {b.balance}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
