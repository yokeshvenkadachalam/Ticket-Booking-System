import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../services/api";
import Navbar from "../../components/Navbar/Navbar";
import { getCurrentUser } from "../../utils/jwt";

function Booking() {

  const { trainId } = useParams();
  const navigate = useNavigate();

  const [passengerName, setPassengerName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  const handleBooking = async () => {

    try {

      const token = localStorage.getItem("token");
      const user = getCurrentUser();

      await API.post(
        "/book-ticket",
        {
          user_id: parseInt(user.sub),
          train_id: parseInt(trainId),
          passenger_name: passengerName,
          age: parseInt(age),
          gender: gender
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Ticket Booked Successfully");

      navigate("/bookings");

    } catch (error) {

      console.log(error);
      alert("Booking Failed");

    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-5">

        <div className="row justify-content-center">

          <div className="col-md-6">

            <div className="card shadow">

              <div className="card-body">

                <h2 className="text-center mb-4">
                  Book Ticket
                </h2>

                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Passenger Name"
                  value={passengerName}
                  onChange={(e) =>
                    setPassengerName(e.target.value)
                  }
                />

                <input
                  type="number"
                  className="form-control mb-3"
                  placeholder="Age"
                  value={age}
                  onChange={(e) =>
                    setAge(e.target.value)
                  }
                />

                <select
                  className="form-control mb-3"
                  value={gender}
                  onChange={(e) =>
                    setGender(e.target.value)
                  }
                >
                  <option value="">
                    Select Gender
                  </option>

                  <option value="Male">
                    Male
                  </option>

                  <option value="Female">
                    Female
                  </option>

                </select>

                <button
                  className="btn btn-success w-100"
                  onClick={handleBooking}
                >
                  Book Ticket
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default Booking;