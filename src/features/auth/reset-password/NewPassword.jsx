import axiosInstance from "../../../utils/axiosInstance";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { checkPasswordStrength } from "../../../utils/helper";
import { EXCEPTION_MESSAGES } from "../../../utils/constants";
import SubmitButton from "../../../ui/form-elements/SubmitButton";

export default function NewPassword({ formData, setFormData }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (!checkPasswordStrength(formData.password)) {
      toast.error(EXCEPTION_MESSAGES[1][5]);
      setLoading(false);
      return;
    }
    if (formData.password !== formData.re_password) {
      toast.error(EXCEPTION_MESSAGES[1][7]);
      setLoading(false);
      return;
    }
    try {
      const res = await axiosInstance.post(
        "/api/v1/user/verify_reset_pass_otp",
        formData
      );
      if (res?.status === 200) {
        toast.success("Password Reset Successful");
        navigate("/Login");
      }
    } catch (error) {
      console.error(error);
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-form">
      <form onSubmit={handleSubmit}>
        <input
          name="password"
          id="password"
          type="password"
          placeholder="New Password"
          required
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <input
          required
          name="password"
          id="password"
          type="password"
          placeholder="Confirm Password"
          onChange={(e) =>
            setFormData({ ...formData, re_password: e.target.value })
          }
        />
        <div className="buttons">
          <Link to="/Login" className="back">
            <i className="fa-light fa-arrow-left" />
          </Link>
          <SubmitButton loading={loading} name="Reset Password" />
        </div>
      </form>
    </div>
  );
}
