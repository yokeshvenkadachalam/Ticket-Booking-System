import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import Navbar from "../../components/Navbar/Navbar";

function SearchTrain() {

  const navigate = useNavigate();

  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [trains, setTrains] = useState([]);

  const searchTrains = async () => {

    try {

      const response = await API.get(
        `/trains/search?source=${source}&destination=${destination}`
      );

      setTrains(response.data);

    } catch (error) {

      console.log(error);

      alert("Search Failed");

    }

  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <div className="card shadow p-4 mb-4">

          <h2 className="mb-3">
            Search Trains
          </h2>

          <div className="row">

            <div className="col-md-5">

              <input
                className="form-control"
                placeholder="Source"
                value={source}
                onChange={(e) =>
                  setSource(e.target.value)
                }
              />

            </div>

            <div className="col-md-5">

              <input
                className="form-control"
                placeholder="Destination"
                value={destination}
                onChange={(e) =>
                  setDestination(e.target.value)
                }
              />

            </div>

            <div className="col-md-2">

              <button
                className="btn btn-primary w-100"
                onClick={searchTrains}
              >
                Search
              </button>

            </div>

          </div>

        </div>

        <div className="row">

          {trains.map((train) => (

            <div
              className="col-md-4 mb-4"
              key={train.id}
            >

              <div className="card shadow">

                <div className="card-body">

                  <h4>
                    {train.train_name}
                  </h4>

                  <p>
                    Train No:
                    {" "}
                    {train.train_number}
                  </p>

                  <p>
                    {train.source}
                    {" → "}
                    {train.destination}
                  </p>

                  <p>
                    Available Seats:
                    {" "}
                    {train.available_seats}
                  </p>

                  <p>
                    Fare:
                    {" "}
                    ₹{train.fare}
                  </p>

                  <button
                    className="btn btn-success"
                    onClick={() =>
                      navigate(`/book/${train.id}`)
                    }
                  >
                    Book Ticket
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>
    </>
  );
}

export default SearchTrain;