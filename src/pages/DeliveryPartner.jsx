import React, { useContext } from "react";
import DeliveryContext from "../context/deliveryPartnerContext";
import DeliveryPartnerCard from "../components/DeliveryPartnerCard";
import AddDeliveryCard from "../components/AddDeliveryPartner";

const DeliveryPartnerPage = () => {
  // const { delivery } = useDelivery();
  const deliveryContext = useContext(DeliveryContext);
  console.log("delivery", deliveryContext.delivery);
  return (
    <div className="flex items-center justify-center flex-col">
      <AddDeliveryCard />
      {deliveryContext.delivery.map((item) => (
        <DeliveryPartnerCard key={item._id} deliveryPartner={item} />
      ))}
    </div>
  );
};

export default DeliveryPartnerPage;
