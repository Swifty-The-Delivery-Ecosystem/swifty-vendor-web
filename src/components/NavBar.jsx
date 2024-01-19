import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { SearchContext } from "../App";
import swiftyLogo from "../assets/swifty-white.png"; // Import the logo

const NavBar = () => {
  const { search, setSearch } = useContext(SearchContext);

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    setSearch("");
  };

  return (
    <nav className="bg-emerald-800 p-4 flex items-center justify-between">
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

      {/* Center Section - Logo */}
      <img src={swiftyLogo} alt="Logo" className="max-w-14 rounded-full shadow-md" />

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
          <FontAwesomeIcon icon={faRightFromBracket} style={{ color: "white" }} />
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
