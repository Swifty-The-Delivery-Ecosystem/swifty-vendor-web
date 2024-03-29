import React, { useContext, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import InventoryContext from "../context/inventoryContext";

const AddItemsCard = () => {
  // const { inventory, setInventory } = useInventory();
  const inventoryContext = useContext(InventoryContext);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (value) => {
    setSearchTerm(value);

    // Check if the search term is empty
    if (value === "" || value.length === 0) {
      // Reset the inventory to its original state
      inventoryContext.setInventory(inventoryContext.inventory);
    } else {
      // Apply the filter and update the inventory
      const filteredItems = inventoryContext.inventory.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      inventoryContext.setInventory(filteredItems);
    }
  };

  const addItems = () => {
    // Perform any necessary logic
    console.log("Adding items...");
    navigate("/add_items");
  };
  const status = JSON.parse(localStorage.vendorData)["status"];

  return (
    <div className="w-1/2 my-4 flex justify-evenly">
      <input
        type="text"
        placeholder="Search"
        className="w-3/4 mx-2 my-3 bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 px-3 leading-8 transition-colors duration-200 ease-in-out"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
      />{" "}
      {status === "active" ? (
        <div
          onClick={addItems}
          className="w-fit my-2 cursor-pointer flex text-white items-center px-4 rounded-xl bg-emerald-500"
        >
          <IoMdAdd /> Add Items
        </div>
      ) : (
        <div className="px-4 bg-emerald-300 rounded-xl py-2">
          Account Review Still in Progress. Kindly wait for the account to be
          reviewed.
        </div>
      )}
    </div>
  );
};

export default AddItemsCard;
