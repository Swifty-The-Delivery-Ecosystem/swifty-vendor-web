import React, { useState,useContext } from "react";
import { NewOrderContext } from "../App";

const OrderCard = (props) => {

  const {newOrders, setNewOrders} = useContext(NewOrderContext);

  const removeOrder = (orderId) => {
    console.log(orderId);
    const updatedOrders = newOrders.filter((order) => order.orderId !== orderId);
    setNewOrders(updatedOrders);
  };

  return (
    <div className="border-4 w-56 h-64 p-4 m-2 bg-white rounded-lg shadow-md">
      <div className="font-bold text-lg mb-2">{props.itemName}</div>
      <div className="text-gray-600">{props.quantity}</div>
      <div className="text-gray-600">{props.deliveryLocation}</div>
      <div className="text-gray-600">{props.orderId}</div>
      <div className="text-gray-600">{props.timestamp}</div>

      {/* Buttons */}
      <div className="mt-4 flex justify-between">
        <button
          className="bg-green-500 text-white px-2 py-2 rounded hover:bg-green-600"
          onClick={()=>removeOrder(props.orderId)}
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
