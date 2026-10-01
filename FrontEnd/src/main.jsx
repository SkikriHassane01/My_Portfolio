import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./engine/scrollcraft.css";
import "./engine/scrollcraft.js";
import "./styles.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
