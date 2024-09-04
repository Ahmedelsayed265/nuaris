export default function InputWIthUnit({
  name,
  label,
  units,
  hint,
  value,
  onChange,
  selectValue,
  selectOnChange,
  selectName
}) {
  return (
    <div className="input-field">
      <label htmlFor={name}>
        {label} {hint && <span className="hint">{hint}</span>}
      </label>
      <div className="time-units">
        <input
          type="number"
          placeholder="00"
          name={name}
          id={name}
          value={value}
          onChange={onChange}
        />
        <select
          className="units"
          name={selectName}
          id="units"
          value={selectValue}
          onChange={selectOnChange}
        >
          <option value={""} disabled>
            Select
          </option>
          {units.map((unit, index) => (
            <option key={index} value={unit}>
              {unit}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
