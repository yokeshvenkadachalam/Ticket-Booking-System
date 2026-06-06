import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handleRegister = async () => {

    try {

      await API.post("/register", {
        name,
        email,
        password,
        phone
      });

      alert("Registration Successful");

    } catch {

      alert("Registration Failed");

    }

  };

  return (
    <div className="container mt-5">

      <div className="row justify-content-center">

        <div className="col-md-6">

          <div className="card shadow">

            <div className="card-body">

              <h2 className="text-center mb-4">
                Register
              </h2>

              <input
                className="form-control mb-3"
                placeholder="Name"
                onChange={(e) =>
                  setName(e.target.value)
                }
              />

              <input
                className="form-control mb-3"
                placeholder="Email"
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

              <input
                className="form-control mb-3"
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

              <input
                className="form-control mb-3"
                placeholder="Phone"
                onChange={(e) =>
                  setPhone(e.target.value)
                }
              />

              <button
                className="btn btn-success w-100"
                onClick={handleRegister}
              >
                Register
              </button>

              <p className="mt-3 text-center">

                Already have an account?

                <Link to="/">
                  {" "}Login
                </Link>

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;