import React, { useState, useContext, useEffect } from "react";
import OrderCard from "../components/OrderCard";
import PendingCard from "../components/PendingCard";
import OrdersContext from "../context/orderContext";
import VendorContext from "../context/vendorContext";

const Body = () => {
  let verdorContext = useContext(VendorContext);

  const fetchVendorDetails = async (vendorId, token) => {
    const response = await fetch(
      `https://auth-six-pi.vercel.app/api/v1/auth/vendors/${vendorId}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const result = await response.json();
      const data = result.data.user;
      verdorContext.setVendorData(data);
      localStorage.setItem("vendorData", JSON.stringify(data));
      localStorage.setItem("isVendorLogged", true);
      verdorContext.setIsVendorLogged(true);
    }
  };

  useEffect(() => {
    const isVendorLoggedLocal = localStorage.getItem("isVendorLogged");
    const vendorDataLocal = localStorage.getItem("vendorData");
    if (isVendorLoggedLocal) {
      verdorContext.setIsVendorLogged(isVendorLoggedLocal);
    }
    if (vendorDataLocal) {
      verdorContext.setVendorData(JSON.parse(vendorDataLocal));
    }
    if (verdorContext.vendorData) {
      fetchVendorDetails(verdorContext.vendorData._id, localStorage.token);
    }
  }, []);

  // const searchCards = () => {
  //   console.log("These are the orders");
  //   console.log(orders);
  //   if (orders.length > 0 && orders[0].amount == -25) {
  //     return <ShimmerSimpleGallery card imageHeight={200} caption />;
  //   }
  //   if (search !== "" && orders.length > 0) {
  //     const filteredOrders = orders.filter(
  //       (order) =>
  //         order.itemName.toLowerCase().includes(search.toLowerCase()) ||
  //         order.deliveryLocation.toLowerCase().includes(search.toLowerCase())
  //     );

  //     return (
  //       filteredOrders &&
  //       filteredOrders.map((e) => (
  //         <OrderCard
  //           order={e}
  //           itemName={e.itemName}
  //           quantity={e.quantity}
  //           deliveryLocation={e.deliveryLocation}
  //           orderId={e.orderId}
  //           timestamp={e.timestamp}
  //           key={e.orderId}
  //         />
  //       ))
  //     );
  //   } else {
  //     return orders.map((e) => <OrderCard order={e} />);
  //   }
  // };

  // const searchPendingCards = () => {
  //   if (pendingOrders.length > 0 && pendingOrders[0].amount == -25) {
  //     return <ShimmerSimpleGallery card imageHeight={200} caption />;
  //   }

  //   if (search !== "") {
  //     const filteredOrders = pendingOrders.filter(
  //       (pendingOrder) =>
  //         pendingOrder.itemName.toLowerCase().includes(search.toLowerCase()) ||
  //         pendingOrder.deliveryLocation
  //           .toLowerCase()
  //           .includes(search.toLowerCase())
  //     );

  //     return (
  //       filteredOrders &&
  //       filteredOrders.map((e) => (
  //         <PendingCard
  //           order={e}
  //           itemName={e.itemName}
  //           quantity={e.quantity}
  //           deliveryLocation={e.deliveryLocation}
  //           orderId={e.orderId}
  //           timestamp={e.timestamp}
  //           key={e.orderId}
  //         />
  //       ))
  //     );
  //   } else {
  //     return pendingOrders.map((e) => (
  //       <PendingCard order={e} key={e.orderId} />
  //     ));
  //   }
  // };

  // const PendCards = () => {
  //   console.log(pendingOrders);

  //   return pendingOrders.map((e) => <PendingCard order={e} />);
  // };

  return (
    <>
      <div className="bg-green-100 min-h-screen px-10 flex divide-x divide-black divide-dashed">
        {verdorContext.isVendorLogged &&
          verdorContext.vendorData &&
          verdorContext.vendorData["status"] != "active" && (
            <div
              className="bg-blue-100 border w-fit mx-auto overflow-y-hidden h-fit text-center items-center my-autp border-blue-400 text-blue-700 px-4 py-3 rounded"
              role="alert"
            >
              <strong className="font-bold text-red-500">
                Admin has not approved you yet:{" "}
              </strong>
              <span className="block sm:inline">Kindly wait for approval.</span>
            </div>
          )}

        {verdorContext.isVendorLogged &&
          verdorContext.vendorData &&
          verdorContext.vendorData["status"] == "active" && (
            <>
              <div className="my-4 w-1/2">
                <div className="py-4 px-10 font-bold text-2xl text-center">
                  New Orders
                </div>
                <div className="flex flex-wrap justify-center">
                  <OrderCard />
                </div>
              </div>
              <div className="my-4 w-1/2">
                <div className="py-4 px-10 font-bold text-2xl text-center">
                  Pending Orders
                </div>
                <div className="flex flex-wrap justify-center">
                  <PendingCard />
                </div>
              </div>
            </>
          )}
      </div>
    </>
  );
};

export default Body;
