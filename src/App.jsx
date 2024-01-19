import React, { createContext, useState } from "react";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Body from "./components/Body";
import Footer from "./components/Footer";
import ogOrders from "./data/newOrders";

// index.js or App.js
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faMagnifyingGlass,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";

library.add(faMagnifyingGlass, faRightFromBracket, faInstagram, faTwitter);

export const NewOrderContext = createContext(ogOrders);
export const SearchContext = createContext("");

export default function App() {
  const [newOrders, setNewOrders] = useState(ogOrders);
  const [search, setSearch] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Add your actual login logic here
    // For simplicity, let's assume login is successful when called
    setIsLoggedIn(true);
  };

  return (
    <>
      <NewOrderContext.Provider value={{ newOrders, setNewOrders }}>
        <SearchContext.Provider value={{ search, setSearch }}>
          <NavBar />
          {isLoggedIn ? <Body /> : <Login onLogin={handleLogin} />}
        </SearchContext.Provider>
      </NewOrderContext.Provider>
      <Footer />
    </>
  );
}
