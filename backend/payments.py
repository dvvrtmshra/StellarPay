from stellar_sdk import (
    Server,
    Network,
    TransactionBuilder,
    Keypair,
    Asset
)

server = Server("https://horizon-testnet.stellar.org")

def send_xlm(secret_key, destination, amount):
    source_keypair = Keypair.from_secret(secret_key)
    source_account = server.load_account(source_keypair.public_key)

    tx = (
        TransactionBuilder(
            source_account=source_account,
            network_passphrase=Network.TESTNET_NETWORK_PASSPHRASE,
            base_fee=100
        )
        .append_payment_op(
            destination=destination,
            amount=str(amount),
            asset=Asset.native()
        )
        .set_timeout(30)
        .build()
    )

    tx.sign(source_keypair)
    response = server.submit_transaction(tx)

    return {
        "hash": response["hash"],
        "ledger": response["ledger"]
    }
