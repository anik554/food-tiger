import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRouter = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return <span>Loading...</span>;
  }

  if (user) {
    return children;
  }
  return <Navigate to="/login" state={location?.pathname}> </Navigate>;
};

export default PrivateRouter;
