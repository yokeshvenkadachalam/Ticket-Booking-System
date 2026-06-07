import { useEffect, useState } from "react";
import API from "../../services/api";

function Admin() {
const [trains, setTrains] = useState([]);
const [bookings, setBookings] = useState([]);

const [form, setForm] = useState({
train_number: "",
train_name: "",
source: "",
destination: "",
departure_time: "",
arrival_time: "",
available_seats: "",
fare: ""
});

useEffect(() => {
fetchTrains();
fetchBookings();
}, []);

const fetchTrains = async () => {
const response = await API.get("/admin/trains");
setTrains(response.data);
};

const fetchBookings = async () => {
const response = await API.get("/admin/bookings");
setBookings(response.data);
};

const addTrain = async (e) => {
e.preventDefault();

```
await API.post("/admin/train", form);

alert("Train Added Successfully");

fetchTrains();

setForm({
  train_number: "",
  train_name: "",
  source: "",
  destination: "",
  departure_time: "",
  arrival_time: "",
  available_seats: "",
  fare: ""
});
```

};

const deleteTrain = async (id) => {
await API.delete(`/admin/train/${id}`);

```
alert("Train Deleted");

fetchTrains();
```

};

return ( <div className="container mt-4">

```
  <h2 className="mb-4">Admin Dashboard</h2>

  <div className="card p-4 mb-4">

    <h4>Add Train</h4>

    <form onSubmit={addTrain}>

      <input
        className="form-control mb-2"
        placeholder="Train Number"
        value={form.train_number}
        onChange={(e) =>
          setForm({
            ...form,
            train_number: e.target.value
          })
        }
      />

      <input
        className="form-control mb-2"
        placeholder="Train Name"
        value={form.train_name}
        onChange={(e) =>
          setForm({
            ...form,
            train_name: e.target.value
          })
        }
      />

      <input
        className="form-control mb-2"
        placeholder="Source"
        value={form.source}
        onChange={(e) =>
          setForm({
            ...form,
            source: e.target.value
          })
        }
      />

      <input
        className="form-control mb-2"
        placeholder="Destination"
        value={form.destination}
        onChange={(e) =>
          setForm({
            ...form,
            destination: e.target.value
          })
        }
      />

      <label className="form-label">
        Departure Time
      </label>

      <input
        type="time"
        className="form-control mb-2"
        value={form.departure_time.replace(":00", "")}
        onChange={(e) =>
          setForm({
            ...form,
            departure_time: e.target.value + ":00"
          })
        }
      />

      <label className="form-label">
        Arrival Time
      </label>

      <input
        type="time"
        className="form-control mb-2"
        value={form.arrival_time.replace(":00", "")}
        onChange={(e) =>
          setForm({
            ...form,
            arrival_time: e.target.value + ":00"
          })
        }
      />

      <input
        type="number"
        className="form-control mb-2"
        placeholder="Seats"
        value={form.available_seats}
        onChange={(e) =>
          setForm({
            ...form,
            available_seats: Number(e.target.value)
          })
        }
      />

      <input
        type="number"
        className="form-control mb-3"
        placeholder="Fare"
        value={form.fare}
        onChange={(e) =>
          setForm({
            ...form,
            fare: Number(e.target.value)
          })
        }
      />

      <button className="btn btn-success">
        Add Train
      </button>

    </form>

  </div>

  <div className="card p-4 mb-4">

    <h4>All Trains</h4>

    <table className="table">

      <thead>
        <tr>
          <th>ID</th>
          <th>Train</th>
          <th>Route</th>
          <th></th>
        </tr>
      </thead>

      <tbody>

        {trains.map((train) => (

          <tr key={train.id}>

            <td>{train.id}</td>

            <td>{train.train_name}</td>

            <td>
              {train.source} → {train.destination}
            </td>

            <td>

              <button
                className="btn btn-danger btn-sm"
                onClick={() =>
                  deleteTrain(train.id)
                }
              >
                Delete
              </button>

            </td>

          </tr>

        ))}

      </tbody>

    </table>

  </div>

  <div className="card p-4">

    <h4>All Bookings</h4>

    <table className="table">

      <thead>
        <tr>
          <th>ID</th>
          <th>Passenger</th>
          <th>PNR</th>
          <th>Seat</th>
        </tr>
      </thead>

      <tbody>

        {bookings.map((booking) => (

          <tr key={booking.id}>

            <td>{booking.id}</td>

            <td>{booking.passenger_name}</td>

            <td>{booking.pnr_number}</td>

            <td>{booking.seat_number}</td>

          </tr>

        ))}

      </tbody>

    </table>

  </div>

</div>

);
}

export default Admin;
