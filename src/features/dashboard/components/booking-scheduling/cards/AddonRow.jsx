import addRow from "../../../../../assets/images/icons/addRow.svg";
import InputField from "../../../../../ui/form-elements/InputField";
import SelectField from "../../../../../ui/form-elements/SelectField";

const AddonRow = () => {
  return (
    <div className="col-12 p-2">
      <div className="addons_wrapper">
        <SelectField
          label="Addons"
          id="addon"
          name="addon"
          options={[{ name: "addon 1", value: "addon1" }]}
        />
        <InputField
          label="Quantity"
          id="quantity"
          name="quantity"
          type="number"
          placeholder="00"
        />
        <div className="add_button">
          <button type="button">
            <img src={addRow} alt="addrow" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddonRow;
