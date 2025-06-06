import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  return isAuthenticated ? children : <Navigate to="/sign-in" replace />;
};

export default ProtectedRoute;
