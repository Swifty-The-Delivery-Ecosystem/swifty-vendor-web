import React, { useState } from "react";
import { IoMdAdd } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const AddItemsCard = () => {
    
    const navigate = useNavigate();
    const addItems = () => {
        // Perform any necessary logic
        console.log('Adding items...');
        navigate('/add_items'); 
      };
    

    return (
        <div className="border-4 w-5/6 h-1/5 p-4 m-2 bg-white rounded-lg shadow-md py-auto flex flex-col divide-x divide-gray md:flex-row">
        <div className="flex flex-col flex-1 px-1">
          <button
            className="bg-emerald-500 text-white px-4 py-2 rounded-md my-4"
            onClick={addItems}
          >
            <IoMdAdd /> Add Items
          </button>
        </div>
      </div>
    );
};
export default AddItemsCard;