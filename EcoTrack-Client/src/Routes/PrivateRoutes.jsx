import React, { use } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Navigate, useLocation } from "react-router";

const PrivateRoutes = ({ children }) => {
  const location = useLocation();
  // console.log(location);
  const { user, loading } = use(AuthContext);
  //console.log(user, loading);
  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <span className="loading loading-dots loading-xl"></span>
      </div>
    );
  }
  if (user) {
    //console.log("jjjjjjj");
    return children;
  }

  //    return <Navigate to='/user'></Navaigate>
  return <Navigate state={location.pathname} to="/user"></Navigate>;
};

export default PrivateRoutes;
