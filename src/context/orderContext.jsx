import React, { createContext, useContext, useState } from "react";
import ogOrders from "../sampleData/newOrders";

const OrdersContext = createContext();

export const useOrders = () => {
  return useContext(OrdersContext);
};

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(ogOrders);

  const contextValue = {
    orders,
    setOrders
  };

  return (
    <OrdersContext.Provider value={contextValue}>
      {children}
    </OrdersContext.Provider>
  );
};
