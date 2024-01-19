import React, { createContext, useState, useContext } from "react";
import OrderCard from "./OrderCard";
import PendingCard from "./PendingCard";
import { NewOrderContext, SearchContext } from "../App";

const Body = () => {

  const {newOrders}=useContext(NewOrderContext);
  const {search}=useContext(SearchContext);

  const searchCards = () => {
    if (search !== "") {
      const filteredOrders = newOrders.filter((order) =>
        order.itemName.toLowerCase().includes(search.toLowerCase()) || order.deliveryLocation.toLowerCase().includes(search.toLowerCase())
      );
  
      return filteredOrders.map((e) => (
        <OrderCard
          itemName={e.itemName}
          quantity={e.quantity}
          deliveryLocation={e.deliveryLocation}
          orderId={e.orderId}
          timestamp={e.timestamp}
          key={e.orderId}
        />
      ));
    } else {
      return newOrders.map((e) => (
        <OrderCard
          itemName={e.itemName}
          quantity={e.quantity}
          deliveryLocation={e.deliveryLocation}
          orderId={e.orderId}
          timestamp={e.timestamp}
          key={e.orderId}
        />
      ));
    }
  };
  
  return (
    <>
        <div className="bg-green-100 px-10 flex divide-x divide-black divide-dashed">
          <div className="my-4 w-1/2">
            <div className="py-4 px-10 font-bold text-2xl text-center">
              New Orders
            </div>
            <div className="flex flex-wrap justify-center">
              {searchCards()}
            </div>
          </div>
          <div className="my-4 w-1/2">
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
        </div>
    </>
  );
};

export default Body;
