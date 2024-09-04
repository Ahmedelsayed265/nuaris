import { useState } from "react";
import { Link } from "react-router-dom";
import LoginForm from "../features/auth/login/LoginForm";
import OtpForm from "../features/auth/login/OtpForm";
import UserTypeSelection from "./../features/auth/login/UserTypeSelection";
import logoH from "../assets/images/logoH.svg";
import loginImage from "../assets/images/login-image.png";

export default function Login() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showOtpForm, SetShowOtpForm] = useState(false);
  const [formData, setFormData] = useState({});

  return (
    <section className="auth_section">
      <div className="form_wrapper">
        <div className="form_container">
          <div className="form-header">
            <div className="logo">
              <img src={logoH} alt="logo" />
              <span />
              <h1>Login</h1>
            </div>
            <h6>
              You don’t have an Account ?{" "}
              <Link to={"/register"}>Create Account</Link>
            </h6>
          </div>
          {!showLoginForm && !showOtpForm && (
            <UserTypeSelection setShowLoginForm={setShowLoginForm} />
          )}
          {showLoginForm && !showOtpForm && (
            <LoginForm
              formData={formData}
              setFormData={setFormData}
              SetShowOtpForm={SetShowOtpForm}
              setShowLoginForm={setShowLoginForm}
            />
          )}
          {showOtpForm && (
            <OtpForm
              formData={formData}
              setFormData={setFormData}
              SetShowOtpForm={SetShowOtpForm}
              setShowLoginForm={setShowLoginForm}
            />
          )}
        </div>
      </div>
      <div
        className="image_wrapper"
        style={{ backgroundImage: `url(${loginImage})` }}
      />
    </section>
  );
}
