import { useState } from "react";

const CheckItems = ({ name, label }) => {
  const [checked, setChecked] = useState(false);
  return (
    <div className={`addItem ${checked ? "active" : ""}`}>
      <label htmlFor={name}>
        <h6>{label}</h6>
        {checked === false ? (
          <i className="fa-light fa-plus"></i>
        ) : (
          <i className="fa-light fa-xmark"></i>
        )}
        <input
          type="checkbox"
          name={name}
          id={name}
          checked={checked}
          onChange={() => setChecked(!checked)}
        />
      </label>
    </div>
  );
};

export default CheckItems;
