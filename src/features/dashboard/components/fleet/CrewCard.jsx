import trashIcon from "../../../../assets/images/icons/delete.svg";
import ReactFlagsSelect from "react-flags-select";
import InputField from "../../../../ui/form-elements/InputField";
import GenderSelect from "../../../../ui/form-elements/GenderSelect";


const CrewCard = ({
  index,
  member,
  lenght,
  onChange,
  onDelete,
  handleGenderChange,
  handleNationalityChange
}) => {
  return (
    <div className="col-12 p-2">
      <div className="member_card">
        <div className="d-flex align-items-center justify-content-between">
          <p className="card_header">Crew member {index + 1}</p>
          <button
            style={{ opacity: lenght === 1 ? 0.5 : 1 }}
            disabled={lenght === 1}
            onClick={(e) => onDelete(e, index)}
          >
            <img src={trashIcon} alt="delete" />
          </button>
        </div>
        <div className="card_row">
          <div>
            <InputField
              label="Name"
              name="name"
              placeholder="Ex: Mahmoud"
              id={`crewName_${index}`}
              value={member?.name}
              onChange={(e) => onChange(e, index)}
            />
          </div>
          <div>
            <label htmlFor={`nationality_${index}`}>Nationality</label>
            <ReactFlagsSelect
              searchable={true}
              selectedSize={false}
              selected={member?.nationality}
              id={`nationality_${index}`}
              className="flag-select"
              onSelect={(code) => handleNationalityChange(code, index)}
            />
          </div>
        </div>
        <div className="card_row">
          <GenderSelect
            index={index}
            formData={member}
            onChange={handleGenderChange}
          />
        </div>
      </div>
    </div>
  );
};

export default CrewCard;
