import { useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import SubmitButton from "../../../ui/form-elements/SubmitButton";
import BackButton from "../../../ui/form-elements/BackButton";

export default function PhoneForm({
  setShowLoginForm,
  SetShowOtpForm,
  formData,
  setFormData
}) {
  const [loading, setLoading] = useState(false);

  const handleBackButtonClick = (e) => {
    e.preventDefault();
    setShowLoginForm(false);
    setFormData({});
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/users/send-otp/", formData);
      if (res.status === 200) {
        SetShowOtpForm(true);
        setShowLoginForm(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="tel"
        placeholder="EX: +455 567888 555"
        required
        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
      />
      <Link to={"/reset-password"}>Forget Password?</Link>
      <div className="buttons">
        <BackButton onClick={handleBackButtonClick} />
        <SubmitButton loading={loading} name="Login" />
      </div>
    </form>
  );
}
