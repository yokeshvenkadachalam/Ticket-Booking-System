import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../../utils/jwt";

function ProtectedRoute({
  children,
  adminOnly = false
}) {

  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" />;
  }

  const user = getCurrentUser();

  if (adminOnly && !user?.is_admin) {
    return <Navigate to="/trains" />;
  }

  return children;
}

export default ProtectedRoute;