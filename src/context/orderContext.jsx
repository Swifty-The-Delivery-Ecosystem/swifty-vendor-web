import React, { createContext, useState, useEffect } from "react";

export const OrdersContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);
  let isVendorLogged = false;
  let vendorData = null;
  if (localStorage.getItem("isVendorLogged")) {
    isVendorLogged = localStorage.isVendorLogged;
  }

  if (localStorage.getItem("vendorData")) {
    vendorData = JSON.parse(localStorage.vendorData);
  }

  const contextValue = {
    orders,
    setOrders,
    pendingOrders,
    setPendingOrders,
  };

  const handleOrdersFetch = async () => {
    if (isVendorLogged && vendorData && vendorData["status"] == "active") {
      try {
        const response = await fetch(
          "https://order-service-peach.vercel.app/api/v1/order_service/vendor?status=pending",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.token,
            },
          }
        );

        const result = await response.json();
        if (Array.isArray(result)) {
          if (result != orders) {
            setOrders(result);
          }
        } else {
          console.error("Invalid data format for orders:", result);
        }
      } catch (e) {
        console.error("Error fetching orders data:", e);
      }
    }
  };

  const handlePendingOrdersFetch = async () => {
    if (isVendorLogged && vendorData && vendorData["status"] == "active") {
      try {
        const response = await fetch(
          "https://order-service-peach.vercel.app/api/v1/order_service/vendor?status=being%20cooked",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.token,
            },
          }
        );

        const result = await response.json();
        if (Array.isArray(result)) {
          console.log(
            result,
            "Rizzult \n",
            pendingOrders,
            "Damn \n",
            JSON.stringify(result) != JSON.stringify(pendingOrders)
          );
          if (
            JSON.stringify(result) != JSON.stringify(pendingOrders) &&
            window.location.pathname != "/login"
          ) {
            setPendingOrders(result);
          }
        } else {
          console.error("Invalid data format for pending orders:", result);
        }
      } catch (e) {
        console.error("Error fetching pending orders data:", e);
      }
    }
  };

  useEffect(() => {
    handlePendingOrdersFetch();
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    // if (token) {
    const ordersInterval = setInterval(() => {
      handleOrdersFetch();
    }, 5000);

    // const pendingOrdersInterval = setInterval(() => {
    //   handlePendingOrdersFetch();
    // }, 5000);

    // Clear intervals on component unmount
    return () => {
      clearInterval(ordersInterval);
      // clearInterval(pendingOrdersInterval);
    };
    // }
  }, []);

  return (
    <OrdersContext.Provider value={contextValue}>
      {children}
    </OrdersContext.Provider>
  );
};
