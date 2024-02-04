import React, { useState, useContext } from "react";
// import { useOrders } from "../context/orderContext";
import { OrdersContext } from "../context/orderContext";

import axios from "axios";

const PendingCard = (props) => {
  // const { pendingOrders, setPendingOrders } = useOrders();
  const { pendingOrders, setPendingOrders } = useContext(OrdersContext);
  console.log(props);

  const removeOrder = async (order_id, newStatus) => {
    console.log(order_id, newStatus);

    try {
      const response = await axios.put(
        "https://order-service-peach.vercel.app/api/v1/order_service/vendor/order_update",
        {
          order_id: order_id,
          status: newStatus,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.token,
          },
        }
      );

      console.log(response);

      if (response.status === 200 || response.status === 201) {
        const updatedPendingOrders = pendingOrders.filter(
          (order) => order.order_id !== order_id
        );

        setPendingOrders(updatedPendingOrders);

        // console.log(updatedPendingOrders);

        // console.log(pendingOrders);
      }
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  return (
    <div className="border-4 w-56 h-64 p-4 m-2 bg-white rounded-lg shadow-md py-auto content-center ">
      <ol>
        {props.order.items.map((item, index) => {
          return (
            <li key={index}>
              <div className="text-gray-600">
                <span className="font-bold">
                  {item.name} * {item.quantity}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
      <div className="text-gray-600">
        <span className="font-bold">Amount :</span> {props.order.amount}
      </div>
      <div className="text-gray-600">
        <span className="font-bold">Order ID :</span> {props.order.order_id}
      </div>

      {/* Buttons */}
      <div className="mb-2 mt-4 flex justify-between flex-col gap-2">
        <button
          className="bg-green-500 text-white px-2 py-2 rounded hover:bg-green-600"
          onClick={() => removeOrder(props.order.order_id, "Departed")}
        >
          Out for Delivery
        </button>
      </div>
    </div>
  );
};

export default PendingCard;
