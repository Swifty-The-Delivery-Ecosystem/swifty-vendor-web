import "./App.css";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import NavBar from "./components/Navbar";
import Body from "./pages/Body";
import AddItem from "./pages/AddItem";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add_items" element={<AddItem />} />
      </Routes>
      </div>
  );
}

export default App;
