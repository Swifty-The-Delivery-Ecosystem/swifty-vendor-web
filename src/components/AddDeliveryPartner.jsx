import React, { useState } from "react";
import { IoMdAdd } from 'react-icons/io';
import Modal from "react-modal";
import { useDelivery } from "../context/deliveryPartnerContext";

const AddDeliveryPartnerModal = ({ isOpen, onClose }) => {
    const {createDeliveryPartner}  = useDelivery();
    const [deliveryPartner, setDeliveryPartner] = useState({
        name: "",
        phone: "",
      });
    const handleAdd = () => {
    createDeliveryPartner(deliveryPartner);
    
    setDeliveryPartner({ name: "", phone: "" });
      onClose();
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setDeliveryPartner((prevDeliveryPartner) => ({
        ...prevDeliveryPartner,
        [name]: value,
      }));
    };
  
    return (
      <Modal isOpen={isOpen} onRequestClose={onClose}>
         <div className="bg-white p-8 rounded shadow-md my-20">
          
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-green-500"
              value={deliveryPartner.name}
              onChange={handleChange}
            />
          </div>
  
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Mobile Number
            </label>
            <input
              type="number"
              id="phone"
              name="phone"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-green-500"
              value={deliveryPartner.phone}
              onChange={handleChange}
            />
          </div>
      
      <div>
    <button
      className="bg-emerald-800 text-white px-4 py-2 rounded hover:bg-green-600 mr-4"
      onClick={handleAdd}
    >
      Add Delivery Partner
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



const AddDeliveryCard = () => {
    
const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

    return (
        <div className="border-4 w-5/6 h-1/5 p-4 m-2 bg-white rounded-lg shadow-md py-auto flex flex-col divide-x divide-gray md:flex-row">
        <div className="flex flex-col flex-1 px-1">
          <button
            className="bg-emerald-500 text-white px-4 py-2 rounded-md my-4"
            onClick={openModal}
          >
            <IoMdAdd /> Add Delivery Boy
          </button>
        </div>
        <AddDeliveryPartnerModal  isOpen={isModalOpen} onClose={closeModal} />
      </div>
    );
};
export default AddDeliveryCard;