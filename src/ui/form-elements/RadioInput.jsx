export default function RadioInput({ active, label, name, value, onChange }) {
  return (
    <div className="radio">
      <input
        type="radio"
        onChange={onChange}
        value={value}
        id={label}
        name={name}
        checked={active === value}
      />

      <label htmlFor={label}>
        <div className={`check`}>{label}</div>
      </label>
    </div>
  );
}
