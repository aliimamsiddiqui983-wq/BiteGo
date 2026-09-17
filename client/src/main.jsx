import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

import StoreContextProvider from "./context/StoreContext.jsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreContextProvider>
        <App />

        <ToastContainer
          position="top-right"
          autoClose={3000}
          closeOnClick
          pauseOnHover
        />
      </StoreContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);