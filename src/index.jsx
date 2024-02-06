import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { OrderProvider } from "./context/orderContext";
import { SearchProvider } from "./context/searchContext";
import { BrowserRouter } from 'react-router-dom';
import { VendorProvider } from "./context/vendorContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <VendorProvider>
    <BrowserRouter>
    <OrderProvider>
      <SearchProvider>
        
        <App/>
        
      </SearchProvider>
    </OrderProvider>
    </BrowserRouter>
    </VendorProvider>
  </React.StrictMode>
);
reportWebVitals();
