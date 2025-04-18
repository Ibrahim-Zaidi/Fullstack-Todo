import { Routes, Route } from "react-router";
import Main from "./views/Main";
import Register from "./views/Register";
import Login from "./views/Login";
import ProtectedRoutes from "./views/ProtectedRoutes.jsx";

function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        index
        path="/"
        element={
          <ProtectedRoutes>
            <Main />
          </ProtectedRoutes>
        }
      />
    </Routes>
  );
}

export default App;
