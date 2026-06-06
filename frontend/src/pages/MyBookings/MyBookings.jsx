import { useEffect, useState } from "react";
import API from "../../services/api";
import Navbar from "../../components/Navbar/Navbar";
import { getCurrentUser } from "../../utils/jwt";

function MyBookings() {

  const [bookings, setBookings] = useState([]);

  useEffect(() => {

    fetchBookings();

  }, []);

  const fetchBookings = async () => {

    const token = localStorage.getItem("token");

    const user = getCurrentUser();

    const response = await API.get(
      `/my-bookings/${user.sub}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setBookings(response.data);

  };

  const cancelTicket = async (pnr) => {

    const token = localStorage.getItem("token");

    await API.delete(
      `/cancel-ticket/${pnr}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    fetchBookings();

  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <h2>My Bookings</h2>

        <table className="table table-bordered table-striped">

          <thead>

            <tr>

              <th>Passenger</th>

              <th>PNR</th>

              <th>Seat</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {bookings.map((booking) => (

              <tr key={booking.id}>

                <td>
                  {booking.passenger_name}
                </td>

                <td>
                  {booking.pnr_number}
                </td>

                <td>
                  {booking.seat_number}
                </td>

                <td>

                  <button
                    className="btn btn-danger"
                    onClick={() =>
                      cancelTicket(
                        booking.pnr_number
                      )
                    }
                  >
                    Cancel
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
    </>
  );
}

export default MyBookings;