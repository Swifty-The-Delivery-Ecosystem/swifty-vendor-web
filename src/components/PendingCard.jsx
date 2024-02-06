import React, { useState, useContext } from "react";
import { OrdersContext } from "../context/orderContext";
import { SimpleDropdown } from "react-js-dropdavn";
import "react-js-dropdavn/dist/index.css";

import axios from "axios";
import { useDelivery } from "../context/deliveryPartnerContext";

const PendingCard = (props) => {
  const { pendingOrders, setPendingOrders } = useContext(OrdersContext);
  const delivery = useDelivery();
  const [selectedDeliveryBoy, setSelectedDeliveryBoy] = useState({
    label: "",
    value: 0,
    id: "0",
  });

  // console.log("delivery", delivery.delivery);

  const removeOrder = async (order_id, newStatus) => {
    console.log(order_id, newStatus, selectedDeliveryBoy);
    try {
      const response = await fetch(
        "https://order-service-peach.vercel.app/api/v1/order_service/delivery_boy",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.token,
          },
          body: JSON.stringify({
            order_id: order_id,
            delivery_partner_id: selectedDeliveryBoy.id,
          }),
        }
      );

      const result = await response.json();
      console.log(result);
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
      setSelectedDeliveryBoy({ label: "", value: 0, id: "0" });

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
    id: item._id,
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
      <CustomDropdown
        options={dropdownOptions}
        onSelect={(value) => {
          console.log(value);
          setSelectedDeliveryBoy(value);
        }}
      />
      <div className="mb-2 mt-4 flex justify-between flex-col gap-2">
        <button
          className="bg-green-500 text-white px-2 py-2 rounded hover:bg-green-600"
          onClick={() =>
            removeOrder(props.order.order_id, "departed", selectedDeliveryBoy)
          }
        >
          Out for Delivery
        </button>
      </div>
    </div>
  );
};

export default PendingCard;

const CustomDropdown = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div className="border border-gray-300 p-1 rounded-md">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={toggleDropdown}
        >
          <span>{selectedOption ? selectedOption.label : "Select"}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3.293 6.293a1 1 0 0 1 1.414 0L10 11.586l5.293-5.293a1 1 0 1 1 1.414 1.414l-6 6a1 1 0 0 1-1.414 0l-6-6a1 1 0 0 1 0-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
            {options.map((option) => (
              <div
                key={option.value}
                className="py-1 px-3 cursor-pointer hover:bg-gray-100"
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
