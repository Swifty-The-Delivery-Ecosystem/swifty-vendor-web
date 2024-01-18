import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  return (
    <nav className="bg-emerald-800 p-4 flex items-center justify-between">
      {/* Left Section - Search */}
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search"
          className="bg-green-100 text-black px-4 py-2 rounded focus:outline-none focus:shadow-outline"
        />
        <button className="mx-3">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            style={{ color: "white" }}
          />
        </button>
      </div>

      {/* Center Section - Logo */}
      <div className="text-white text-lg font-semibold">Logo</div>

      {/* Right Section - Navigation Links */}
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
        <a href="#" className="text-white mr-8 font-semibold">
          <FontAwesomeIcon
            icon={faRightFromBracket}
            style={{ color: "white" }}
          />
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
