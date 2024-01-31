import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

const InventoryContext = React.createContext();

export const useInventory = () => {
  return useContext(InventoryContext);
};

export const InventoryProvider = ({ children }) => {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const fetchInventory = async () => {
      try {

        const token = localStorage.getItem("token");
        const response = await fetch(
            // "http://127.0.0.1:4005/api/v1/inventory/vendor/menuitems",
            "https://inventory-service-git-main-swiftyeco.vercel.app/api/v1/inventory/vendor/menuitems?startIndex=0&pageSize=5",
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
        console.log(data.items);
        setInventory(data.items);
      } catch (error) {
        // Handle the error
      }
    };

    fetchInventory();
  }, []);

  const createInventoryItem = async (newItem) => {
    try {
      const response = await axios.post("https://inventory-service-git-main-swiftyeco.vercel.app/api/v1/inventory/vendor/menuitems", newItem);
      setInventory([...inventory, response.data]);
    } catch (error) {
      // Handle the error
    }
  };

  const updateInventoryItem = async (itemId, updatedItem) => {
    try {
        console.log(updatedItem);
      const response = await axios.put(`https://inventory-service-git-main-swiftyeco.vercel.app/api/v1/inventory/vendor/menuitems/${itemId}`, updatedItem);
      console.log(response);
      const data = await response.json();
      const updatedInventory = inventory.map(item => (item._id === itemId ? data : item));
      setInventory(updatedInventory);
    } catch (error) {
        console.log('Again');
      // Handle the error
    }
  };

  return (
    <InventoryContext.Provider value={{ inventory, createInventoryItem, updateInventoryItem }}>
      {children}
    </InventoryContext.Provider>
  );
};