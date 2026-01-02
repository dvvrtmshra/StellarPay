from stellar_sdk import Server, Asset

server = Server("https://horizon-testnet.stellar.org")


def asset_from_input(code: str, issuer: str):
    """
    Convert user input into a Stellar Asset.
    XLM is native and has NO issuer.
    """
    if code.upper() == "XLM":
        return Asset.native()

    if not issuer:
        raise ValueError("Issuer is required for non-native assets")

    return Asset(code, issuer)


def get_orderbook(base_code, base_issuer, quote_code, quote_issuer):
    """
    Fetch orderbook for base/quote pair.
    Example: STLPAY / XLM
    """
    base_asset = asset_from_input(base_code, base_issuer)
    quote_asset = asset_from_input(quote_code, quote_issuer)

    orderbook = server.orderbook(
        selling=base_asset,
        buying=quote_asset
    ).call()

    best_bid = orderbook["bids"][0] if orderbook["bids"] else None
    best_ask = orderbook["asks"][0] if orderbook["asks"] else None

    return {
        "pair": f"{base_code}/{quote_code}",
        "best_bid": best_bid,
        "best_ask": best_ask
    }
