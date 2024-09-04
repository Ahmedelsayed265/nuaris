import addIcon from "../../../../assets/images/icons/addRow.svg";
import deleteIcon from "../../../../assets/images/icons/delete.svg";
import InputField from "../../../../ui/form-elements/InputField";
import SelectField from "./../../../../ui/form-elements/SelectField";

const AddonsToConnect = ({ formData, setFormData, addonsInitial, addons }) => {
  const handleDeleteRow = (index) => {
    const updatedAddonsList = formData?.addons.filter((_, i) => i !== index);
    setFormData({ ...formData, addons: updatedAddonsList });
  };

  const handleAddRow = () => {
    const updatedAddonsList = [...formData.addons, addonsInitial];
    setFormData({ ...formData, addons: updatedAddonsList });
  };

  return (
    <div className="col-12 p-2">
      <div className="addons_wrap">
        <h6>Addons you want to connect to the package</h6>
        {formData?.addons?.map((addon, index) => (
          <div className="select_addon_row" key={`addon-row-${index}`}>
            <SelectField
              id={`addon-${index}`}
              options={addons?.map((addon) => ({
                name: addon.name,
                value: addon.id
              }))}
              value={addon.addon_id}
              onChange={(e) => {
                const updatedAddonsList = [...formData.addons];
                updatedAddonsList[index].addon_id = Number(e.target.value);
                setFormData({ ...formData, addons: updatedAddonsList });
              }}
            />
            <InputField
              placeholder="Quantity"
              type="number"
              value={addon.quantity || ""}
              onChange={(e) => {
                const updatedAddonsList = [...formData.addons];
                updatedAddonsList[index].quantity = e.target.value;
                setFormData({ ...formData, addons: updatedAddonsList });
              }}
            />
            {index === 0 ? (
              <button onClick={handleAddRow} type="button">
                <img src={addIcon} alt="add icon" />
              </button>
            ) : (
              <button onClick={() => handleDeleteRow(index)} type="button">
                <img src={deleteIcon} alt="delete icon" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddonsToConnect;
