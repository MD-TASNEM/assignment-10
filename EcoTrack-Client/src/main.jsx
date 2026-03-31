import React from "react";
import { createRoot } from "react-dom/client";
import "./simple-app";

createRoot(document.getElementById("root")).render(
  React.createElement("div", null, "EcoTrack - Testing React Hooks"),
);
