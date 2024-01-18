import React, { createContext, useState } from "react";
import OrderCard from "./OrderCard";
import newOrders from "../data/newOrders";
import PendingCard from "./PendingCard";

const NewOrderContext = createContext();

const Body = () => {
  const [orders, setOrders] = useState(newOrders);

  const removeOrder = (orderId) => {
    // Filter out the order with the specified orderId
    const updatedOrders = orders.filter((order) => order.orderId !== orderId);
    setOrders(updatedOrders);
  };

  return (
    <>
      <NewOrderContext.Provider value={{ removeOrder }}>
        <div className="bg-green-100 px-10 flex divide-x divide-black divide-dashed">
          <div className="my-4">
            <div className="py-4 px-10 font-bold text-2xl text-center">
              New Orders
            </div>
            <div className="flex flex-wrap justify-center">
              {orders.map((e) => (
                <OrderCard
                  itemName={e.itemName}
                  quantity={e.quantity}
                  deliveryLocation={e.deliveryLocation}
                  orderId={e.orderId}
                  timestamp={e.timestamp}
                  key={e.orderId}
                />
              ))}
            </div>
          </div>
          <div className="my-4">
            <div className="py-4 px-10 font-bold text-2xl text-center">
              Pending Orders
            </div>
            <div className="flex flex-wrap justify-center">
              {Array(9)
                .fill("")
                .map(() => {
                  return (
                    <div className="py-4 px-4">
                      <PendingCard />
                    </div>
                  );
                })}
            </div>
          </div>
          {/* ... (rest of your code) */}
        </div>
      </NewOrderContext.Provider>
    </>
  );
};

export default Body;
