from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.auth import router as auth_router
from app.routes.trains import router as train_router
from app.routes.bookings import router as booking_router
from app.routes.admin import router as admin_router

app = FastAPI(
    title="Train Ticket Booking System API"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(train_router)
app.include_router(booking_router)
app.include_router(admin_router)

@app.get("/")
def home():
    return {
        "message": "Train Ticket Booking System API Running"
    }

@app.get("/health")
def health():
    return {
        "status": "healthy"
    }