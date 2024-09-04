import { useState } from "react";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import SubmitButton from "../../../../ui/form-elements/SubmitButton";
import axiosInstance from "../../../../utils/axiosInstance";
import useGetLocations from "../../../../hooks/useGetLocations";
import SelectField from "../../../../ui/form-elements/SelectField";
import useGetActivities from "../../../../hooks/useGetActivities";

const Location = ({
  id,
  createdActivityId,
  formData,
  setFormData,
  setForm,
  isValid,
  setIsValid
}) => {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const { data: locations } = useGetLocations();
  const { refetch } = useGetActivities();

  console.log(id, createdActivityId);

  const handleNext = (e) => {
    e.preventDefault();
    if (isValid) {
      setForm("Working hours");
    }
  };

  const handleBack = (e) => {
    e.preventDefault();
    setForm("Main Info");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      step_id: 2,
      activity_id: id || createdActivityId,
      location_id: formData.location_id
    };
    try {
      const response = await axiosInstance.post(
        "/api/v1/activity/create_activity",
        payload
      );
      if (response.status === 200 || response.status === 201) {
        toast.success("Activity Location Info Saved Successfully");
        setForm("Working hours");
        setIsValid(true);
        refetch();
        queryClient.invalidateQueries(["activity", id || createdActivityId]);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form_ui" onSubmit={handleSubmit}>
      <div className="row m-0">
        <div className="col-12 p-2">
          <h6 className="form_title">Location</h6>
        </div>
        {/* location */}
        <div className="col-12 p-2">
          <SelectField
            label={"Location Name"}
            value={formData.location_id}
            options={locations?.map((item) => ({
              value: item.id,
              name: item.name
            }))}
            onChange={(e) =>
              setFormData({ ...formData, location_id: e.target.value })
            }
          />
        </div>
        <div className="col-12 p-2">{/* {mapLoaded && <GoogleMaps  />} */}</div>
        <div className="col-12 p-2 pt-4 d-flex gap-3">
          <button className="next_btn" onClick={handleBack}>
            Back
          </button>
          <SubmitButton
            loading={loading}
            name="Save"
            className="save_btn ms-auto"
          />
          <button className="next_btn" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </form>
  );
};

export default Location;
