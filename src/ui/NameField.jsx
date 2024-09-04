import { handleChange } from "./../utils/helper";

const NameField = ({ formData, setFormData, name1, name2 }) => {
  return (
    <div className="input-field">
      <label htmlFor="firstName">Name</label>
      <div className="d-flex gap-3">
        <input
          placeholder="First Name"
          type="text"
          id={name1}
          name={name1}
          required
          value={formData[name1]}
          onChange={(e) => handleChange(e, setFormData)}
        />
        <input
          placeholder="Family Name"
          type="text"
          id={name2}
          name={name2}
          value={formData[name2]}
          required
          onChange={(e) => handleChange(e, setFormData)}
        />
      </div>
    </div>
  );
};

export default NameField;
