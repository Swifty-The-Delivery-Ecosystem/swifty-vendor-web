import React from "react";
import InventoryContext from "../context/inventoryContext";
import InventoryCard from "../components/InventoryCard";
import AddItemsCard from "../components/AddItemsCard";
import { useContext } from "react";

const InventoryPage = () => {
  // const { inventory } = useInventory();
  const inventoryContext = useContext(InventoryContext);

  return (
    <div className="flex items-center justify-center flex-col">
      <AddItemsCard />
      {inventoryContext.inventory.map((item) => (
        <InventoryCard key={item._id} item={item} />
      ))}
    </div>
  );
};

export default InventoryPage;
