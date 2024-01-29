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

  const handleOrdersFetch = async() => {
    try{
      const response = await fetch(
        "https://order-service-one.vercel.app/api/v1/order_service/vendor",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization" : "Bearer "+ localStorage.token,
          },
        }
      );
      
      const result = await response.json();
      console.log(result);
      setOrders(result);
    }
    catch(e){
      
    }
}
setTimeout(handleOrdersFetch, 10000);
  // handleOrdersFetch();

  return (
    <OrdersContext.Provider value={contextValue}>
      {children}
    </OrdersContext.Provider>
  );
};
