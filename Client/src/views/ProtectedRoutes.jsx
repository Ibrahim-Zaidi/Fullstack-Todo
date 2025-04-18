import { useAuth } from "../Contexts/authContext";
import { Navigate } from "react-router-dom";

function ProtectedRoutes({ children }) {
  const { isAuthenticated, isLoading, user } = useAuth();
  // console.log(user);
  console.log(isAuthenticated, isLoading, user);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoutes;
