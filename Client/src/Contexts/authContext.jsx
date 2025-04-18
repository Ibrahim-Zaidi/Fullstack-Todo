import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import api from "../api/axios";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  async function is_auth() {
    try {
      setIsLoading(true);

      const response = await api.get("/main/me");

      console.log(response.data);

      setUser(response.data.token);
      setIsAuthenticated(true);
      setError("");

      return true;
    } catch (err) {
      setUser(null);
      setIsAuthenticated(false);
      setError(err.message);

      return false;
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    is_auth();
  }, []);

  // login

  async function login(identifier, password) {
    try {
      // console.log(identifier, password);

      const response = await api.post("/login", { identifier, password });
      console.log(response);
      setIsAuthenticated(false);
      const isAuthSuccess = await is_auth();
      return isAuthSuccess;
    } catch (err) {
      setError("Login failed");
      return false;
    }
  }

  return (
    <AuthContext.Provider
      value={{ login, user, isAuthenticated, error, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");

  return context;
}

export { useAuth, AuthProvider };
