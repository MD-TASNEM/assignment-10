import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./Routes/Routes";
import { RouterProvider } from "react-router";
import ContextProvider from "./Context/ContextProvider";
import { Toaster } from "react-hot-toast";
import ErrorBoundary from "./Components/ErrorBoundary";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContextProvider>
      <ErrorBoundary>
        <Toaster></Toaster>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </ContextProvider>
  </StrictMode>
);
