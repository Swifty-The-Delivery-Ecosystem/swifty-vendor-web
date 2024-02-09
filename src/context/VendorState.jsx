import React, { useState } from "react";
import VendorContext from "./vendorContext";

const VendorState = (props) => {
  const [vendorData, setVendorData] = useState(null);
  const [isVendorLogged, setIsVendorLogged] = useState(false);

  return (
    <VendorContext.Provider
      value={{
        isVendorLogged,
        vendorData,
        setIsVendorLogged,
        setVendorData,
      }}
    >
      {props.children}
    </VendorContext.Provider>
  );
};

export default VendorState;
