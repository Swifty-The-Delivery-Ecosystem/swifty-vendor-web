import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

export const VendorContext = createContext();

export const useVendor = () => {
  return useContext(VendorContext);
};

export const VendorProvider = ({ children }) => {
  const [vendorData, setVendorData] = useState(null);
  const [isVendorLogged, setIsVendorLogged] = useState(false);

  // if(localStorage.getItem("vendorData")){
  //     setVendorData(localStorage.vendorData);
  // };

  // if(localStorage.getItem("isVendorLogged")){
  //     setIsVendorLogged(localStorage.isVendorLogged);
  // };

  const login = async (username, password) => {};

  const register = async (userData) => {};

  const fetchVendorDetails = async (vendorId, token) => {
    localStorage.getItem("vendorData") &&
      setVendorData(JSON.parse(localStorage.getItem("vendorData")));
    const response = vendorData
      ? vendorData["status"] === "active"
        ? null
        : await fetch(
            `https://auth-six-pi.vercel.app/api/v1/auth/vendors/${vendorId}`,
            {
              method: "GET",
              headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
              },
            }
          )
      : await fetch(
          `https://auth-six-pi.vercel.app/api/v1/auth/vendors/${vendorId}`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        );

    if (response && response.ok) {
      const result = await response.json();
      const data = result.data.user;
      const storedDataString = localStorage.getItem("vendorData");
      const storedData = storedDataString ? JSON.parse(storedDataString) : null;

      if (!storedData || JSON.stringify(storedData) !== JSON.stringify(data)) {
        console.log(JSON.stringify(data));
        console.log(storedDataString);
        console.log(JSON.stringify(storedData) === JSON.stringify(data));
        console.log("data", data);
        setVendorData(data);
        localStorage.setItem("vendorData", JSON.stringify(data));
        localStorage.setItem("isVendorLogged", true);
        setIsVendorLogged(true);
      }
    }
  };

  return (
    <VendorContext.Provider
      value={{
        isVendorLogged,
        vendorData,
        login,
        register,
        fetchVendorDetails,
      }}
    >
      {children}
    </VendorContext.Provider>
  );
};
