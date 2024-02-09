import React, { useContext, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import Modal from "react-modal";
import DeliveryContext from "../context/deliveryPartnerContext";

const AddDeliveryPartnerModal = ({ isOpen, onClose }) => {
  // const { createDeliveryPartner } = useDelivery();
  const deliveryContext = useContext(DeliveryContext);
  const [deliveryPartner, setDeliveryPartner] = useState({
    name: "",
    phone: "",
  });
  const handleAdd = () => {
    deliveryContext.createDeliveryPartner(deliveryPartner);

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
  const [searchTerm, setSearchTerm] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleSearch = (value) => {
    setSearchTerm(value);

    // // Check if the search term is empty
    // if (value === "" || value.length === 0) {
    //   // Reset the inventory to its original state
    //   setInventory(inventory);
    // } else {
    //   // Apply the filter and update the inventory
    //   const filteredItems = inventory.filter((item) =>
    //     item.name.toLowerCase().includes(value.toLowerCase())
    //   );
    //   setInventory(filteredItems);
    // }
  };

  return (
    //   <div className="border-4 w-5/6 h-1/5 p-4 m-2 bg-white rounded-lg shadow-md py-auto flex flex-col divide-x divide-gray md:flex-row">
    //   <div className="flex flex-col flex-1 px-1">
    //     <button
    //       className="bg-emerald-500 text-white px-4 py-2 rounded-md my-4"
    //       onClick={openModal}
    //     >
    //       <IoMdAdd /> Add Delivery Boy
    //     </button>
    //   </div>
    //   <AddDeliveryPartnerModal  isOpen={isModalOpen} onClose={closeModal} />
    // </div>
    <div className="w-1/2 my-4 flex justify-evenly">
      <input
        type="text"
        placeholder="Search"
        className="w-3/4 mx-2 my-3 bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 px-3 leading-8 transition-colors duration-200 ease-in-out"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <div
        onClick={openModal}
        className="w-fit my-2 cursor-pointer flex text-white items-center px-4 rounded-xl bg-emerald-500"
      >
        {" "}
        <IoMdAdd /> Add Delivery Partner
      </div>
      <AddDeliveryPartnerModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default AddDeliveryCard;
