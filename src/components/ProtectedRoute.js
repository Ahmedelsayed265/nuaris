import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.auth.isAuth);
  useEffect(() => {
    if (!isAuth) navigate("/login");
  }, [isAuth, navigate]);
  return isAuth ? children : null;
};

export default ProtectedRoute;
