import React, { useContext, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import Modal from "react-modal";

import InventoryContext from "../context/inventoryContext";

const UpdateItemModal = ({ item, isOpen, onClose }) => {
  // const { updateInventoryItem } = useInventory();
  const inventoryContext = useContext(InventoryContext);
  const [updatedFields, setUpdatedFields] = useState({ ...item });
  const [selectedTags, setSelectedTags] = useState([...item.tags]);
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

  const handleUpdate = () => {
    inventoryContext.updateInventoryItem(item.item_id, {
      ...updatedFields,
      tags: selectedTags,
      is_veg: updatedFields.is_veg === "0" ? true : false,
      is_available: updatedFields.is_available === "1" ? true : false,
      is_healthy: updatedFields.is_healthy === "1" ? true : false,
    });
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedFields({ ...updatedFields, [name]: value });
  };

  const handleTagsChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedTags(selectedOptions);
    handleTagsChange(selectedOptions); // Call the function to update the updatedFields
  };
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      {/* <h2>Update Item</h2>
      <input type="text" name="name" value={updatedFields.name} onChange={handleChange} />
      <input type="text" name="description" value={updatedFields.description} onChange={handleChange} />
      
      <button onClick={handleUpdate}>Update</button>
      <button onClick={onClose}>Cancel</button> */}
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
            name="name"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-green-500"
            value={updatedFields.name}
            onChange={handleChange}
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
            name="price"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-green-500"
            value={updatedFields.price}
            onChange={handleChange}
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
            name="is_veg"
            defaultValue={updatedFields.is_veg ? "0" : "1"}
            onChange={handleChange}
          >
            <option value="0">Veg</option>
            <option value="1">Non-Veg</option>
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
            name="quantity"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-green-500"
            value={updatedFields.quantity}
            onChange={handleChange}
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
            name="description"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-green-500"
            value={updatedFields.description}
            onChange={handleChange}
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
            name="image_url"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-green-500"
            value={updatedFields.image_url}
            onChange={handleChange}
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
            name="is_available"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-green-500"
            defaultValue={updatedFields.is_available ? "1" : "0"}
            onChange={handleChange}
          >
            <option value="1">Yes</option>
            <option value="0">No</option>
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
            name="is_healthy"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-green-500"
            defaultValue={updatedFields.is_healthy ? "1" : "0"}
            onChange={handleChange}
          >
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
        </div>

        <div>
          <button
            className="bg-emerald-800 text-white px-4 py-2 rounded hover:bg-green-600 mr-4"
            onClick={handleUpdate}
          >
            Update Item
          </button>
          <button
            className="bg-red-800 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={onClose}
          >
            Discard
          </button>
        </div>
      </div>
    </Modal>
  );
};

const InventoryCard = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="border-4 w-1/2 h-1/5 md:px-6 md:py-4 m-2 bg-white rounded-lg shadow-md py-auto divide-x divide-gray md:flex-row  ">
      {/* <div className="flex flex-col flex-[0.5_0.5_0%] px-1">
        <div className="text-gray-600"> {item.name}</div>
        <img className="text-gray-600 w rounded-xl" src={item.image_url} />
      </div>
      <div className="flex flex-col flex-1 px-1">
        <div className="text-gray-600 text-[10px] truncate">
          {item.description}{" "}
        </div>
        <div className="text-gray-600">{item.price} </div>
        <div className="text-gray-600">{item.quantity} </div>
      </div>
      <div className="flex flex-col flex-1 px-1">
        <button
          className={`relative w-14 h-8 rounded-full bg-gray-300 p-1 ${
            item.is_available ? "bg-green-500" : ""
          }`}
        >
          <span
            className={`absolute w-6 h-6 bg-white rounded-full ${
              item.is_available
                ? "transform translate-x-0 -translate-y-1/2 -translate-x-6"
                : "-translate-y-1/2 -translate-x-6"
            }`}
          ></span>
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md my-4"
          onClick={openModal}
        >
          {" "}
          <FaPencilAlt /> Edit
        </button>
      </div> */}
      <div className="flex items-center gap-2 justify-evenly">
        <div>
          <img
            src={item.image_url}
            className="w-[12rem] rounded-xl h-[12rem] object-cover"
            alt=""
          />
        </div>
        <div className="items-center">
          <div className="text-xl my-2 font-normal font-serif">
            Name : {item.name}
          </div>
          <div className="text-xl my-2 font-normal font-serif">
            Description : {item.description}
          </div>
          <div className="text-xl my-2 font-normal font-serif">
            Amount : ₹ {item.price}
          </div>
          <div className="text-xl my-2 font-normal font-serif">
            Quantity : {item.quantity}
          </div>
          <div className="text-xl my-2 font-normal font-serif">
            Type : {item.is_veg ? "Veg" : "Non-Veg"}
          </div>
          <div className="text-xl my-2 font-normal font-serif">
            Available : {item.is_available ? "Yes" : "No"}
          </div>
        </div>
        <div className="flex items-center flex-col">
          <button
            className="bg-emerald-500 items-center gap-2 text-white flex justify-between px-4 py-2 rounded-md my-4"
            onClick={openModal}
          >
            <FaPencilAlt /> Edit
          </button>
        </div>
      </div>

      <UpdateItemModal item={item} isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default InventoryCard;
