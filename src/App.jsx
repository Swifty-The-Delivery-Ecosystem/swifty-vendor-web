import "./App.css";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import NavBar from "./components/Navbar";
import Body from "./pages/Body";
import Onboarding from "./pages/Onboarding";
import AddItem from "./pages/AddItem";
import InventoryPage from "./pages/Inventory";

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
        <Route path="/register" element={<Onboarding />} />
        <Route path="/add_items" element={<AddItem />} />
        <Route path="/inventory" element={<InventoryPage />} />
      </Routes>
    </div>
  );
}

export default App;
