// import React from "react";
// import { useOrders } from "../context/orderContext";

// const PendingCard = () => {
//   const { orders, setOrders } = useOrders();
//   return (
//     <div className="border-4 w-56 h-64 p-4 bg-white rounded-lg shadow-md">
//       <div className="font-bold text-lg mb-2">Item Name</div>
//       <div className="text-gray-600">Quantity: 3</div>
//       <div className="text-gray-600">Delivery: BH1</div>
//       <div className="text-gray-600">Order ID: #123456</div>
//       <div className="text-gray-600">Timestamp: 2024-01-11 12:34 PM</div>

//       {/* Buttons */}
//       <div className="mt-4 flex justify-between">
//         <button className="bg-green-500 text-white px-2 py-2 mx-auto rounded hover:bg-green-600">
//           Out for Delivery
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PendingCard;

import React, { useState, useContext } from "react";
import { useOrders } from "../context/orderContext";

const PendingCard = (props) => {
  const { pendingOrders, setPendingOrders } = useOrders();

  const removeOrder = (order_id) => {
    // console.log(orderId);
    const updatedOrders = pendingOrders.filter(
      (order) => pendingOrders.order_id !== order_id
    );
    setPendingOrders(updatedOrders);
  };

  return (
    <div className="border-4 w-56 h-64 p-4 m-2 bg-white rounded-lg shadow-md py-auto content-center flex flex-col items-center justify-between ">
      {/* <ul> */}
      {/* {
        
      props.order.items.map((item)=>{
          return <li>{item._id}</li>
      })
      } */}
      {/* </ul>
      <div className="text-gray-600">
        {props.order.itemName} * {props.order.quantity}
      </div>
      <div className="text-gray-600">{props.order.deliveryLocation}</div>
      <div className="text-gray-600">{props.order.orderId}</div>
      <div className="text-gray-600">{props.order.timestamp}</div> */}

      <div className="text-gray-600">Order ID : {props.order.order_id}</div>
      <div className="text-gray-600">Amount : {props.order.amount}</div>
      <ol>
        {props.order.items.map((item) => {
          return (
            <li>
              <div className="text-gray-600">
                {item.name} * {item.quantity}
              </div>
            </li>
          );
        })}
      </ol>

      {/* Buttons */}
      <div className="mt-4 flex justify-between flex-col gap-2">
        <button
          className="bg-green-500 text-white px-2 py-2 rounded hover:bg-green-600"
          onClick={() => removeOrder(props.order.orderId)}
        >
          Out for Delivery
        </button>
      </div>
    </div>
  );
};

export default PendingCard;
