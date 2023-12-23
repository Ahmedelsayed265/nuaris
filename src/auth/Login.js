import React from "react";
import video from "../assets/images/auth-video.mp4";
import logo from "../assets/images/logoV.svg";
import LoginForm from "./../components/LoginForm";
// import OtpForm from "../components/OtpForm";

const Login = () => {
  return (
    <div className="auth_section">
      <div className="auth-form">
        <LoginForm />
        
        {/* <OtpForm/> */}
      </div>
      <div className="videoWrappper">
        <video src={video} muted loop playsInline autoPlay />
        <div className="logo">
          <img src={logo} alt="logo" loading="lazy" />
        </div>
      </div>
    </div>
  );
};

export default Login;
