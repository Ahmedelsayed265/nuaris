import { useState } from "react";
import Otpcontainer from "../../../ui/Otpcontainer";
import SubmitButton from "../../../ui/form-elements/SubmitButton";

export default function OtpForm({
  formData,
  setFormData,
  setResetPasswordStep
}) {
  const [loading, setLoading] = useState(false);

  const handleBackButtonClick = (e) => {
    e.preventDefault();
    setResetPasswordStep("s1");
    setFormData({ ...formData, email: "" });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    setResetPasswordStep("s3");
  };

  return (
    <form onSubmit={handleSubmit} className="reset-form">
      <Otpcontainer formData={formData} setFormData={setFormData} />
      <div className="resend">
        <h6>Resend the code</h6>
        <p>00:48</p>
      </div>
      <div className="buttons">
        <button className="back" onClick={handleBackButtonClick}>
          <i className="fa-light fa-arrow-left" />
        </button>
        <SubmitButton loading={loading} name="Confirm" />
      </div>
    </form>
  );
}
