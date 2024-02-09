import React, { useEffect, useState } from "react";
import OrdersContext from "./orderContext";
import axios from "axios";

const OrderState = (props) => {
  const [orders, setOrders] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);

 
  return (
    <OrdersContext.Provider
      value={{
        orders,
        setOrders,
        pendingOrders,
        setPendingOrders,
      }}
    >
      {props.children}
    </OrdersContext.Provider>
  );
};

export default OrderState;
