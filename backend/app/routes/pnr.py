from fastapi import APIRouter
from sqlalchemy import text
from app.config.database import engine

router = APIRouter()

@router.get("/pnr-status/{pnr}")
def pnr_status(pnr: str):

    with engine.connect() as connection:

        query = text("""
            SELECT * FROM bookings
            WHERE pnr_number = :pnr
        """)

        result = connection.execute(
            query,
            {
                "pnr": pnr
            }
        )

        row = result.fetchone()

        if not row:
            return {"message": "PNR Not Found"}

        return {
            "pnr_number": row.pnr_number,
            "passenger_name": row.passenger_name,
            "age": row.age,
            "gender": row.gender,
            "seat_number": row.seat_number,
            "booking_date": str(row.booking_date)
        }