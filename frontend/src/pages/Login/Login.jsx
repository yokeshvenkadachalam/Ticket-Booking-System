import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../../services/api";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {

    try {

      const response = await API.post(
        `/login?email=${email}&password=${password}`
      );

      localStorage.setItem(
        "token",
        response.data.access_token
      );

      navigate("/trains");

    } catch {

      alert("Login Failed");

    }

  };

  return (
    <div className="container mt-5">

      <div className="row justify-content-center">

        <div className="col-md-5">

          <div className="card shadow">

            <div className="card-body">

              <h2 className="text-center mb-4">
                Login
              </h2>

              <input
                className="form-control mb-3"
                type="email"
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

              <button
                className="btn btn-primary w-100"
                onClick={handleLogin}
              >
                Login
              </button>

              <p className="mt-3 text-center">

                Don't have an account?

                <Link to="/register">
                  {" "}Register
                </Link>

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;