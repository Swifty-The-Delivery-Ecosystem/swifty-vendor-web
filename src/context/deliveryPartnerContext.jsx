import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

const DeliveryContext = React.createContext();

export const useDelivery = () => {
  return useContext(DeliveryContext);
};

export const DeliveryProvider = ({ children }) => {
  const [delivery, setDelivery] = useState([]);

  useEffect(() => {
    fetchDelivery();
  }, []);
  const fetchDelivery = async () => {
    if (window.location.pathname !== "/login") {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "https://auth-six-pi.vercel.app/api/v1/auth/vendors/delivery_partner/view",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            //   mode: "no-cors"
          }
        );

        const data = await response.json();
        console.log(data.deliveryPartners);
        setDelivery(data.deliveryPartners);
      } catch (error) {
        // Handle the error
        console.log(error, ": fetching delivery boy");
      }
    }
  };

  const createDeliveryPartner = async (newPartner) => {
    if (window.location.pathname !== "/login") {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "https://auth-six-pi.vercel.app/api/v1/auth/vendors/delivery_partner/register",
          {
            method: "POST",
            body: JSON.stringify(newPartner),
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        const data = await response.json();
        console.log(data.data);
        setDelivery([...delivery, data.data.deliveryPartner]);
      } catch (error) {
        // Handle the error
        console.log(error);
      }
    }
  };

  const updateDeliveryPartner = async (deliveryPartner_id, name) => {
    const token = localStorage.getItem("token");
    if (window.location.pathname !== "/login") {
      try {
        console.log(deliveryPartner_id, name.name);
        const response = await fetch(
          "https://auth-six-pi.vercel.app/api/v1/auth/vendors/update/delivery_partner_update",
          {
            method: "PUT",

            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            body: JSON.stringify({
              deliveryPartner_id: name._id,
              name: name.name,
            }),
          }
        );

        const data = await response.json();
        console.log(data);
        const updatedPartner = delivery.map((item) =>
          item._id === name._id ? data.updateDeliveryPartner : item
        );
        console.log(updatedPartner);
        setDelivery(updatedPartner);
      } catch (error) {
        console.log(error);
        // Handle the error
      }
    }
  };

  return (
    <DeliveryContext.Provider
      value={{ delivery, createDeliveryPartner, updateDeliveryPartner }}
    >
      {children}
    </DeliveryContext.Provider>
  );
};
