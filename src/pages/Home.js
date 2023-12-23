import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const navigate = useNavigate();
  const isAuth = useSelector(state => state.auth.isAuth);
  useEffect(
    () => {
      if (!isAuth) {
        console.log("NOT logged IN")
        navigate("/login");
      };

      console.log("Logged IN");
    },
    [isAuth, navigate]
  );
  return (
    <div>
      <h1>home</h1>
    </div>
  );
};

export default Home;
