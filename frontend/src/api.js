const API = "http://127.0.0.1:8000";

/* ---------- Soroban ---------- */
export async function setValue(secret, value) {
  const res = await fetch(
    `${API}/contract/set?secret_key=${secret}&value=${value}`,
    { method: "POST" }
  );
  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || "Set failed");
  return data;
}

export async function getValue(secret) {
  const res = await fetch(
    `${API}/contract/get?secret_key=${secret}`,
    { method: "POST" }
  );
  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || "Get failed");
  return data;
}

/* ---------- Wallet ---------- */
export async function createWallet() {
  const res = await fetch(`${API}/wallet/create`, {
    method: "POST",
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || "Wallet creation failed");
  return data;
}

export async function createAccount(publicKey) {
  const res = await fetch(`${API}/account/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ public_key: publicKey }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || "Account creation failed");
  return data;
}

export async function fundWallet(publicKey) {
  const res = await fetch(
    `${API}/wallet/fund?public_key=${publicKey}`,
    { method: "POST" }
  );
  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || "Funding failed");
  return data;
}

export async function getBalance(publicKey) {
  const res = await fetch(
    `${API}/wallet/balance?public_key=${publicKey}`
  );
  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || "Failed to fetch balance");
  return data;
}

/* ---------- Payments ---------- */
export async function sendXLM(secret, destination, amount) {
  const res = await fetch(
    `${API}/payment/send?secret_key=${secret}&destination=${destination}&amount=${amount}`,
    { method: "POST" }
  );
  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || "Payment failed");
  return data;
}
