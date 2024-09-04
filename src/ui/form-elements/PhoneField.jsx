import PhoneInput from "react-phone-number-input";

export default function PhoneField({ label, name, ...props }) {
  return (
    <div className="input-field">
      <label htmlFor={props?.id}>{label}</label>
      <div className="phone-group">
        <PhoneInput
          {...props}
          defaultCountry="SA"
          countryOptionsOrder={["SA", "AE"]}
          onChange={(value) => props.onChange(value, name)}
        />
      </div>
    </div>
  );
}
