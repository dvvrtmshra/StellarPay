from fastapi import FastAPI
from wallet import create_wallet, fund_wallet, get_balance
from payments import send_xlm
from assets import create_trustline, issue_asset
from dex import get_orderbook
from soroban_client import invoke_set, invoke_get

app = FastAPI()

@app.post("/wallet/create")
def wallet_create():
    return create_wallet()

@app.post("/wallet/fund")
def wallet_fund(public_key: str):
    return fund_wallet(public_key)

@app.get("/wallet/balance")
def wallet_balance(public_key: str):
    return get_balance(public_key)

@app.post("/payment/send")
def payment_send(secret_key: str, destination: str, amount: float):
    return send_xlm(secret_key, destination, amount)

@app.post("/asset/trust")
def asset_trust(holder_secret: str, issuer_public: str):
    return create_trustline(holder_secret, issuer_public)

@app.post("/asset/issue")
def asset_issue(issuer_secret: str, destination: str, amount: float):
    return issue_asset(issuer_secret, destination, amount)

@app.get("/dex/orderbook")
def dex_orderbook(
    base_code: str,
    base_issuer: str,
    quote_code: str,
    quote_issuer: str
):
    return get_orderbook(base_code, base_issuer, quote_code, quote_issuer)


@app.post("/contract/set")
def contract_set(secret_key: str, value: int):
    return invoke_set(secret_key, value)

@app.post("/contract/get")
def contract_get(secret_key: str):
    return invoke_get(secret_key)

