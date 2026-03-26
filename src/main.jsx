import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./Routes/Routes";
import { RouterProvider } from "react-router";
import ContextProvider from "./Context/ContextProvider";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContextProvider>
      <Toaster></Toaster>
      <RouterProvider router={router} />
    </ContextProvider>
  </StrictMode>
);
