import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

const DeliveryContext = React.createContext();

export const useDelivery = () => {
  return useContext(DeliveryContext);
};

export const DeliveryProvider = ({ children }) => {
  const [delivery, setDelivery] = useState([]);

  useEffect(() => {
    const fetchDelivery = async () => {
      try {

        const token = localStorage.getItem("token");
        const response = await fetch(
             "http://localhost:8000/api/v1/auth/vendors/delivery_partner/view",
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
        // console.log(data.deliveryPartners);
         setDelivery(data.deliveryPartners);
      } catch (error) {
        // Handle the error
      }
    };

    fetchDelivery();
  }, []);

  const createDeliveryPartner = async (newPartner) => {
    
    try {
        const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8000/api/v1/auth/vendors/delivery_partner/register", {
        method:"POST",
        body: JSON.stringify(newPartner),
         headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        }
    });
 const data = await response.json()
    console.log(data);
      setDelivery([...delivery,data.deliveryPartner]);
    } catch (error) {
      // Handle the error
      console.log(error)
    }
  };

  const updateDeliveryPartner = async (itemId, updatedItem) => {
    const token = localStorage.getItem("token");
    try {
   
      const response = await fetch("http://localhost:8000/api/v1/auth/vendors/delivery_partner_update", { 
        method: "PUT",
   
    headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
    },
      body:JSON.stringify(updatedItem)});
      
      const data = await response.json();
      const updatedInventory = inventory.map(item => (item.item_id === itemId ? data : item));
      setDelivery(updatedInventory);
    } catch (error) {
        console.log(error);
      // Handle the error
    }
  };

  return (
    <DeliveryContext.Provider value={{ delivery, createDeliveryPartner, updateDeliveryPartner }}>
      {children}
    </DeliveryContext.Provider>
  );
};