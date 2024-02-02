import React, { createContext, useContext, useState, useEffect } from "react";
import ogOrders from "../sampleData/newOrders";

const OrdersContext = createContext();

export const useOrders = () => {
  return useContext(OrdersContext);
};

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(ogOrders);
  const [pendingOrders, setPendingOrders] = useState([]);

  const contextValue = {
    orders,
    setOrders,
    pendingOrders,
    setPendingOrders,
  };

  const handleOrdersFetch = async () => {
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
      console.log(result);
      setOrders(result);
    } catch (e) {}
  };

  const handlePendingOrdersFetch = async () => {
    try {
      const response = await fetch(
        "https://order-service-peach.vercel.app/api/v1/order_service/vendor?status=Being%20Cooked",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.token,
          },
        }
      );

      const result = await response.json();
      console.log(result);
      setPendingOrders(result);
    } catch (e) {}
  };

  const token = localStorage.getItem("token");
  //   handleOrdersFetch();
  // }, []);
  // if (token) {
  //   setInterval(() => {
  //     handleOrdersFetch();
  //   }, 5000);
  //   console.log(orders);
  // }

  // setTimeout(handleOrdersFetch, 10000);
  useEffect(() => {
    setInterval(() => {
      handleOrdersFetch();
      handlePendingOrdersFetch();
    }, 2000);

    // handleOrdersFetch();
  }, []);

  // useEffect(() => {
  //   handlePendingOrdersFetch();
  // }, []);

  return (
    <OrdersContext.Provider value={contextValue}>
      {children}
    </OrdersContext.Provider>
  );
};
