import { faTags } from "@fortawesome/free-solid-svg-icons";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InventoryContext from "../context/inventoryContext";

const AddItem = () => {
  // const { inventory, setInventory } = useInventory();
  const inventoryContext = useContext(InventoryContext);
  const navigate = useNavigate();
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState();
  const [is_veg, setIsVeg] = useState(1);
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [tags, setTags] = useState("");
  const [is_available, setIsAvailable] = useState(0);
  const [is_healthy, setIsHealthy] = useState(0);
  const [selectedTags, setSelectedTags] = useState([]);

  const tagsOptions = [
    "Pizza",
    "Paratha",
    "Biryani",
    "Rolls",
    "Chinese",
    "Sandwich",
  ];

  const handleTagClick = (tag) => {
    const isSelected = selectedTags.includes(tag);
    const newSelectedTags = isSelected
      ? selectedTags.filter((selectedTag) => selectedTag !== tag)
      : [...selectedTags, tag];

    setSelectedTags(newSelectedTags);
  };

  const toggleDropdownTags = () => {
    setIsOpenTags(!isOpenTags);
  };

  const [isOpenTags, setIsOpenTags] = useState(false);

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(itemName);
      let response = await fetch(
        "https://inventory-service-git-main-swiftyeco.vercel.app/api/v1/inventory/vendor/menuitems",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            name: itemName,
            price: price,
            quantity: quantity,
            image_url: imageURL,
            description: description,
            is_veg: is_veg,
            tags: selectedTags,
            is_available: is_available,
            is_healthy: is_healthy,
          }),
        }
      );
      console.log(response);

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        inventoryContext.setInventory([...inventoryContext.inventory, data]);
        navigate("/inventory");
      } else {
        const errorData = await response.json();
        setError(errorData.error);
      }
    } catch (error) {
      console.log(error);
      // setError("An error occurred");
    }
  };
  return (
    <div className="flex items-center justify-center py-8 min-h-screen bg-green-100">
      <div className="bg-white p-8 rounded shadow-md my-20">
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Item Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-green-500"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-green-500"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="type"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Type
          </label>
          <select
            id="type"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-green-500"
            value={is_veg}
            onChange={(e) => setIsVeg(e.target.value)}
          >
            <option value="">Select...</option>
            <option value={0}>Veg</option>
            <option value={1}>Non-Veg</option>
          </select>
        </div>

        <div className="mb-6">
          <label
            htmlFor="quantity"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-green-500"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="description"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-green-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="imageURL"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Image URL
          </label>
          <input
            type="text"
            id="imageURL"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-green-500"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="tags"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Tags
          </label>
          <div className="relative inline-block text-left mt-1">
            <div>
              <span className="rounded-md shadow-sm">
                <button
                  type="button"
                  onClick={toggleDropdownTags}
                  className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-700"
                  aria-haspopup="true"
                  aria-expanded="true"
                >
                  {selectedTags.length > 0
                    ? selectedTags.join(", ")
                    : "Select tags"}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-5 w-5 pl-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </span>
            </div>

            {isOpenTags && (
              <div className="origin-top-right absolute right-0 mt-2 w-[170px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  {tagsOptions.map((tag) => (
                    <div
                      key={tag}
                      onClick={() => handleTagClick(tag)}
                      className={`block px-4 py-2 text-sm text-gray-700 ${
                        selectedTags.includes(tag)
                          ? "bg-gray-100"
                          : "hover:bg-gray-100"
                      } hover:text-gray-900 cursor-pointer`}
                      role="menuitem"
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="mb-6">
          <label
            htmlFor="availability"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Available
          </label>
          <select
            id="availability"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-green-500"
            value={is_available}
            onChange={(e) => setIsAvailable(e.target.value)}
          >
            <option value="">Select...</option>
            <option value={1}>Yes</option>
            <option value={0}>No</option>
          </select>
        </div>
        <div className="mb-6">
          <label
            htmlFor="is_healthy"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Is Healthy
          </label>
          <select
            id="is_healthy"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-green-500"
            value={is_healthy}
            onChange={(e) => setIsHealthy(e.target.value)}
          >
            <option value="">Select...</option>
            <option value={1}>Yes</option>
            <option value={0}>No</option>
          </select>
        </div>

        <button
          className="bg-emerald-800 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={handleSubmit}
        >
          Add Item
        </button>
      </div>
    </div>
  );
};

export default AddItem;
