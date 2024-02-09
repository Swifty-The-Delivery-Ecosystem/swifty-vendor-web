import { createContext } from "react";

const InventoryContext = createContext();

// export const useInventory = () => {
//   return useContext(InventoryContext);
// };

// export const InventoryProvider = ({ children }) => {
  // const [inventory, setInventory] = useState([]);
  // let isVendorLogged = false;
  // let vendorData = null;
  // if (localStorage.getItem("isVendorLogged")) {
  //   isVendorLogged = localStorage.isVendorLogged;
  // }

  // if (localStorage.getItem("vendorData")) {
  //   vendorData = JSON.parse(localStorage.vendorData);
  // }

  // useEffect(() => {
  //   if (isVendorLogged && vendorData && vendorData["status"] == "active") {
  //     const fetchInventory = async () => {
  //       if (isVendorLogged) {
  //         try {
  //           const token = localStorage.getItem("token");
  //           const response = await fetch(
  //             // "http://127.0.0.1:4005/api/v1/inventory/vendor/menuitems",
  //             "https://inventory-service-git-main-swiftyeco.vercel.app/api/v1/inventory/vendor/menuitems?startIndex=0&pageSize=5",
  //             {
  //               method: "GET",
  //               headers: {
  //                 "Content-Type": "application/json",
  //                 Authorization: "Bearer " + token,
  //               },
  //               //   mode: "no-cors"
  //             }
  //           );

  //           const data = await response.json();
  //           console.log(data.items);
  //           setInventory(data.items);
  //         } catch (error) {
  //           // Handle the error
  //         }
  //       }
  //     };
  //     fetchInventory();
  //   }
  // }, []);

  // const createInventoryItem = async (newItem) => {
  //   if (isVendorLogged && vendorData && vendorData["status"] == "active") {
  //     try {
  //       const response = await axios.post(
  //         "https://inventory-service-git-main-swiftyeco.vercel.app/api/v1/inventory/vendor/menuitems",
  //         {
  //           body: JSON.stringify(newItem),
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: "Bearer " + token,
  //           },
  //         }
  //       );
  //       setInventory([...inventory, response.data]);
  //     } catch (error) {
  //       // Handle the error
  //     }
  //   }
  // };

  // const updateInventoryItem = async (itemId, updatedItem) => {
  //   if (isVendorLogged && vendorData && vendorData["status"] == "active") {
  //     const token = localStorage.getItem("token");
  //     try {
  //       const response = await fetch(
  //         `https://inventory-service-git-main-swiftyeco.vercel.app/api/v1/inventory/vendor/menuitems?id=${updatedItem.item_id}`,
  //         {
  //           method: "PUT",
  //           params: {
  //             id: updatedItem.item_id,
  //           },
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: "Bearer " + token,
  //           },
  //           body: JSON.stringify(updatedItem),
  //         }
  //       );

  //       const data = await response.json();
  //       const updatedInventory = inventory.map((item) =>
  //         item.item_id === itemId ? data : item
  //       );
  //       setInventory(updatedInventory);
  //     } catch (error) {
  //       console.log(error);
  //       // Handle the error
  //     }
  //   }
  // };

//   return (
//     <InventoryContext.Provider
      // value={{
      //   inventory,
      //   createInventoryItem,
      //   updateInventoryItem,
      //   setInventory,
      // }}
//     >
//       {children}
//     </InventoryContext.Provider>
//   );
// };

export default InventoryContext;