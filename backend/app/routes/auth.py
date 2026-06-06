from fastapi import APIRouter, HTTPException
from sqlalchemy import text
from app.config.database import engine
from app.schemas.user_schema import UserCreate
from app.config.security import (
    hash_password,
    verify_password,
    create_access_token
)

router = APIRouter()


@router.post("/register")
def register(user: UserCreate):

    hashed_password = hash_password(
        user.password
    )

    with engine.connect() as connection:

        query = text("""
            INSERT INTO users
            (
                name,
                email,
                password,
                phone
            )
            VALUES
            (
                :name,
                :email,
                :password,
                :phone
            )
        """)

        connection.execute(
            query,
            {
                "name": user.name,
                "email": user.email,
                "password": hashed_password,
                "phone": user.phone
            }
        )

        connection.commit()

    return {
        "message": "User Registered Successfully"
    }


@router.post("/login")
def login(
    email: str,
    password: str
):

    with engine.connect() as connection:

        query = text("""
            SELECT *
            FROM users
            WHERE email = :email
        """)

        user = connection.execute(
            query,
            {
                "email": email
            }
        ).fetchone()

    if not user:

        raise HTTPException(
            status_code=401,
            detail="Invalid Email"
        )

    if not verify_password(
        password,
        user.password
    ):

        raise HTTPException(
            status_code=401,
            detail="Invalid Password"
        )

    token = create_access_token(
        {
            "sub": str(user.id),
            "email": user.email,
            "is_admin": bool(user.is_admin)
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }