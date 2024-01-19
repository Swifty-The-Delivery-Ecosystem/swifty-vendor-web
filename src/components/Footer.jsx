import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-emerald-800 text-white pb-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="mt-4 flex space-x-4">
          <a href="#" className="hover:text-gray-300">
            Support
          </a>
        </div>

        <p className="mt-4 text-gray-200 text-center">
          &copy; 2024 Swifty Food Delivery. All rights reserved.
        </p>

        <div className="mt-4 flex items-center">
          <p className="mr-4">Follow us:</p>
          <a href="#" className="text-gray-200 hover:text-gray-300 ml-4">
            <FontAwesomeIcon icon={faTwitter} size="2x" />
          </a>
          <a href="#" className="text-gray-200 hover:text-gray-300 ml-4">
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
