from fastapi import APIRouter, Depends
from sqlalchemy import text
from app.config.database import engine
from app.schemas.booking_schema import BookingCreate
from app.config.security import get_current_user
import random

router = APIRouter()


# BOOK TICKET
@router.post("/book-ticket")
def book_ticket(
    data: BookingCreate,
    current_user=Depends(get_current_user)
):

    pnr = "PNR" + str(random.randint(100000, 999999))

    with engine.connect() as connection:

        # Check available seats
        seat_query = text("""
            SELECT available_seats
            FROM trains
            WHERE id = :train_id
        """)

        seat_result = connection.execute(
            seat_query,
            {
                "train_id": data.train_id
            }
        ).fetchone()

        if not seat_result:
            return {
                "message": "Train Not Found"
            }

        if seat_result.available_seats <= 0:
            return {
                "message": "No Seats Available"
            }

        # Insert booking
        booking_query = text("""
            INSERT INTO bookings
            (
                user_id,
                train_id,
                passenger_name,
                age,
                gender,
                seat_number,
                pnr_number
            )
            VALUES
            (
                :user_id,
                :train_id,
                :passenger_name,
                :age,
                :gender,
                :seat_number,
                :pnr_number
            )
        """)

        connection.execute(
            booking_query,
            {
                "user_id": data.user_id,
                "train_id": data.train_id,
                "passenger_name": data.passenger_name,
                "age": data.age,
                "gender": data.gender,
                "seat_number": "S1-01",
                "pnr_number": pnr
            }
        )

        # Reduce seat count
        update_query = text("""
            UPDATE trains
            SET available_seats = available_seats - 1
            WHERE id = :train_id
        """)

        connection.execute(
            update_query,
            {
                "train_id": data.train_id
            }
        )

        connection.commit()

    return {
        "message": "Ticket Booked Successfully",
        "pnr": pnr,
        "seat": "S1-01",
        "user": current_user["email"]
    }


# MY BOOKINGS
@router.get("/my-bookings/{user_id}")
def my_bookings(
    user_id: int,
    current_user=Depends(get_current_user)
):

    with engine.connect() as connection:

        query = text("""
            SELECT *
            FROM bookings
            WHERE user_id = :user_id
        """)

        result = connection.execute(
            query,
            {
                "user_id": user_id
            }
        )

        bookings = []

        for row in result:
            bookings.append({
                "id": row.id,
                "user_id": row.user_id,
                "train_id": row.train_id,
                "passenger_name": row.passenger_name,
                "age": row.age,
                "gender": row.gender,
                "seat_number": row.seat_number,
                "pnr_number": row.pnr_number,
                "booking_date": str(row.booking_date)
            })

        return bookings


# CANCEL TICKET
@router.delete("/cancel-ticket/{pnr}")
def cancel_ticket(
    pnr: str,
    current_user=Depends(get_current_user)
):

    with engine.connect() as connection:

        # Find booking
        find_query = text("""
            SELECT train_id
            FROM bookings
            WHERE pnr_number = :pnr
        """)

        booking = connection.execute(
            find_query,
            {
                "pnr": pnr
            }
        ).fetchone()

        if not booking:
            return {
                "message": "PNR Not Found"
            }

        train_id = booking.train_id

        # Delete booking
        delete_query = text("""
            DELETE FROM bookings
            WHERE pnr_number = :pnr
        """)

        connection.execute(
            delete_query,
            {
                "pnr": pnr
            }
        )

        # Restore seat
        update_query = text("""
            UPDATE trains
            SET available_seats = available_seats + 1
            WHERE id = :train_id
        """)

        connection.execute(
            update_query,
            {
                "train_id": train_id
            }
        )

        connection.commit()

    return {
        "message": "Ticket Cancelled Successfully",
        "pnr": pnr,
        "user": current_user["email"]
    }