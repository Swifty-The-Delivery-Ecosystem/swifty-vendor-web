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
      <h2>Update Item</h2>
      <input type="text" name="name" value={updatedFields.name} onChange={handleChange} />
      <input type="text" name="description" value={updatedFields.description} onChange={handleChange} />
      
      <button onClick={handleUpdate}>Update</button>
      <button onClick={onClose}>Cancel</button>
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
