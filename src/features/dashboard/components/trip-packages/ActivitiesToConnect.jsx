import addIcon from "../../../../assets/images/icons/addRow.svg";
import deleteIcon from "../../../../assets/images/icons/delete.svg";
import InputField from "../../../../ui/form-elements/InputField";
import SelectField from "./../../../../ui/form-elements/SelectField";

const ActivitiesToConnect = ({
  formData,
  setFormData,
  activitiesInitial,
  activities
}) => {
  const handleDeleteRow = (index) => {
    const updatedActivitiesList = formData?.activities.filter(
      (_, i) => i !== index
    );
    setFormData({ ...formData, activities: updatedActivitiesList });
  };

  const handleAddRow = () => {
    const updatedActivitiesList = [...formData.activities, activitiesInitial];
    setFormData({ ...formData, activities: updatedActivitiesList });
  };
  return (
    <div className="col-12 p-2">
      <div className="addons_wrap">
        <h6>Activities you want to connect to the package</h6>
        {formData.activities?.map((activity, index) => {
          return (
            <div className="select_addon_row" key={index}>
              <SelectField
                id={`activity-${index}`}
                name={`activity-${index}`}
                required
                options={activities?.map((activity) => ({
                  name: activity.name,
                  value: activity.id
                }))}
                onChange={(e) => {
                  const updatedActivitiesList = [...formData.activities];
                  updatedActivitiesList[index].activity_id = Number(
                    e.target.value
                  );
                  setFormData({
                    ...formData,
                    activities: updatedActivitiesList
                  });
                }}
                value={activity?.activity_id}
              />
              <InputField
                placeholder="Quantity"
                type="number"
                required
                value={activity.quantity}
                onChange={(e) => {
                  const updatedActivitiesList = [...formData.activities];
                  updatedActivitiesList[index].quantity = e.target.value;
                  setFormData({
                    ...formData,
                    activities: updatedActivitiesList
                  });
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
          );
        })}
      </div>
    </div>
  );
};

export default ActivitiesToConnect;
