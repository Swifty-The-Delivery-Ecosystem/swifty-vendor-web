import React from "react";
import { useInventory } from "../context/inventoryContext";
import InventoryCard from "../components/InventoryCard";

const InventoryPage = () => {
  const { inventory } = useInventory();
  

  return (
    <div className="flex items-center justify-center">
      {inventory.map(item => (
        <InventoryCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default InventoryPage;