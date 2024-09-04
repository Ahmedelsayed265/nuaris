import axiosInstance from "../../../utils/axiosInstance";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../../redux/slices/authedUser";
import Otpcontainer from "../../../ui/Otpcontainer";
import SubmitButton from "../../../ui/form-elements/SubmitButton";
import BackButton from "../../../ui/form-elements/BackButton";
import handWave from "../../../assets/images/icons/waving-hand.svg";

export default function OtpForm({
  formData,
  setFormData,
  SetShowOtpForm,
  setShowLoginForm
}) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleBackButtonClick = (e) => {
    e.preventDefault();
    setShowLoginForm(true);
    SetShowOtpForm(false);
    setFormData({});
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await axiosInstance.post(
        "/api/v1/user/verify_email_login_otp",
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
        <h2 className="head">
          Welcome Back ! <img src={handWave} alt="hand-wave" />
        </h2>
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
