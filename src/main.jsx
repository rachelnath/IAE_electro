import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "nouislider/dist/nouislider.min.css";
import "./assets/css/tailwinds.css";
import { Router } from "./router/router";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router />
  </StrictMode>
);
