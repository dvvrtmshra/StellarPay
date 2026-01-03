import { useState } from "react";
import CreateAccount from "./CreateAccount";
import FundWallet from "./FundWallet";
import SendXLM from "./SendXLM";

export default function Wallet() {
  const [subTab, setSubTab] = useState("create");

  return (
    <div>
      <div className="tabs">
        <button className={subTab === "create" ? "active" : ""} onClick={() => setSubTab("create")}>
          Create
        </button>
        <button className={subTab === "fund" ? "active" : ""} onClick={() => setSubTab("fund")}>
          Fund
        </button>
        <button className={subTab === "send" ? "active" : ""} onClick={() => setSubTab("send")}>
          Send
        </button>
      </div>

      {subTab === "create" && <CreateAccount />}
      {subTab === "fund" && <FundWallet />}
      {subTab === "send" && <SendXLM />}
    </div>
  );
}
