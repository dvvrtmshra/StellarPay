import { useState } from "react";
import Soroban from "./components/Soroban";
import Balance from "./components/Balance";
import FundWallet from "./components/FundWallet";
import CreateAccount from "./components/CreateAccount";
import Wallet from "./components/Wallet";



export default function App() {
  const [tab, setTab] = useState("soroban");

  return (
    <div className="container">
      <h1>StellarPay</h1>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={tab === "soroban" ? "active" : ""}
          onClick={() => setTab("soroban")}
        >
          Soroban
        </button>

        <button
          className={tab === "balance" ? "active" : ""}
          onClick={() => setTab("balance")}
        >
          Balance
        </button>

        <button
          className={tab === "wallet" ? "active" : ""}
          onClick={() => setTab("wallet")}
        >
          Wallet
        </button>
      </div>

      {/* Content */}
      {tab === "soroban" && <Soroban />}
      {tab === "balance" && <Balance />}
      {tab === "wallet" && <Wallet />}

    </div>
  );
}
