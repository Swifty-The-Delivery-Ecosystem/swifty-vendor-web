import React from "react";

const InventoryCard = ({ item }) => {
  
  return (
    <div className="border-4 w-5/6 h-1/5 p-4 m-2 bg-white rounded-lg shadow-md py-auto content-center flex  space-x-4   ">
        <div className="flex-col">
        <div className="text-gray-600"> {item.name}</div>
    <img className="text-gray-600 w-1/6 rounded-xl" src={item.image_url} />
        </div>
    <div className="flex-col">
    <div className="text-gray-600 text-[10px] truncate">{item.description} </div>
    <div className="text-gray-600">{item.price} </div>
    <div className="text-gray-600">{item.quantity} </div>
    </div>
    <div className="flex-col">
    <div className="text-gray-600">{item.rating} </div>
    </div>
    
   

  </div>
  );
};

export default InventoryCard;
