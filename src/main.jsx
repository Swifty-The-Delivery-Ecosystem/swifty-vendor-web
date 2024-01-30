import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from 'react-router-dom';
import { OrderProvider } from "./context/orderContext";
import { SearchProvider } from "./context/searchContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <OrderProvider>
      <SearchProvider>
        <App/>
      </SearchProvider>
    </OrderProvider>
    </BrowserRouter>
  </React.StrictMode>
);
// reportWebVitals();
