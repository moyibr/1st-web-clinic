import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { clinicConfig } from "@/config/clinic.config";
import { applyClinicTheme } from "@/config/theme";
import "./index.css";

// Apply the active client's brand colors/fonts before first paint.
applyClinicTheme(clinicConfig);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
