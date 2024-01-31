import React, { createContext, useState, useContext } from "react";
import OrderCard from "../components/OrderCard";
import PendingCard from "../components/PendingCard";
import { useSearch } from "../context/searchContext";
import { useOrders } from "../context/orderContext";
import { ShimmerSimpleGallery } from "react-shimmer-effects";

const Body = () => {
  const { search, setSearch } = useSearch();
  const { orders, setOrders, pendingOrders, setPendingOrders } = useOrders();

  const searchCards = () => {
    if(orders.length >0 && orders[0].amount == -25){
      return <ShimmerSimpleGallery card imageHeight={200} caption />;
    }
    if (search !== "") {
      const filteredOrders = orders.filter(
        (order) =>
          order.itemName.toLowerCase().includes(search.toLowerCase()) ||
          order.deliveryLocation.toLowerCase().includes(search.toLowerCase())
      );

      return filteredOrders.map((e) => (
        <OrderCard
          order={e}
          // itemName={e.itemName}
          // quantity={e.quantity}
          // deliveryLocation={e.deliveryLocation}
          // orderId={e.orderId}
          // timestamp={e.timestamp}
          // key={e.orderId}
        />
      ));
    } else {
      return orders.map((e)=> <OrderCard order={e}/>);
    }
  };

  const PendCards = () => {
    console.log(pendingOrders);
    
    return pendingOrders.map((e) => <PendingCard order={e} />);
  };

  return (
    <>
      <div className="bg-green-100 min-h-screen px-10 flex divide-x divide-black divide-dashed">
        <div className="my-4 w-1/2">
          <div className="py-4 px-10 font-bold text-2xl text-center">
            New Orders
          </div>
          <div className="flex flex-wrap justify-center">{searchCards()}</div>
        </div>
        <div className="my-4 w-1/2">
          <div className="py-4 px-10 font-bold text-2xl text-center">
            Pending Orders
          </div>
          <div className="flex flex-wrap justify-center">{PendCards()}</div>
        </div>
      </div>
    </>
  );
};

export default Body;
