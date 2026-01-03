from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/account", tags=["account"])

class CreateAccountRequest(BaseModel):
    public_key: str

@router.post("/create")
def create_account(body: CreateAccountRequest):
    return {
        "status": "success",
        "message": "Wallet registered successfully",
        "public_key": body.public_key
    }
