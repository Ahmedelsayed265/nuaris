import addRow from "../../../../../assets/images/icons/addRow.svg";
import InputField from "../../../../../ui/form-elements/InputField";

const IdRow = () => {
  return (
    <div className="id_row col-12 p-2">
      <InputField
        label="Name"
        id="name"
        name="name"
        placeholder="EX: mahmoud gamal "
      />
      <InputField
        label="ID Number"
        id="name"
        name="name"
        placeholder="EX: 123456789"
      />
      <InputField
        label="Date Of Birth"
        type="date"
        id="date"
        name="date"
      />
      <div className="add_button">
        <button type="button">
          <img src={addRow} alt="addrow" />
        </button>
      </div>
    </div>
  );
};

export default IdRow;
