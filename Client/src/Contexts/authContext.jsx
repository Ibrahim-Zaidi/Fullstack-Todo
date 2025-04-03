import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import api from "../api/axios";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function is_auth() {
    try {
      const response = await api().get("/main/me");

      if (!response) throw new Error("something went weong");

      const data = response.data;

      if (!data) throw new Error("data didnt fetch");

      setUser(data.user_id);
      setIsAuthenticated(true);
      setError("");
    } catch (err) {
      setUser(null);
      setIsAuthenticated(false);
      setError(err);
    }
  }

  useEffect(function () {
    is_auth();
  }, []);

  async function login(email, password) {
    try {
      const response = await api().post("/login", { email, password });

      if (!response) throw new Error("login failed");

      await is_auth();
      navigate("/");
      return true;
    } catch (err) {
      setError(err.message || "login failed");
      return false;
    }
  }

  return (
    <AuthContext.Provider value={{ login, user, isAuthenticated, error }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("something went wrong");

  return context;
}

export { useAuth, AuthProvider };
