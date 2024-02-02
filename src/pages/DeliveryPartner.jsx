import React from "react";
import { useDelivery } from "../context/deliveryPartnerContext";
import DeliveryPartnerCard from "../components/DeliveryPartnerCard";
import AddDeliveryCard from "../components/AddDeliveryPartner";

const DeliveryPartnerPage = () => {
  const {delivery}  = useDelivery();
  console.log(delivery)
  return (
    <div className="flex items-center justify-center flex-col">
      <AddDeliveryCard/>
      { delivery.map((item) => (
        <DeliveryPartnerCard key={item._id} deliveryPartner={item} />
      ))}
    </div>
  );
};

export default DeliveryPartnerPage;