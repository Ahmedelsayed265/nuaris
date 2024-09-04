import female from "../../assets/images/icons/female.svg";
import male from "../../assets/images/icons/male.svg";

export default function GenderSelect({ formData, onChange, index }) {
  return (
    <div className="gender_select">
      <label>Gender</label>
      <div>
        <label
          htmlFor={`female${index}`}
          className={`gender_card ${formData.gender === "female" && "active"}`}
        >
          <input
            onChange={() => onChange("female", index)}
            type="radio"
            name={`gender${index}`}
            id={`female${index}`}
          />
          <img src={female} alt="female" /> Female
        </label>
        <label
          htmlFor={`male${index}`}
          className={`gender_card ${formData.gender === "male" && "active"}`}
        >
          <input
            onChange={() => onChange("male", index)}
            type="radio"
            name={`gender${index}`}
            id={`male${index}`}
          />
          <img src={male} alt="male" /> Male
        </label>
      </div>
    </div>
  );
}
