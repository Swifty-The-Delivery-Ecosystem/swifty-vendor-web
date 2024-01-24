import React from "react";
import { useOrders } from "../context/orderContext";

const PendingCard = () => {
  const { orders, setOrders } = useOrders();
  return (
    <div className="border-4 w-56 h-64 p-4 bg-white rounded-lg shadow-md">
      <div className="font-bold text-lg mb-2">Item Name</div>
      <div className="text-gray-600">Quantity: 3</div>
      <div className="text-gray-600">Delivery: BH1</div>
      <div className="text-gray-600">Order ID: #123456</div>
      <div className="text-gray-600">Timestamp: 2024-01-11 12:34 PM</div>

      {/* Buttons */}
      <div className="mt-4 flex justify-between">
        <button className="bg-green-500 text-white px-2 py-2 mx-auto rounded hover:bg-green-600">
          Out for Delivery
        </button>
      </div>
    </div>
  );
};

export default PendingCard;
