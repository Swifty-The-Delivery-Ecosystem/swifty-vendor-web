import React, { useState, useContext, useEffect } from "react";
import OrdersContext from "../context/orderContext";
import DeliveryContext from "../context/deliveryPartnerContext";
import VendorContext from "../context/vendorContext";
import axios from "axios";

const PendingCard = () => {
  const orderContext = useContext(OrdersContext);
  const vendorContext = useContext(VendorContext);

  const deliveryContext = useContext(DeliveryContext);
  const [selectedDeliveryBoy, setSelectedDeliveryBoy] = useState({
    label: "",
    value: 0,
    id: "0",
  });

  const dropdownOptions = deliveryContext.delivery.map((item) => ({
    label: item.name,
    value: item.otp,
    id: item._id,
  }));

  useEffect(() => {
    if (
      localStorage.isVendorLogged &&
      localStorage.vendorData &&
      JSON.parse(localStorage.vendorData)["status"] == "active"
    ) {
      fetch(
        "https://order-service-peach.vercel.app/api/v1/order_service/vendor?status=being%20cooked",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.token,
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((result) => {
          if (Array.isArray(result)) {
            if (
              JSON.stringify(result) !==
                JSON.stringify(orderContext.pendingOrders) &&
              window.location.pathname !== "/login"
            ) {
              orderContext.setPendingOrders(result);
            }
          } else {
            console.error("Invalid data format for pending orders:", result);
          }
        })
        .catch((error) => {
          console.error("Error fetching pending orders data:", error);
        });
    }
  }, [
    "https://order-service-peach.vercel.app/api/v1/order_service/vendor?status=being%20cooked",
  ]);

  const handleOut = async (order_id, newStatus) => {
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
        const updatedPendingOrders = orderContext.pendingOrders.filter(
          (order) => order.order_id !== order_id
        );

        orderContext.setPendingOrders(updatedPendingOrders);
      }
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  return (
    <div>
      {orderContext.pendingOrders &&
        orderContext.pendingOrders.map((order) => {
          return (
            <ul className="border-4 w-56 h-64 p-4 m-2 bg-white rounded-lg shadow-md py-auto content-center ">
              <ol>
                {order.items.map((item, index) => {
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
                <span className="font-bold">Amount :</span> {order.amount}
              </div>
              <div className="text-gray-600">
                <span className="font-bold">Order ID :</span> {order.order_id}
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
                  onClick={() => handleOut(order.order_id, "departed")}
                >
                  Out for Delivery
                </button>
              </div>
            </ul>
          );
        })}
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
