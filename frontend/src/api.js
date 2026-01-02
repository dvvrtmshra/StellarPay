const API = "http://127.0.0.1:8000";

export async function setValue(secret, value) {
  const res = await fetch(
    `${API}/contract/set?secret_key=${secret}&value=${value}`,
    { method: "POST" }
  );

  if (!res.ok) {
    throw new Error("Set failed");
  }

  return res.json();
}

export async function getValue(secret) {
  const res = await fetch(
    `${API}/contract/get?secret_key=${secret}`,
    { method: "POST" }
  );

  if (!res.ok) {
    throw new Error("Get failed");
  }

  return res.json();
}
