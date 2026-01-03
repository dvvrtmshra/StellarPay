from fastapi import APIRouter, HTTPException
from stellar_sdk import Keypair, Server
import requests

router = APIRouter(prefix="/wallet", tags=["wallet"])
server = Server("https://horizon-testnet.stellar.org")

@router.post("/create")
def create_wallet():
    keypair = Keypair.random()
    return {
        "public_key": keypair.public_key,
        "secret_key": keypair.secret
    }

@router.post("/fund")
def fund_wallet(public_key: str):
    url = f"https://friendbot.stellar.org/?addr={public_key}"
    res = requests.get(url)

    if res.status_code != 200:
        raise HTTPException(status_code=400, detail="Funding failed")

    return {
        "status": "success",
        "message": "Wallet funded on testnet"
    }

@router.get("/balance")
def get_balance(public_key: str):
    account = server.accounts().account_id(public_key).call()
    return account["balances"]
