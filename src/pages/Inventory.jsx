import React from "react";
import { useInventory } from "../context/inventoryContext";
import InventoryCard from "../components/InventoryCard";

const InventoryPage = () => {
  const { inventory } = useInventory();
  

  return (
    <div className="flex items-center justify-center flex-col">
      {inventory.map(item => (
        <InventoryCard key={item._id} item={item} />
      ))}
    </div>
  );
};

export default InventoryPage;