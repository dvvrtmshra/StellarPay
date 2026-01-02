const API = "http://localhost:8000";

export async function createWallet() {
  const res = await fetch(`${API}/wallet/create`, { method: "POST" });
  return res.json();
}

export async function fundWallet(publicKey) {
  const res = await fetch(`${API}/wallet/fund?public_key=${publicKey}`, {
    method: "POST",
  });
  return res.json();
}

export async function getBalance(publicKey) {
  const res = await fetch(`${API}/wallet/balance?public_key=${publicKey}`);
  return res.json();
}
