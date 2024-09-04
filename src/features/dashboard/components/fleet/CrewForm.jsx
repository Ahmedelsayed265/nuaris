import { useState } from "react";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import CrewCard from "./CrewCard";
import addRow from "../../../../assets/images/icons/add.svg";
import SubmitButton from "./../../../../ui/form-elements/SubmitButton";
import axiosInstance from "../../../../utils/axiosInstance";

const CrewForm = ({
  id,
  setForm,
  formData,
  setFormData,
  isValid,
  setIsValid,
  createdYachtId
}) => {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const initialMemberData = {
    name: "",
    nationality: "SA",
    gender: "male"
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (isValid) {
      setForm("Policy");
    }
  };

  const handleBack = (e) => {
    e.preventDefault();
    setForm("Location");
  };

  const handleAddRow = (e) => {
    e.preventDefault();
    setFormData((prev) => ({
      ...prev,
      crew: [...prev.crew, initialMemberData]
    }));
  };

  const handleDeleteRow = (e, index) => {
    e.preventDefault();
    setFormData((prev) => ({
      ...prev,
      crew: prev.crew.filter((_, i) => i !== index)
    }));
  };

  const handleChange = (e, i) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      crew: prev?.crew?.map((member, index) => {
        if (index === i) {
          return { ...member, [name]: value };
        }
        return member;
      })
    }));
  };

  const handleNationalityChange = (countryCode, i) => {
    setFormData((prev) => ({
      ...prev,
      crew: prev?.crew?.map((member, index) => {
        if (index === i) {
          return { ...member, nationality: countryCode };
        }
        return member;
      })
    }));
  };

  const handleGenderChange = (gender, i) => {
    setFormData((prev) => ({
      ...prev,
      crew: prev?.crew?.map((member, index) => {
        if (index === i) {
          return { ...member, gender };
        }
        return member;
      })
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      step_id: 3,
      yacht_id: id || createdYachtId,
      crew: formData.crew
    };
    if (id || createdYachtId) {
      payload.yacht_id = id || createdYachtId;
    }
    try {
      const response = await axiosInstance.post(
        "/api/v1/yacht/create_yacht",
        payload
      );
      if (response.status === 200 || response.status === 201) {
        toast.success("Yacht Main Info Saved Successfully");
        setForm("Policy");
        setIsValid(true);
        queryClient.invalidateQueries(["yachts"]);
        queryClient.invalidateQueries(["yacht", id || createdYachtId]);
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
        <div className="col-12 p-2 d-flex align-items-center justify-content-between">
          <h6 className="form_title m-0">Crew</h6>
          <button
            disabled={formData.crew.length === 20}
            onClick={(e) => handleAddRow(e)}
          >
            <img src={addRow} alt="add-row" />
          </button>
        </div>
        {formData?.crew?.map((member, i) => (
          <CrewCard
            key={i}
            index={i}
            member={member}
            onChange={handleChange}
            onDelete={handleDeleteRow}
            lenght={formData?.crew?.length}
            handleGenderChange={handleGenderChange}
            handleNationalityChange={handleNationalityChange}
          />
        ))}
        <div className="col-12 p-2 pt-4 d-flex gap-3 ">
          <button className="next_btn" onClick={handleBack}>
            Back
          </button>
          <SubmitButton
            className="save_btn ms-auto"
            name={"Save"}
            loading={loading}
          />
          <button className="next_btn" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </form>
  );
};

export default CrewForm;
