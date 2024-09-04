import axiosInstance from "../../../utils/axiosInstance";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../../redux/slices/authedUser";
import Otpcontainer from "../../../ui/Otpcontainer";
import SubmitButton from "../../../ui/form-elements/SubmitButton";
import BackButton from "../../../ui/form-elements/BackButton";

export default function OtpForm({ email, setShowOtpForm }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: email,
    otp: ""
  });

  const handleBackButtonClick = (e) => {
    setShowOtpForm(false);
    e.preventDefault();
    setFormData({
      email: "",
      otp: ""
    });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await axiosInstance.post(
        "/api/v1/user/verify_email_signup_otp",
        formData
      );
      if (res.status === 200) {
        navigate("/dashboard");
        toast.success("Welcome To Nuaris");
        dispatch(setUser(res.data));
        dispatch(setToken(res.data.access_token));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <p className="sub-head">
          Please enter the verification code sent to{" "}
          <span>{formData.email}</span>.
        </p>
        <Otpcontainer formData={formData} setFormData={setFormData} />
        <div className="resend">
          <h6>Resend the code</h6>
          <p>00:48</p>
        </div>
        <div className="buttons">
          <BackButton onClick={handleBackButtonClick} />
          <SubmitButton loading={loading} name="Confirm" />
        </div>
      </form>
    </div>
  );
}
