import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../utils/jwt";

function Navbar() {

  const navigate = useNavigate();

  const user = getCurrentUser();

  const logout = () => {

    localStorage.removeItem("token");

    navigate("/");
  };

  return (

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

      <div className="container">

        <Link
          className="navbar-brand"
          to="/trains"
        >
          Train Booking
        </Link>

        <div className="navbar-nav">

          <Link
            className="nav-link"
            to="/trains"
          >
            Trains
          </Link>

          <Link
            className="nav-link"
            to="/bookings"
          >
            My Bookings
          </Link>

          <Link
            className="nav-link"
            to="/pnr-status"
          >
            PNR Status
          </Link>

          {user?.is_admin && (

            <Link
              className="nav-link"
              to="/admin"
            >
              Admin
            </Link>

          )}

          <button
            className="btn btn-danger ms-3"
            onClick={logout}
          >
            Logout
          </button>

        </div>

      </div>

    </nav>

  );
}

export default Navbar;