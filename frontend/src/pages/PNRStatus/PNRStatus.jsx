import { useState } from "react";
import API from "../../services/api";
import Navbar from "../../components/Navbar/Navbar";

function PNRStatus() {

  const [pnr, setPnr] = useState("");
  const [data, setData] = useState(null);

  const checkPNR = async () => {

    try {

      const response = await API.get(
        `/pnr-status/${pnr}`
      );

      setData(response.data);

    } catch {

      alert("PNR Not Found");

    }

  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <div className="card p-4">

          <h2>PNR Status</h2>

          <input
            className="form-control mb-3"
            placeholder="Enter PNR"
            onChange={(e) =>
              setPnr(e.target.value)
            }
          />

          <button
            className="btn btn-primary"
            onClick={checkPNR}
          >
            Check Status
          </button>

        </div>

        {data && (

          <div className="card mt-4 p-3">

            <h4>
              Passenger:
              {" "}
              {data.passenger_name}
            </h4>

            <p>
              PNR:
              {" "}
              {data.pnr_number}
            </p>

            <p>
              Seat:
              {" "}
              {data.seat_number}
            </p>

          </div>

        )}

      </div>
    </>
  );
}

export default PNRStatus;