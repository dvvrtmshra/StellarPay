from stellar_sdk import (
    Server,
    Network,
    TransactionBuilder,
    Keypair,
    Asset
)

server = Server("https://horizon-testnet.stellar.org")

ASSET_CODE = "STLPAY"


def create_trustline(holder_secret, issuer_public):
    holder_kp = Keypair.from_secret(holder_secret)
    holder_account = server.load_account(holder_kp.public_key)

    asset = Asset(ASSET_CODE, issuer_public)

    tx = (
        TransactionBuilder(
            source_account=holder_account,
            network_passphrase=Network.TESTNET_NETWORK_PASSPHRASE,
            base_fee=100
        )
        .append_change_trust_op(asset)
        .set_timeout(30)
        .build()
    )

    tx.sign(holder_kp)
    server.submit_transaction(tx)

    return {"status": "trustline_created"}


def issue_asset(issuer_secret, destination, amount):
    issuer_kp = Keypair.from_secret(issuer_secret)
    issuer_account = server.load_account(issuer_kp.public_key)

    asset = Asset(ASSET_CODE, issuer_kp.public_key)

    tx = (
        TransactionBuilder(
            source_account=issuer_account,
            network_passphrase=Network.TESTNET_NETWORK_PASSPHRASE,
            base_fee=100
        )
        .append_payment_op(
            destination=destination,
            amount=str(amount),
            asset=asset
        )
        .set_timeout(30)
        .build()
    )

    tx.sign(issuer_kp)
    server.submit_transaction(tx)

    return {"status": "asset_issued"}
