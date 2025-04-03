import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { TodoProvider } from "./Contexts/todoContext.jsx";
import { BrowserRouter as Router } from "react-router";
import { AuthProvider } from "./Contexts/authContext.jsx";
import App from "./App.jsx";
import "./index.css";
import ProtectedRoutes from "./views/ProtectedRoutes.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <TodoProvider>
          <ProtectedRoutes>
            <App />
          </ProtectedRoutes>
        </TodoProvider>
      </AuthProvider>
    </Router>
  </StrictMode>
);
