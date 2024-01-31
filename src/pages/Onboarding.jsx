import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Onboarding = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const options = ["Kanhar", "Indravati", "MSH", "Mess Block", "Delta"];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const [formData, setFormData] = useState({
    email: "adityasererdyuidfsds@iitbhilai.ac.in",
    ownerName: "adismort",
    restaurantName: "adiStore",
    password: "bt",
    confirmPassword: "bt",
    location: 1,
    phone: "8369504378",
    unsupportedLocation: "",
    supported_location: [1, 2],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData.password);
    console.log(formData.confirmPassword);

    if (formData.password !== formData.confirmPassword) {
      alert("Password and Confirm Password do not match.");
      return;
    }

    const response = await fetch(
      "https://auth-six-pi.vercel.app/api/v1/auth/vendors/register",
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    const data = await response.json();
    console.log(data);

    if (response.ok) {
      // Navigate to the login page upon successful registration
      navigate("/login");
    } else {
      // Handle registration error
      alert("Registration failed. Please try again.");
    }

    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-green-100">
      <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-4 pt-12">
        Welcome to Vendor Onboarding.
      </h2>
      <div className="lg:w-1/2 md:w-2/3 mx-auto mt-[80px] bg-white p-10 rounded-xl">
        <div className="flex flex-wrap -m-2">
          <div className="p-2 w-1/2">
            <div className="relative">
              <label for="name" className="leading-7 text-base text-black">
                Registered Owner Name
              </label>
              <input
                type="text"
                id="name"
                name="ownerName"
                className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <div className="p-2 w-1/2">
            <div className="relative">
              <label for="email" className="leading-7 text-base text-black">
                Owner's Contact No.
              </label>
              <input
                type="text"
                id="text"
                name="phone"
                // onChange={handleChange}
                className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <div className="p-2 w-1/2">
            <div className="relative">
              <label for="name" className="leading-7 text-base text-black">
                Registered Store Name
              </label>
              <input
                type="text"
                id="name"
                name="restaurantName"
                onChange={handleChange}
                className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <div className="p-2 w-1/2">
            <div className="relative">
              <label for="email" className="leading-7 text-base text-black">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <div className="p-2 w-1/2">
            <div className="relative">
              <label for="name" className="leading-7 text-base text-black">
                Password
              </label>
              <input
                type="password"
                id="name"
                name="password"
                onChange={handleChange}
                className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <div className="p-2 w-1/2">
            <div className="relative">
              <label for="password" className="leading-7 text-base text-black">
                Confirm Password
              </label>
              <input
                type="password"
                id="password"
                name="confirmPassword"
                onChange={handleChange}
                className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <div className="p-2 w-1/2">
            <div className="relative">
              <label
                for="email"
                className="leading-7 text-base text-black mb-2"
              >
                Registered Store Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                // onChange={handleChange}
                className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <div className="p-2 w-1/2 ">
            <div className="leading-7 text-base text-black">
              Unsupported Delivery Locations:
            </div>
            <div className="relative inline-block text-left mt-1">
              <div>
                <span className="rounded-md shadow-sm">
                  <button
                    type="button"
                    onClick={toggleDropdown}
                    className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-700"
                    id="options-menu"
                    name="unsupportedLocation"
                    aria-haspopup="true"
                    aria-expanded="true"
                  >
                    {selectedOption || "Select an option"}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-5 w-5 pl-2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                </span>
              </div>

              {isOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-[170px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    {options.map((option) => (
                      <div
                        key={option}
                        onClick={() => handleOptionClick(option)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                        role="menuitem"
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>{" "}
          <div className="p-2 w-full mt-8">
            {/* <Link to="/login"> */}
            <button
              className="flex mx-auto text-white bg-emerald-700 border-0 py-2 px-8 focus:outline-none hover:bg-emerald-800 rounded text-lg"
              onClick={handleSubmit}
            >
              Register
            </button>
            {/* </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
