import { useState } from "react";
import EmailForm from "./EmailForm";
import PhoneForm from "./PhoneForm";

export default function ResetForm({
  setResetPasswordStep,
  formData,
  setFormData,
  setOtpFromResponse
}) {
  const [formType, setFormType] = useState("email");

  return (
    <div className="reset-form">
      <div className="tabs">
        <button
          className={formType === "email" ? "active" : ""}
          onClick={() => setFormType("email")}
        >
          Email
        </button>
        <button
          className={formType === "phone" ? "active" : ""}
          onClick={() => setFormType("phone")}
        >
          Phone Number
        </button>
      </div>
      {formType === "email" && (
        <EmailForm
          formData={formData}
          setFormData={setFormData}
          setOtpFromResponse={setOtpFromResponse}
          setResetPasswordStep={setResetPasswordStep}
        />
      )}
      {formType === "phone" && (
        <PhoneForm
          formData={formData}
          setFormData={setFormData}
          setResetPasswordStep={setResetPasswordStep}
        />
      )}
    </div>
  );
}
