import { useState } from "react";
import MainInfoForm from "./MainInfoForm";
import LocationForm from "./LocationForm";
import PolicyForm from "./PolicyForm";
import CrewForm from "./CrewForm";

const MainInfo = ({ id, formData, setFormData, createdYachtId }) => {
  const [form, setForm] = useState("Main Info");

  const [isMainInfoValid, setIsMainInfoValid] = useState(
    id || createdYachtId ? true : false
  );
  const [isLocationValid, setIsLocationValid] = useState(
    id || createdYachtId ? true : false
  );
  const [isCrewValid, setIsCrewValid] = useState(
    id || createdYachtId ? true : false
  );

  const handleFormChange = (newForm) => {
    const steps = ["Main Info ", "Location", "Crew", "Policy"];
    const newFormIndex = steps.indexOf(newForm);
    const currentFormIndex = steps.indexOf(form);
    if (newFormIndex < currentFormIndex) {
      setForm(newForm);
    } else {
      if (
        (form === "Main Info" && isMainInfoValid) ||
        (form === "Location" && isLocationValid) ||
        (form === "Crew" && isCrewValid) ||
        form === "Policy"
      ) {
        setForm(newForm);
      }
    }
  };

  return (
    <div className="inner_form_wrapper">
      <div className="wizard_tabs">
        {["Main Info", "Location", "Crew", "Policy"].map((fo, i) => (
          <div
            key={i}
            className={`wizard_tab ${form === fo ? "active" : ""}`}
            onClick={() => handleFormChange(fo)}
          >
            <div className="step_no">{i + 1}</div>
            <h6>{fo}</h6>
          </div>
        ))}
      </div>
      <div className="bg_white_card">
        {form === "Main Info" && (
          <MainInfoForm
            id={id}
            setForm={setForm}
            formData={formData}
            setFormData={setFormData}
            isValid={isMainInfoValid}
            setIsValid={setIsMainInfoValid}
            createdYachtId={createdYachtId}
          />
        )}
        {form === "Location" && (
          <LocationForm
            id={id}
            setForm={setForm}
            formData={formData}
            setFormData={setFormData}
            isValid={isLocationValid}
            setIsValid={setIsLocationValid}
            createdYachtId={createdYachtId}
          />
        )}
        {form === "Crew" && (
          <CrewForm
            id={id}
            setForm={setForm}
            formData={formData}
            setFormData={setFormData}
            isValid={isCrewValid}
            setIsValid={setIsCrewValid}
            createdYachtId={createdYachtId}
          />
        )}
        {form === "Policy" && (
          <PolicyForm
            id={id}
            setForm={setForm}
            formData={formData}
            setFormData={setFormData}
            createdYachtId={createdYachtId}
          />
        )}
      </div>
    </div>
  );
};

export default MainInfo;
