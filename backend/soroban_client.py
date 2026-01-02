from stellar_sdk import (
    Keypair,
    Network,
    TransactionBuilder,
    Server,
    SorobanServer,
    scval,
)
from stellar_sdk.xdr import SCVal

# -----------------------------
# Network configuration
# -----------------------------
HORIZON_URL = "https://horizon-testnet.stellar.org"
SOROBAN_RPC_URL = "https://soroban-testnet.stellar.org"
NETWORK_PASSPHRASE = Network.TESTNET_NETWORK_PASSPHRASE

# ✅ Contract deployed with `app`
CONTRACT_ID = "CB5ARBIGCUCMRT3RBLD53GMGIXLR7O42WXFWCLUBM4UDIIEDSJNF6HSJ"

# -----------------------------
# Servers
# -----------------------------
horizon_server = Server(HORIZON_URL)
soroban_server = SorobanServer(SOROBAN_RPC_URL)


# -----------------------------
# Invoke: set(value)
# -----------------------------
def invoke_set(secret_key: str, value: int):
    kp = Keypair.from_secret(secret_key)
    account = horizon_server.load_account(kp.public_key)

    tx = (
        TransactionBuilder(
            source_account=account,
            network_passphrase=NETWORK_PASSPHRASE,
            base_fee=100
        )
        .append_invoke_contract_function_op(
            contract_id=CONTRACT_ID,
            function_name="set",
            parameters=[scval.to_int128(value)]
        )
        .set_timeout(30)
        .build()
    )

    # 🔑 Soroban flow
    simulation = soroban_server.simulate_transaction(tx)
    tx = soroban_server.prepare_transaction(tx, simulation)

    # 🔥 SIGN AFTER prepare
    tx.sign(kp)

    response = horizon_server.submit_transaction(tx)

    return {
        "tx_hash": response["hash"],
        "status": "value set"
    }


# -----------------------------
# Invoke: get()
# -----------------------------
def invoke_get(secret_key: str):
    kp = Keypair.from_secret(secret_key)
    account = horizon_server.load_account(kp.public_key)

    tx = (
        TransactionBuilder(
            source_account=account,
            network_passphrase=NETWORK_PASSPHRASE,
            base_fee=100
        )
        .append_invoke_contract_function_op(
            contract_id=CONTRACT_ID,
            function_name="get",
            parameters=[]
        )
        .set_timeout(30)
        .build()
    )

    # 🔑 Soroban flow
    simulation = soroban_server.simulate_transaction(tx)
    tx = soroban_server.prepare_transaction(tx, simulation)

    # 🔥 SIGN AFTER prepare
    tx.sign(kp)

    response = horizon_server.submit_transaction(tx)

    # 🔥 DECODE RETURN VALUE (THIS WAS MISSING)
    scval_result = scval.from_xdr(simulation.results[0].xdr)

    return {
        "tx_hash": response["hash"],
        "value": scval_result
    }
