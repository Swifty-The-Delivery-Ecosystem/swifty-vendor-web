import React, { useState, useContext } from "react";
import { useOrders } from "../context/orderContext";
const OrderCard = (props) => {
  const { orders, setOrders } = useOrders();

  const removeOrder = (order_id) => {
    // console.log(orderId);
    const updatedOrders = orders.filter((order) => order.orderId !== order_id);
    setOrders(updatedOrders);
  };

  return (
    <div className="border-4 w-56 h-64 p-4 m-2 bg-white rounded-lg shadow-md py-auto content-center flex flex-col items-center justify-between ">
      <ul>
      {/* {
        
      props.order.items.map((item)=>{
          return <li>{item._id}</li>
      })
      } */}
      </ul>
      <div className="text-gray-600">{props.order.itemName}  * {props.order.quantity}</div>
      <div className="text-gray-600">{props.order.deliveryLocation}</div>
      <div className="text-gray-600">{props.order.orderId}</div>
      <div className="text-gray-600">{props.order.timestamp}</div>

      {/* Buttons */}
      <div className="mt-4 flex justify-between flex-col gap-2">
        <button
          className="bg-green-500 text-white px-2 py-2 rounded hover:bg-green-600"
          onClick={() => removeOrder(props.order.orderId)}
        >
          Confirm
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Deny
        </button>
      </div>
    </div>
  );
};

export default OrderCard;
