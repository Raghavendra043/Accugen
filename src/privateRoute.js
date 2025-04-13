import { useContext } from "react";
// import { AuthContext } from "./AuthProvider";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./Firebase/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { running, user } = useContext(AuthContext);

  if (running) {
    return <span className="loading loading-dots loading-lg"></span>;
  }

  if (user) {
    return children;
  }

  return <Navigate to="/auth/login" />;
};

export default PrivateRoute;

PrivateRoute.propTypes = {
  children: PropTypes.node,
};
