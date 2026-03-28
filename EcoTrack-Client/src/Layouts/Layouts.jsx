import { Outlet } from "react-router";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar></Navbar>
      <div className="flex-1 bg-[#e5e7eb]">
        <div className="max-w-7xl mx-auto w-[95%] lg:w-[97%]">
          <Outlet></Outlet>
        </div>
      </div>
      <div className="bg-black">
        <div className="max-w-7xl mx-auto w-[95%] lg:w-[97%]">
          <Footer></Footer>
        </div>
      </div>
    </div>
  );
};

export default Layout;
