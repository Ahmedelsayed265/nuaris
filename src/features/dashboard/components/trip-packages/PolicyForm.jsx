import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { filterEmptyKeys } from "../../../../utils/helper";
import { useQueryClient } from "@tanstack/react-query";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CancellationPolicy from "../CancellationPolicy";
import SubmitButton from "./../../../../ui/form-elements/SubmitButton";
import axiosInstance from "../../../../utils/axiosInstance";

const PolicyForm = ({
  id,
  setForm,
  formData,
  setFormData,
  createdPackageId
}) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleBack = (e) => {
    e.preventDefault();
    setForm("Crew");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const policyClone = formData.policy;
    const updatedPolicy = {
      ...policyClone,
      cancellation_policy: policyClone.cancellation_policy.map((policy) =>
        filterEmptyKeys(policy)
      )
    };

    const payLoad = {
      step_id: 3,
      trip_package_id: Number(id) || Number(createdPackageId),
      policy: updatedPolicy
    };
    try {
      const response = await axiosInstance.post(
        "/api/v1/trip/create_trip_package",
        payLoad
      );
      if (response.status === 200 || response.status === 201) {
        toast.success(
          "Trip Package Policy & Cancellation Policy Saved Successfully"
        );
        queryClient.invalidateQueries(["trip-packages"]);
        queryClient.invalidateQueries(["trip-package", id || createdPackageId]);
        navigate("/dashboard/trip-packages");
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
          <h6 className="form_title">Renting Policy & Cancellation Policy</h6>
        </div>
        <div className="col-12 p-2">
          <div className="input-field">
            <label>Weather Restriction</label>
            <CKEditor
              editor={ClassicEditor}
              data={formData.policy.weather_restrictions}
              onChange={(event, editor) => {
                const data = editor.getData();
                setFormData((prev) => ({
                  ...prev,
                  policy: {
                    ...prev.policy,
                    weather_restrictions: data
                  }
                }));
              }}
            />
          </div>
        </div>
        <div className="col-12 p-2">
          <div className="input-field">
            <label>Rules and instructions</label>
            <CKEditor
              editor={ClassicEditor}
              data={formData.policy.rules_and_instructions}
              onChange={(event, editor) => {
                const data = editor.getData();
                setFormData((prev) => ({
                  ...prev,
                  policy: {
                    ...prev.policy,
                    rules_and_instructions: data
                  }
                }));
              }}
            />
          </div>
        </div>
        <div className="col-12 p-2">
          <div className="input-field">
            <label>Allowed and not allowed items on board</label>
            <CKEditor
              editor={ClassicEditor}
              data={formData.policy.allowed_and_not_allowed_items}
              onChange={(event, editor) => {
                const data = editor.getData();
                setFormData((prev) => ({
                  ...prev,
                  policy: {
                    ...prev.policy,
                    allowed_and_not_allowed_items: data
                  }
                }));
              }}
            />
          </div>
        </div>
        <CancellationPolicy formData={formData} setFormData={setFormData} />
        <div className="col-12 p-2 pt-4 d-flex gap-3 ">
          <button className="next_btn" onClick={handleBack}>
            Back
          </button>
          <SubmitButton
            className="save_btn ms-auto"
            loading={loading}
            name="Save"
          />
        </div>
      </div>
    </form>
  );
};

export default PolicyForm;
