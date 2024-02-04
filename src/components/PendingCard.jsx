import React, { useState, useContext } from "react";
import { OrdersContext } from "../context/orderContext";
import { SimpleDropdown } from "react-js-dropdavn";
import "react-js-dropdavn/dist/index.css";

import axios from "axios";
import { useDelivery } from "../context/deliveryPartnerContext";

const PendingCard = (props) => {
  const { pendingOrders, setPendingOrders } = useContext(OrdersContext);
  const delivery = useDelivery();
  const [selectedDeliveryBoy, setSelectedDeliveryBoy] = useState(null);

  // console.log("delivery", delivery.delivery);

  const removeOrder = async (order_id, newStatus) => {
    console.log(order_id, newStatus , selectedDeliveryBoy);
    try {
      const response = await fetch(
        "https://order-service-peach.vercel.app/api/v1/order_service/delivery_boy",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.token,
          },
          body:JSON.stringify({
            order_id: order_id,
            delivery_partner_id: selectedDeliveryBoy.id,
          }) 
        }
      );

      const result = await response.json();
      console.log(result)
    } catch (e) {
      console.error("Error fetching pending orders data:", e);
    }

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
      }
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  // Transform delivery data to the desired format
  const dropdownOptions = delivery.delivery.map((item) => ({
    label: item.name,
    value: item.otp,
    id: item._id
  }));

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
      <SimpleDropdown
        options={dropdownOptions}
        searchable
        onChange={(value) => {
          console.log(value)
          setSelectedDeliveryBoy(value);

        }}
        configs={{
          position: { y: "bottom", x: "center" },
          fullWidthParent: true,
        }}
        className="w-full z-0 mx-4"
      />
      <div className="mb-2 mt-4 flex justify-between flex-col gap-2">
        <button
          className="bg-green-500 text-white px-2 py-2 rounded hover:bg-green-600"
          onClick={() => removeOrder(props.order.order_id, "departed", selectedDeliveryBoy)}
        >
          Out for Delivery
        </button>
      </div>
    </div>
  );
};

export default PendingCard;
