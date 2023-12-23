import React from "react";
import fav from "../assets/images/fav.svg";
import Otpcontainer from "../shared/Otpcontainer";

const OtpForm = () => {
  return (
    <form action="">
      <div className="head">
        <img src={fav} alt="logoFav" loading="lazy" />
        <h1>Enter the verification code</h1>
        <p>
          We've sent a 6-digit confirmation code to
          <span> example@example.com </span>
          enter the code for verification
        </p>
      </div>
      <Otpcontainer />
    </form>
  );
};

export default OtpForm;
