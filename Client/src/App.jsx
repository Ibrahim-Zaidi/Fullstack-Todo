import { Routes, Route } from "react-router";
import Main from "./views/Main";
import Register from "./views/Register";
import Login from "./views/Login";

function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route index path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
