import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Navigate, useLocation } from "react-router";

const PrivateRoutes = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useContext(AuthContext);
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
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoutes;
