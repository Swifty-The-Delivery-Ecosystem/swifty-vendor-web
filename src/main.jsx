import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import OrderState from "./context/OrderState";
import VendorState from "./context/VendorState";
import DeliveryState from "./context/DeliveryBoyState";
import InventoryState from "./context/InventoryState";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <VendorState>
      <BrowserRouter>
        <OrderState>
          <InventoryState>
            <DeliveryState>
              {/* <SearchProvider> */}
              <App />
              {/* </SearchProvider> */}
            </DeliveryState>
          </InventoryState>
        </OrderState>
      </BrowserRouter>
    </VendorState>
  </React.StrictMode>
);
// reportWebVitals();
