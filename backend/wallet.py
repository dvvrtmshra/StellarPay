from stellar_sdk import Keypair, Server, Network
import requests

server = Server("https://horizon-testnet.stellar.org")

def create_wallet():
    keypair = Keypair.random()
    return {
        "public_key": keypair.public_key,
        "secret_key": keypair.secret
    }

def fund_wallet(public_key):
    url = f"https://friendbot.stellar.org?addr={public_key}"
    r = requests.get(url)
    r.raise_for_status()
    return {"status": "funded"}

def get_balance(public_key):
    account = server.accounts().account_id(public_key).call()
    return account["balances"]
