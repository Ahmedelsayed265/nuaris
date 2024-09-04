import addIcon from "../../../../assets/images/icons/addRow.svg";
import deleteIcon from "../../../../assets/images/icons/delete.svg";
import useGetWhatIncluding from "../../../../hooks/useGetWhatIncluding";
import InputField from "../../../../ui/form-elements/InputField";
import SelectField from "../../../../ui/form-elements/SelectField";

const WhatIncluded = ({ whatIsIncludedInitial, setFormData, formData }) => {
  const { data: whatIncluding } = useGetWhatIncluding();

console.log(whatIncluding);


  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedAddonsList = [...formData.including];
    updatedAddonsList[index] = {
      ...updatedAddonsList[index],
      [name]: value
    };
    setFormData((prev) => ({
      ...prev,
      including: updatedAddonsList
    }));
  };

  const handleAddRow = () => {
    const updatedAddonsList = [
      ...formData.including,
      { ...whatIsIncludedInitial }
    ];
    setFormData((prev) => ({
      ...prev,
      including: updatedAddonsList
    }));
  };

  const handleDeleteRow = (index) => {
    const updatedAddonsList = formData?.including?.filter(
      (_, i) => i !== index
    );
    setFormData((prev) => ({
      ...prev,
      including: updatedAddonsList
    }));
  };

  return (
    <div className="what_included">
      <h6>Whats including</h6>
      {formData?.including?.map((item, index) => (
        <div className="select_addon_row" key={index}>
          <SelectField
            id={`item-included-${index}`}
            onChange={(e) => handleChange(e, index)}
            value={item.including_id}
            name="including_id"
            options={whatIncluding?.map((item) => ({
              value: item.id,
              name: item.name
            }))}
          />
          <InputField
            placeholder="Quantity"
            type="number"
            onChange={(e) => handleChange(e, index)}
            value={item.quantity}
            name="quantity"
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
  );
};

export default WhatIncluded;
