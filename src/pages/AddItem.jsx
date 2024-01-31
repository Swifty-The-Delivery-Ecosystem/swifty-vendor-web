import { faTags } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";

const AddItem = () => {
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState();
  const [is_veg, setIsVeg] = useState(1);
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [tags, setTags] = useState("");
  const [is_available, setIsAvailable] = useState(0);
  const [is_healthy, setIsHealthy] = useState(0);

  const handleSubmit = async() => {
    try {
      const token = localStorage.getItem('token');
      console.log(itemName)
      let response = await fetch(
        "http://127.0.0.1:4005/api/v1/inventory/vendor/menuitems",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " +  token
          },
          body: JSON.stringify({
            name:itemName,
    price:price,
    quantity:quantity,
    image_url:imageURL,
    description:description,
    is_veg:is_veg,
    tags:tags,
    is_available:is_available,
    is_healthy:is_healthy
     }),
        }
      );
      console.log(response)

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        const errorData = await response.json();
        setError(errorData.error);
      }
    } catch (error) {
      console.log(error);
      // setError("An error occurred");
    }
  }
  return (
    <div className="flex items-center justify-center my-20 h-screen bg-green-100">
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
            placeholder="Enter your username"
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
      <label htmlFor="type" className="block text-gray-700 text-sm font-bold mb-2">
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
      <label htmlFor="tags" className="block text-gray-700 text-sm font-bold mb-2">
        Tags
      </label>
      <select
        id="tags"
        className="w-full px-3 py-2 border rounded focus:outline-none focus:border-green-500"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
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
      <label htmlFor="is_healthy" className="block text-gray-700 text-sm font-bold mb-2">
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
  )
}

export default AddItem