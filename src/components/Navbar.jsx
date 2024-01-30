import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useSearch } from "../context/searchContext";
import swiftyLogo from "../assets/swifty-white.png";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const { search, setSearch } = useSearch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    setSearch("");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <nav className="bg-emerald-800 sticky top-0 p-4 flex items-center justify-between">
      {/* Left Section - Search */}
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search"
          className="bg-green-100 text-black px-4 py-2 rounded focus:outline-none focus:shadow-outline"
          value={search}
          onChange={handleInputChange}
        />
        <button className="mx-3">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            style={{ color: "white" }}
            onClick={handleSearch}
          />
        </button>
      </div>
      <img
        src={swiftyLogo}
        alt="Logo"
        className="max-w-14 rounded-full shadow-md"
      />

      <div className="flex items-center">
        <a href="#" className="text-white mr-8 font-semibold">
          Home
        </a>
        <a href="#" className="text-white mr-8 font-semibold">
          Analytics
        </a>
        <a href="#" className="text-white mr-8 font-semibold">
          Support
        </a>
        <div
          onClick={handleLogout}
          className="text-white mr-8 cursor-pointer font-semibold"
        >
          <FontAwesomeIcon
            icon={faRightFromBracket}
            style={{ color: "white" }}
          />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
