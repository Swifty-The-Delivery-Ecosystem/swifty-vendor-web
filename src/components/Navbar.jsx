import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSearch } from "../context/searchContext";
import swiftyLogo from "../assets/swifty-white.png";
import { useNavigate } from "react-router-dom";
import {
  faBars,
  faMagnifyingGlass,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  const { search, setSearch } = useSearch();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    setSearch("");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.setItem("isVendorLogged", false);
    localStorage.removeItem("vendorData");
    navigate("/login");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-emerald-800 sticky z-50 top-0 p-4 flex items-center justify-between">
      {/* Left Section - Search */}
      {/* Logo */}
      <img
        src={swiftyLogo}
        alt="Logo"
        className="md:w-14 w-8 rounded-full shadow-md"
      />

      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search"
          className="bg-green-100 text-black px-2 md:px-4 py-2 rounded focus:outline-none focus:shadow-outline"
          value={search}
          onChange={handleInputChange}
        />
        <button className="mx-3 md:block hidden">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            style={{ color: "white" }}
            onClick={handleSearch}
          />
        </button>
      </div>

      {/* Mobile Menu Hamburger Icon */}
      <div className="md:hidden">
        <button onClick={toggleMobileMenu}>
          <FontAwesomeIcon icon={faBars} style={{ color: "white" }} />
        </button>
      </div>

      {/* Right Section - Navigation Links */}
      <div className="hidden md:flex items-center">
        <a href="/" className="text-white mr-8 font-semibold">
          Home
        </a>
        <a href="/inventory" className="text-white mr-8 font-semibold">
          Inventory
        </a>
        <a href="/delivery_partner" className="text-white mr-8 font-semibold">
          Delivery Partner
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

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 flex flex-col justify-evenly items-center bg-white shadow-md pb-5 z-20">
          <a
            href="/"
            className="text-xl font-medium p-2"
            onClick={toggleMobileMenu}
          >
            Home
          </a>
          <a
            href="/inventory"
            className="text-xl font-medium p-2"
            onClick={toggleMobileMenu}
          >
            Inventory
          </a>
          <a
            href="/delivery_partner"
            className="text-xl font-medium p-2"
            onClick={toggleMobileMenu}
          >
            Delivery Partner
          </a>
          <div
            onClick={handleLogout}
            className="text-xl cursor-pointer font-medium p-2"
          >
            Logout
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
