from fastapi import APIRouter
from sqlalchemy import text
from app.config.database import engine

router = APIRouter(prefix="/admin")


@router.get("/trains")
def get_all_trains():

    with engine.connect() as connection:

        result = connection.execute(
            text("SELECT * FROM trains")
        )

        return [
            dict(row._mapping)
            for row in result
        ]


@router.post("/train")
def add_train(data: dict):

    with engine.connect() as connection:

        query = text("""
            INSERT INTO trains(
                train_number,
                train_name,
                source,
                destination,
                departure_time,
                arrival_time,
                available_seats,
                fare
            )
            VALUES(
                :train_number,
                :train_name,
                :source,
                :destination,
                :departure_time,
                :arrival_time,
                :available_seats,
                :fare
            )
        """)

        connection.execute(query, data)

        connection.commit()

    return {
        "message": "Train Added Successfully"
    }


@router.delete("/train/{train_id}")
def delete_train(train_id: int):

    with engine.connect() as connection:

        connection.execute(
            text("""
                DELETE FROM trains
                WHERE id=:id
            """),
            {"id": train_id}
        )

        connection.commit()

    return {
        "message": "Train Deleted Successfully"
    }


@router.get("/bookings")
def get_all_bookings():

    with engine.connect() as connection:

        result = connection.execute(
            text("""
                SELECT *
                FROM bookings
            """)
        )

        return [
            dict(row._mapping)
            for row in result
        ]