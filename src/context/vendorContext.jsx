import { createContext } from "react";


const VendorContext = createContext();

// export const useVendor = () => {
//   return useContext(VendorContext);
// };

// export const VendorProvider = ({ children }) => {
  // const [vendorData, setVendorData] = useState(null);
  // const [isVendorLogged, setIsVendorLogged] = useState(false);

  // const fetchVendorDetails = async (vendorId, token) => {
  //   const response = await fetch(
  //     `https://auth-six-pi.vercel.app/api/v1/auth/vendors/${vendorId}`,
  //     {
  //       method: "GET",
  //       headers: {
  //         Authorization: "Bearer " + token,
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );

  //   if (response.ok) {
  //     const result = await response.json();
  //     const data = result.data.user;
  //     setVendorData(data);
  //     localStorage.setItem("vendorData", JSON.stringify(data));
  //     localStorage.setItem("isVendorLogged", true);
  //     setIsVendorLogged(true);
  //   }
  // };

//   return (
//     <VendorContext.Provider
      // value={{
      //   isVendorLogged,
      //   vendorData,
      //   login,
      //   register,
      //   fetchVendorDetails,
      // }}
//     >
//       {children}
//     </VendorContext.Provider>
//   );
// };

export default VendorContext;
