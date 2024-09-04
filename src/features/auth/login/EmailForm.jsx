import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axiosInstance from "../../../utils/axiosInstance";
import SubmitButton from "../../../ui/form-elements/SubmitButton";
import BackButton from "../../../ui/form-elements/BackButton";

export default function EmailForm({
  setShowLoginForm,
  SetShowOtpForm,
  formData,
  setFormData
}) {
  const [loading, setLoading] = useState(false);
  const role = useSelector((state) => state.authRole.role);

  const handleBackButtonClick = (e) => {
    e.preventDefault();
    setShowLoginForm(false);
    setFormData({});
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await axiosInstance.post(
        "/api/v1/user/generate_email_login_otp",
        {
          email: formData.email,
          role: role
        }
      );
      if (res.status === 200 || res.status === 201) {
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
        type="email"
        name="email"
        id="email"
        required
        placeholder="EX: mail@mail.com"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <Link to={"/reset-password"}>Forget Password?</Link>
      <div className="buttons">
        <BackButton onClick={handleBackButtonClick} />
        <SubmitButton loading={loading} name="Login" />
      </div>
    </form>
  );
}
