import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import axiosInstance from "../../../utils/axiosInstance";
import SubmitButton from "../../../ui/form-elements/SubmitButton";

export default function EmailForm({
  formData,
  setFormData,
  setResetPasswordStep
}) {
  const [loading, setLoading] = useState(false);
  const role = useSelector((state) => state.authRole.role);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await axiosInstance.post(
        "/api/v1/user/generate_forgot_password_otp",
        {
          email: formData.email,
          role: role
        }
      );
      if (res.status === 200 || res.status === 201) {
        setResetPasswordStep("s2");
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
        name="email"
        id="email"
        type="email"
        placeholder="EX: mail@mail.com"
        required
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
