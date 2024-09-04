import { useState, useEffect } from "react";

const CustomInputWithUnit = ({
  htmlFor,
  label,
  units,
  hint,
  formData,
  setFormData
}) => {
  const initialValue = formData[htmlFor] ? formData[htmlFor].split(" ")[0] : "";
  const initialUnit = formData[htmlFor]
    ? formData[htmlFor].split(" ")[1]
    : units[0];

  const [value, setValue] = useState(initialValue);
  const [unit, setUnit] = useState(initialUnit);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      [htmlFor]: `${value} ${unit}`
    }));
  }, [value, unit, setFormData, htmlFor]);

  useEffect(() => {
    const formDataValue = formData[htmlFor] ? formData[htmlFor].split(" ") : [];
    const newValue = formDataValue[0] || "";
    const newUnit = formDataValue[1] || units[0];
    setValue(newValue);
    setUnit(newUnit);
  }, [formData, htmlFor, units]);

  const handleValueChange = (e) => {
    setValue(e.target.value);
  };
  const handleUnitChange = (e) => {
    setUnit(e.target.value);
  };

  return (
    <div className="input-field">
      <label htmlFor={htmlFor}>
        {label} {hint && <span className="hint">{hint}</span>}
      </label>
      <div className="time-units">
        <input
          min="0"
          type="number"
          placeholder="00"
          name={htmlFor}
          id={htmlFor}
          value={value}
          onChange={handleValueChange}
        />
        <select
          className="units"
          name="units"
          id="units"
          value={unit}
          onChange={handleUnitChange}
        >
          {units.map((unit, index) => (
            <option key={index} value={unit}>
              {unit}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CustomInputWithUnit;
