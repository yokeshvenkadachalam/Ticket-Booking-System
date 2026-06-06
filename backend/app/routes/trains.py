from fastapi import APIRouter, Query
from sqlalchemy import text
from app.config.database import engine

router = APIRouter()


@router.get("/trains")
def get_trains():

    with engine.connect() as connection:

        query = text("SELECT * FROM trains")

        result = connection.execute(query)

        trains = []

        for row in result:

            trains.append({
                "id": row.id,
                "train_number": row.train_number,
                "train_name": row.train_name,
                "source": row.source,
                "destination": row.destination,
                "departure_time": str(row.departure_time),
                "arrival_time": str(row.arrival_time),
                "available_seats": row.available_seats,
                "fare": float(row.fare)
            })

        return trains


@router.get("/trains/search")
def search_trains(
    source: str = Query(...),
    destination: str = Query(...)
):

    with engine.connect() as connection:

        query = text("""
            SELECT *
            FROM trains
            WHERE LOWER(source) LIKE LOWER(:source)
            AND LOWER(destination) LIKE LOWER(:destination)
        """)

        result = connection.execute(
            query,
            {
                "source": f"%{source}%",
                "destination": f"%{destination}%"
            }
        )

        trains = []

        for row in result:

            trains.append({
                "id": row.id,
                "train_number": row.train_number,
                "train_name": row.train_name,
                "source": row.source,
                "destination": row.destination,
                "departure_time": str(row.departure_time),
                "arrival_time": str(row.arrival_time),
                "available_seats": row.available_seats,
                "fare": float(row.fare)
            })

        return trains


@router.get("/pnr-status/{pnr}")
def pnr_status(pnr: str):

    with engine.connect() as connection:

        query = text("""
            SELECT
                passenger_name,
                pnr_number,
                seat_number,
                booking_date
            FROM bookings
            WHERE pnr_number = :pnr
        """)

        result = connection.execute(
            query,
            {
                "pnr": pnr
            }
        ).fetchone()

    if not result:

        return {
            "message": "PNR Not Found"
        }

    return {
        "passenger_name": result.passenger_name,
        "pnr_number": result.pnr_number,
        "seat_number": result.seat_number,
        "booking_date": str(result.booking_date)
    }