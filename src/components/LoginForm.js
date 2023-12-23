import React, { useState } from "react";
import fav from "../assets/images/fav.svg";
import axios from "axios";
import generateRandomNumbers from "./../util/generateRandomNumber";
import { setIsAuth } from "../redux/slices/authSlice";



const LoginForm = () => {
  const [formData, setFormData] = useState({ otp: generateRandomNumbers() });
  let headersList = {
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded"
  };
  let requestOptions = {
    method: "POST",
    url: "http://nuaris-app.me-south-1.elasticbeanstalk.com/users/send-otp/",
    headers: headersList,
    requestBody: formData
  };
  const handleSubmit = async e => {
    e.preventDefault();
    axios
      .request(requestOptions)
      .then(() => {
        console.log("otp sennt");
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <React.Fragment>
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
              onChange={e =>
                setFormData({ ...formData, email: e.target.value })}
            />
          </div>
        </div>
        <button type="submit">Login</button>

      </form>
    </React.Fragment>
  );
};

export default LoginForm;
