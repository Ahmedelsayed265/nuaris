import { useState } from "react";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import DaysAccordion from "./../../../../ui/working-hours/DaysAccordion";
import SubmitButton from "../../../../ui/form-elements/SubmitButton";
import axiosInstance from "../../../../utils/axiosInstance";
import useGetActivities from "../../../../hooks/useGetActivities";

const WorkingHours = ({
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
  const { refetch } = useGetActivities();

  const handleNext = (e) => {
    e.preventDefault();
    if (isValid) {
      setForm("Prices");
    }
  };

  const handleBack = (e) => {
    e.preventDefault();
    setForm("Location");
  };

  const handleCheck = (e, index) => {
    const { checked } = e.target;
    setFormData((prev) => {
      let newWorkingHours = [...prev.working_hours];
      if (!checked) {
        newWorkingHours[index].hours = [
          { from_time: "00:00", to_time: "00:00" }
        ];
      }
      newWorkingHours[index].selected = checked;
      return {
        ...prev,
        working_hours: newWorkingHours
      };
    });
  };

  const handleTimeChange = (value, key, index, currentObject, day) => {
    const updatedHours = [...currentObject.hours];
    updatedHours[index][key] = value;
    const updatedObject = { ...currentObject, hours: updatedHours };
    setFormData((prev) => {
      const currentIndex = prev.working_hours.findIndex(
        (obj) => obj.day === day
      );
      const newFormData = [...prev.working_hours];
      newFormData[currentIndex] = updatedObject;
      return {
        ...prev,
        working_hours: newFormData
      };
    });
  };

  const handleAddNewHoursRow = (day, currentObject) => {
    if (currentObject.hours.length < 3) {
      const newObject = { ...currentObject };
      newObject.hours.push({ from_time: "00:00", to_time: "00:00" });
      setFormData((prev) => ({
        ...prev,
        working_hours: prev.working_hours.map((obj) => {
          if (obj.day === day) {
            return newObject;
          }
          return obj;
        })
      }));
    }
  };

  const handleDeleteCurrentHours = (index, currentObject, day) => {
    const newObject = { ...currentObject };
    newObject.hours.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      working_hours: prev.working_hours.map((obj) => {
        if (obj.day === day) {
          return newObject;
        }
        return obj;
      })
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const filteredFormData = formData.working_hours.filter(
      (obj) => obj.selected === true
    );
    const reqData = filteredFormData.map((obj) => {
      return {
        day: obj.day,
        hours: obj.hours
      };
    });

    const payLoad = {
      activity_id: id || createdActivityId,
      step_id: 3,
      working_hours: {
        working_hours: reqData
      }
    };
    try {
      const response = await axiosInstance.post(
        "/api/v1/activity/create_activity",
        payLoad
      );
      if (response.status === 200 || response.status === 201) {
        toast.success("Activity Working Hours Info Saved Successfully");
        setForm("Prices");
        setIsValid(true);
        refetch();
        queryClient.invalidateQueries(["activity", id || createdActivityId]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form_ui" onSubmit={handleSubmit}>
      <div className="row m-0">
        <div className="col-12 p-2">
          <h6 className="form_title">Working hours</h6>
        </div>
        <div className="col-12 p-2">
          <DaysAccordion
            handleCheck={handleCheck}
            workingHours={formData.working_hours}
            handleTimeChange={handleTimeChange}
            handleAddNewHoursRow={handleAddNewHoursRow}
            handleDeleteCurrentHours={handleDeleteCurrentHours}
          />
        </div>
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

export default WorkingHours;
