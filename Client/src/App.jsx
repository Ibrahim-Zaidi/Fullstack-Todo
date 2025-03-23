import { BrowserRouter, Routes, Route } from "react-router";
import Main from "./views/Main";
import Register from "./views/Register";
import Login from "./views/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/main" element={<Main />} />
        <Route path="/register" element={<Register />} />
        <Route index path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
