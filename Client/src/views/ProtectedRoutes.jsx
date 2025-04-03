// import { Children } from "react"

import { useNavigate } from "react-router";
import { useAuth } from "../Contexts/authContext";
import { useEffect } from "react";

function ProtectedRoutes({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAuthenticated) navigate("/login");
    },
    [isAuthenticated, navigate]
  );

  return children;
}

export default ProtectedRoutes;
