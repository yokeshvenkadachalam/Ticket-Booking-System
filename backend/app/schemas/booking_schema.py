from pydantic import BaseModel

class BookingCreate(BaseModel):
    user_id: int
    train_id: int
    passenger_name: str
    age: int
    gender: str