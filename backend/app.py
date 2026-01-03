from fastapi import FastAPI
import account
import wallet
from fastapi.middleware.cors import CORSMiddleware
from payments import send_xlm
from assets import create_trustline, issue_asset
from dex import get_orderbook
from soroban_client import invoke_set, invoke_get

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for demo only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Routers
app.include_router(account.router)
app.include_router(wallet.router)

# Payments
@app.post("/payment/send")
def payment_send(secret_key: str, destination: str, amount: float):
    return send_xlm(secret_key, destination, amount)

# Assets
@app.post("/asset/trust")
def asset_trust(holder_secret: str, issuer_public: str):
    return create_trustline(holder_secret, issuer_public)

@app.post("/asset/issue")
def asset_issue(issuer_secret: str, destination: str, amount: float):
    return issue_asset(issuer_secret, destination, amount)

# DEX
@app.get("/dex/orderbook")
def dex_orderbook(
    base_code: str,
    base_issuer: str,
    quote_code: str,
    quote_issuer: str
):
    return get_orderbook(base_code, base_issuer, quote_code, quote_issuer)

# Soroban
@app.post("/contract/set")
def contract_set(secret_key: str, value: int):
    return invoke_set(secret_key, value)

@app.post("/contract/get")
def contract_get(secret_key: str):
    return invoke_get(secret_key)
