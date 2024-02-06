import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from 'react-router-dom';
import { OrderProvider } from "./context/orderContext";
import { SearchProvider } from "./context/searchContext";
import { InventoryProvider } from "./context/inventoryContext";
import { DeliveryProvider } from "./context/deliveryPartnerContext";
import { VendorProvider } from "./context/vendorContext";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <VendorProvider>
    <BrowserRouter>
    <OrderProvider>
      <InventoryProvider>
        <DeliveryProvider>
      <SearchProvider>
        <App/>
      </SearchProvider>
      </DeliveryProvider>
      </InventoryProvider>
    </OrderProvider>
    </BrowserRouter>
    </VendorProvider>
  </React.StrictMode>
);
// reportWebVitals();
