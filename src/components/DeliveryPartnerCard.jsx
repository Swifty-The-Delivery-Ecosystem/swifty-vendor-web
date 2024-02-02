import React, { useState } from "react";
import { FaPencilAlt } from 'react-icons/fa';
import Modal from "react-modal";
import { useDelivery } from "../context/deliveryPartnerContext";


const UpdateModal = ({ deliveryPartner, isOpen, onClose }) => {
  const { createDeliveryPartner } = useDelivery();
  const [addFields, setAddFields] = useState({ ...deliveryPartner });

  const handleAdd = () => {
  createDeliveryPartner(deliveryPartner.deliveryPartner_id, addFields);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // setAddFields({ ...deliveryPartner, [name]: value });
    console.log(name)
    setAddFields((prevFields) => ({
        ...prevFields,
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
         value={addFields.name}
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
         value={addFields.phone}
         onChange={handleChange}
       />
     </div>
 
 <div>
<button
 className="bg-emerald-800 text-white px-4 py-2 rounded hover:bg-green-600 mr-4"
 onClick={handleAdd}
>
 Update Delivery Partner
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

const DeliveryPartnerCard = ({ deliveryPartner }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    console.log(deliveryPartner)
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


    return (
        <div className="border-4 w-5/6 h-1/5 p-4 m-2 bg-white rounded-lg shadow-md py-auto flex flex-col divide-x divide-gray md:flex-row  ">
            <div className="flex flex-col flex-[0.5_0.5_0%] px-1">
                <div className="text-gray-600"> {deliveryPartner.name}</div>
                <img className="text-gray-600 w rounded-xl" src={deliveryPartner.image_url} />
            </div>
            <div className="flex flex-col flex-1 px-1">
                <div className="text-gray-600 text-[10px] truncate">{deliveryPartner.phone} </div>
                <div className="text-gray-600">{deliveryPartner.otp} </div>
            </div>
            <div className="flex flex-col flex-1 px-1">
          
                <button className={`relative w-14 h-8 rounded-full bg-gray-300 p-1 ${deliveryPartner.is_available ? 'bg-green-500' : ''}`}>
                    <span className={`absolute w-6 h-6 bg-white rounded-full ${deliveryPartner.is_available ? 'transform translate-x-0 -translate-y-1/2 -translate-x-6' : '-translate-y-1/2 -translate-x-6'}`}></span>
                </button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md my-4" onClick={openModal}> <FaPencilAlt /> Edit</button>
            </div>

            <UpdateModal deliveryPartner={deliveryPartner} isOpen={isModalOpen} onClose={closeModal} />

        </div>
    );
};

export default DeliveryPartnerCard;
