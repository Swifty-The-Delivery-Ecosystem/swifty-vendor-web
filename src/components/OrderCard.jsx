import React, { useState, useContext, useEffect } from "react";
import OrdersContext from "../context/orderContext";
import VendorContext from "../context/vendorContext";

const OrderCard = () => {
  const orderContext = useContext(OrdersContext);
  let vendorContext = useContext(VendorContext);
  const [loadingOrders, setLoadingOrders] = useState({});
  const [newOrder, setNewOrder] = useState(null);
  useEffect(() => {
    const eventSource = new EventSource(
      `https://order-service-peach.vercel.app/api/v1/order_service/events/${
        JSON.parse(localStorage.vendorData)["_id"]
      }`
    );

    eventSource.onmessage = (event) => {
      const order = JSON.parse(event.data);
      console.log(order, "order");
      orderContext.setOrders((prevOrders) => [...prevOrders, order]);
    };

    return () => {
      eventSource.close();
    };
  }, [JSON.parse(localStorage.vendorData)["_id"]]);
  useEffect(() => {
    if (
      localStorage.isVendorLogged &&
      localStorage.vendorData &&
      JSON.parse(localStorage.vendorData)["status"] == "active"
    ) {
      fetch(
        "https://order-service-peach.vercel.app/api/v1/order_service/vendor?status=pending",
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
          console.log("result", result);
          if (Array.isArray(result)) {
            if (result !== orderContext.orders) {
              orderContext.setOrders(result);
            }
          } else {
            console.error("Invalid data format for orders:", result);
          }
        })
        .catch((error) => {
          console.error("Error fetching orders data:", error);
        });
    }
  }, [
    "https://order-service-peach.vercel.app/api/v1/order_service/vendor?status=pending",
  ]);

  const removeOrder = async (order_id, newStatus) => {
    setLoadingOrders((prevLoadingOrders) => ({
      ...prevLoadingOrders,
      [order_id]: true,
    }));

    try {
      const response = await fetch(
        "https://order-service-peach.vercel.app/api/v1/order_service/vendor/order_update",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.token,
          },
          body: JSON.stringify({
            order_id: order_id,
            status: newStatus,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update order");
      }

      if (
        newStatus === "being cooked" &&
        (response.status === 200 || response.status === 201)
      ) {
        const updatedOrders = orderContext.orders.filter(
          (order) => order.order_id !== order_id
        );

        orderContext.setOrders(updatedOrders);

        const updatedPendingOrder = orderContext.orders.filter(
          (order) => order.order_id === order_id
        );
        orderContext.setPendingOrders([
          ...orderContext.pendingOrders,
          ...updatedPendingOrder,
        ]);
        console.log("pendingOrders", orderContext.pendingOrders);
      } else if (
        newStatus === "declined" &&
        (response.status === 200 || response.status === 201)
      ) {
        const updatedOrders = orderContext.orders.filter(
          (order) => order.order_id !== order_id
        );
        orderContext.setOrders(updatedOrders);

        console.log(`Order ${order_id} declined and removed from orders.`);
      }
    } catch (error) {
      console.error("Error updating order:", error);
    } finally {
      setLoadingOrders((prevLoadingOrders) => ({
        ...prevLoadingOrders,
        [order_id]: false,
      }));
    }
  };

  return (
    <div>
      {orderContext.orders &&
        orderContext.orders.map((order) => {
          return (
            <ul className="border-4 w-56 h-64 p-4 m-2 bg-white rounded-lg shadow-md py-auto content-center  ">
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
              {loadingOrders[order.order_id] ? (
                <p className="text-center my-2 text-red-400">Loading...</p>
              ) : (
                <div className="mt-4 flex justify-between flex-col gap-2">
                  <button
                    className="bg-green-500 text-white px-2 py-2 rounded hover:bg-green-600"
                    onClick={() => removeOrder(order.order_id, "being cooked")}
                  >
                    Confirm
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    onClick={() => removeOrder(order.order_id, "declined")}
                  >
                    Deny
                  </button>
                </div>
              )}
            </ul>
          );
        })}
    </div>
  );
};

export default OrderCard;
