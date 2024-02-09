import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VendorContext from "../context/vendorContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const vendorContext = useContext(VendorContext);

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      navigate("/");
    }
  });

  const handleLogin = async () => {
    try {
      let response = await fetch(
        "https://auth-six-pi.vercel.app/api/v1/auth/vendors/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: username,
            password: password,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();

        localStorage.setItem("token", data.data.token);
        await vendorContext.fetchVendorDetails(
          data.data.userId,
          data.data.token
        );
        navigate("/");
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Invalid username or password");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("An error occurred during login");
    }
  };

  return (
    <div className="flex md:mx-0 mx-2 items-center min-h-screen overflow-y-hidden justify-center bg-green-100">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-green-500"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-green-500"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mx-auto flex justify-center gap-6 content-center">
          <button
            className="bg-emerald-800 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={handleLogin}
          >
            Login
          </button>
          <a href="/register">
            <button className="bg-emerald-800 text-white px-4 py-2 rounded hover:bg-green-600">
              SignUp
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
