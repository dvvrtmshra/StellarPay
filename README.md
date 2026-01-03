# StellarPay 🚀

A minimal full‑stack demo app built on the **Stellar Testnet**, showcasing wallet creation, funding, XLM payments, balance checks, and Soroban smart‑contract interactions — wrapped in a clean, minimal dark UI.

---

## ✨ Features

### 🔐 Wallet
- Create a Stellar wallet in‑app
- Copy **public & secret keys**
- Fund wallet using **Friendbot (Testnet)**
- Check account balances

### 💸 Payments
- Send XLM via **secret‑key signing**
- No Freighter dependency (demo‑safe & reliable)

### 📜 Soroban
- Interact with a Soroban smart contract
- `set(value)` and `get()` functions
- Uses simulate → prepare → sign → submit flow

### 🎨 UI
- Minimal nude dark theme
- Centered, responsive layout
- Copy‑friendly key display
- Clean UX optimized for demos

---

## 🛠 Tech Stack

**Frontend**
- React (Vite)
- Custom CSS (minimal dark theme)

**Backend**
- FastAPI
- `stellar-sdk`
- Stellar Horizon (Testnet)
- Soroban RPC

---

## 📂 Project Structure

```bash .
├── backend/
│ ├── app.py
│ ├── wallet.py
│ ├── payments.py
│ ├── soroban_client.py
│ └── account.py
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── api.js
│ │ ├── App.jsx
│ │ └── index.css
│ └── main.jsx
│
└── README.md
```

---

## 🚀 Getting Started

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app:app --reload
```

Backend runs at:
```bash 
http://127.0.0.1:8000
Swagger docs:
http://127.0.0.1:8000/docs
```
### Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at:
```bash
http://localhost:5173
```
### 🧪 Demo Flow
```bash
Wallet → Create

Create wallet in‑app

Copy public & secret key

Wallet → Fund

Fund wallet via Friendbot (Testnet)

Balance

Paste public key → view balances

Wallet → Send

Paste sender secret key

Paste destination public key

Send XLM

Soroban

Use secret key

Set a value

Get stored value from contract
```
### ⚠️ Notes

1. Runs only on Stellar Testnet

2. Secret keys are exposed for demo purposes

3. Do NOT use mainnet keys

4. Freighter support is optional

### 🧠 Design Choice

For demo reliability, this app allows direct secret‑key signing on testnet instead of relying on browser wallets.

This ensures:

1. No extension issues

2. Predictable behavior

3. Smooth judge experience

### 📌 Future Improvements
1. Mainnet support

2. Freighter‑only signing mode

3. Transaction history

4. Better Soroban value decoding

👨‍💻 Author
Dev Vrat Mishra
# Built with ❤️ using Stellar & Soroban

