import React, { useState, useContext } from "react";
import { useOrders } from "../context/orderContext";
const OrderCard = (props) => {
  const { orders, setOrders, pendingOrders, setPendingOrders } = useOrders();
  const removeOrder = async (order_id,newStatus) => {
    console.log(order_id);
    const updatedOrders = orders.filter((order) => order.order_id !== order_id);
    const response =await fetch(
      "https://order-service-one.vercel.app/api/v1/order_service/vendor/order_update",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization" : "Bearer "+ localStorage.token,
        },
        body: JSON.stringify({
          order_id:order_id,
          status: newStatus,
        }),
      }
    );
    console.log(response)
    if(response.status === 200||201){
      
    setOrders(updatedOrders);
    const updatedPendingOrder=orders.filter((order)=>order.orderId===order_id);
    setPendingOrders(...pendingOrders,updatedPendingOrder);
    console.log(pendingOrders);
    }
  };

  return (
    <div className="border-4 w-56 h-64 p-4 m-2 bg-white rounded-lg shadow-md py-auto content-center flex flex-col items-center justify-between ">
      <div className="text-gray-600">Order ID : {props.order.order_id}</div>
      <div className="text-gray-600">Amount : {props.order.amount}</div>
      <ol>
      {
        
      props.order.items.map((item)=>{
          return <li>
          <div className="text-gray-600">{item.name}  * {item.quantity}</div>
          </li>
      })
      }
      </ol>
      {/* <div className="text-gray-600">{props.order.itemName}  * {props.order.quantity}</div>
      <div className="text-gray-600">{props.order.deliveryLocation}</div> */}
  
      {/* <div className="text-gray-600">{props.order.timestamp}</div> */}

      {/* Buttons */}
      <div className="mt-4 flex justify-between flex-col gap-2">
        <button
          className="bg-green-500 text-white px-2 py-2 rounded hover:bg-green-600"
          onClick={() => removeOrder(props.order.order_id, 'Being Cooked')}
        >
          Confirm
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={() => removeOrder(props.order.orderId,'Declined')}>
          Deny
        </button>
      </div>
    </div>
  );
};

export default OrderCard;
