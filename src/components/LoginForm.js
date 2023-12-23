import { useState } from "react";
import fav from "../assets/images/fav.svg";
import axios from "../util/axios";
import generateRandomNumber from "./../util/generateRandomNumber";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    otp: generateRandomNumber(),
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const headersList = {
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
  };
  const requestOptions = {
    method: "POST",
    url: "/users/send-otp/",
    headers: headersList,
    data: formData,
  };
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    await axios
      .request(requestOptions)
      .then(() => {
        console.log("otp sennt");
      })
      .catch((err) => {
        console.error("Error logging in: ", err);
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="head">
          <img src={fav} alt="logoFav" loading="lazy" />
          <h1>Welcome back to Nuaris</h1>
        </div>
        <div className="form_group">
          <div className="input_field">
            <label htmlFor="email">
              <i className="fa-sharp fa-light fa-envelope" /> Email Address
            </label>
            <input
              required
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email address"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
        </div>
        <button
          style={{ opacity: loading ? 0.7 : 1 }}
          disabled={loading}
          type="submit"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </>
  );
};

export default LoginForm;
