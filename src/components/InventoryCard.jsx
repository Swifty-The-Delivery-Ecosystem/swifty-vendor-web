import React, { useState } from "react";
import { FaPencilAlt } from 'react-icons/fa';
import Modal from "react-modal";

import { useInventory } from "../context/inventoryContext";


const UpdateItemModal = ({ item, isOpen, onClose }) => {
  const { updateInventoryItem } = useInventory();
  const [updatedFields, setUpdatedFields] = useState({ ...item });

  const handleUpdate = () => {
    updateInventoryItem(item.item_id, updatedFields);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedFields({ ...updatedFields, [name]: value });
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
      <label htmlFor="type" className="block text-gray-700 text-sm font-bold mb-2">
        Type
      </label>
      <select
        id="type"
        className="w-full px-3 py-2 border rounded focus:outline-none focus:border-green-500"
        name="is_veg"
        value={updatedFields.is_veg}
        onChange={handleChange}
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
      <label htmlFor="tags" className="block text-gray-700 text-sm font-bold mb-2">
        Tags
      </label>
      <select
        id="tags"
        className="w-full px-3 py-2 border rounded focus:outline-none focus:border-green-500"
        value={updatedFields.tags}
        name="tags"
        onChange={handleChange}
      >
        <option value="">Select...</option>
        <option value="Pizza">Pizza</option>
        <option value="Paratha">Paratha</option>
        <option value="Biryani">Biryani</option>
        <option value="Rolls">Rolls</option>
        <option value="Chinese">Chinese</option>
        <option value="Sandwich">Sandwich</option>
      </select>
    </div>

    <div className="mb-6">
      <label htmlFor="availability" className="block text-gray-700 text-sm font-bold mb-2">
        Available
      </label>
      <select
        id="availability"
        name="availability"
        className="w-full px-3 py-2 border rounded focus:outline-none focus:border-green-500"
        value={updatedFields.is_available}
        onChange={handleChange}
      >
        <option value="">Select...</option>
        <option value={1}>Yes</option>
        <option value={0}>No</option>
      </select>
    </div>
    <div className="mb-6">
      <label htmlFor="is_healthy" className="block text-gray-700 text-sm font-bold mb-2">
        Is Healthy
      </label>
      <select
        id="is_healthy"
        ame="is_healthy"
        className="w-full px-3 py-2 border rounded focus:outline-none focus:border-green-500"
        value={updatedFields.is_healthy}
        onChange={handleChange}
      >
        <option value="">Select...</option>
        <option value={1}>Yes</option>
        <option value={0}>No</option>
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
        <div className="border-4 w-5/6 h-1/5 p-4 m-2 bg-white rounded-lg shadow-md py-auto flex flex-col divide-x divide-gray md:flex-row  ">
            <div className="flex flex-col flex-[0.5_0.5_0%] px-1">
                <div className="text-gray-600"> {item.name}</div>
                <img className="text-gray-600 w rounded-xl" src={item.image_url} />
            </div>
            <div className="flex flex-col flex-1 px-1">
                <div className="text-gray-600 text-[10px] truncate">{item.description} </div>
                <div className="text-gray-600">{item.price} </div>
                <div className="text-gray-600">{item.quantity} </div>
            </div>
            <div className="flex flex-col flex-1 px-1">
                {/* <div className="text-gray-600">{item.rating} </div> */}
                <button className={`relative w-14 h-8 rounded-full bg-gray-300 p-1 ${item.is_available ? 'bg-green-500' : ''}`}>
                    <span className={`absolute w-6 h-6 bg-white rounded-full ${item.is_available ? 'transform translate-x-0 -translate-y-1/2 -translate-x-6' : '-translate-y-1/2 -translate-x-6'}`}></span>
                </button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md my-4" onClick={openModal}> <FaPencilAlt /> Edit</button>
            </div>

            <UpdateItemModal item={item} isOpen={isModalOpen} onClose={closeModal} />

        </div>
    );
};

export default InventoryCard;
