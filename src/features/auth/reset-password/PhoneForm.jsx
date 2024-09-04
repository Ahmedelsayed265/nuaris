import { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import SubmitButton from "../../../ui/form-elements/SubmitButton";

export default function PhoneForm({
  setShowLoginForm,
  SetShowOtpForm,
  formData,
  setFormData
}) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/users/otp/", formData);
      if (res?.status === 200) {
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
        required
        placeholder="EX: +455 567888 555"
        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
      />
      <div className="buttons">
        <Link to="/Login" className="back">
          <i className="fa-light fa-arrow-left" />
        </Link>
        <SubmitButton loading={loading} name="Send Code" />
      </div>
    </form>
  );
}
