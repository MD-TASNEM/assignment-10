import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Layouts = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto w-[95%] lg:w-[97%] py-8">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layouts;
