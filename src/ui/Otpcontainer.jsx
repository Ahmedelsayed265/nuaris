import { useEffect, useState } from "react";

export default function Otpcontainer({ formData, setFormData }) {
  const [otpValue, setOtpValue] = useState("");

  useEffect(() => {
    const firstInput = document.getElementById("input1");
    if (firstInput) {
      firstInput.focus();
    }
  }, []);

  const handleInput = (index, event) => {
    const currentInput = event.target;
    const maxLength = parseInt(currentInput.getAttribute("maxlength"), 10);
    if (currentInput.value.length >= maxLength) {
      const nextInput = document.getElementById(`input${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
    const newOtpValue =
      otpValue.substring(0, index) +
      currentInput.value +
      otpValue.substring(index + 1);
    setOtpValue(newOtpValue);
    setFormData({ ...formData, otp: newOtpValue });
  };

  const handleKeyDown = (index, event) => {
    const currentInput = event.target;
    const previousInput = document.getElementById(`input${index - 1}`);
    if (
      event.key === "Backspace" &&
      currentInput.value.length === 0 &&
      previousInput
    ) {
      previousInput.focus();
    }
    if (event.key === "Backspace") {
      const newOtpValue =
        otpValue.substring(0, index - 1) + otpValue.substring(index);
      setOtpValue(newOtpValue);
      setFormData({ ...formData, otp: newOtpValue });
    }
  };

  return (
    <div className="otp-container">
      {[1, 2, 3, 4, 5, 6].map((index) => (
        <input
          key={index}
          id={`input${index}`}
          className="otp-input"
          type="number"
          maxLength="1"
          inputMode="numeric"
          pattern="[0-9]"
          required
          value={otpValue[index - 1] || ""}
          onChange={(e) => handleInput(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
        />
      ))}
    </div>
  );
}
