import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "./../../../../utils/axiosInstance";
import SubmitButton from "./../../../../ui/form-elements/SubmitButton";
import { useQueryClient } from "@tanstack/react-query";

const VesselStatusForm = ({ yacht, id }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const queryClient = useQueryClient();

  useEffect(() => {
    if (yacht) {
      setFormData({
        state: yacht?.state || "Inactive",
        inactivity_time_from: yacht?.inactivity_time_from,
        inactivity_time_to: yacht?.inactivity_time_to
      });
    }
  }, [yacht]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!id && !yacht?.id) {
      toast.error("create a yacht first");
      setLoading(false);
      return;
    }
    try {
      const payload = {
        yacht_id: id || yacht?.id,
        state: formData.state
      };
      if (formData.inactivity_time_from) {
        payload.inactivity_time_from = formData.inactivity_time_from;
      }
      if (formData.inactivity_time_to) {
        payload.inactivity_time_to = formData.inactivity_time_to;
      }
      const response = await axiosInstance.post(
        "/api/v1/yacht/change_fleet_state",
        payload
      );
      if (response.status === 200 || response.status === 201) {
        toast.success("Vessel state Updated Successfully");
        queryClient.invalidateQueries(["yacht"]);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fleet_side_bar vessel_status mt-3 gap-0">
      <h6 className="mb-3">Vessel Statues </h6>
      <form action="" className="form_ui" onSubmit={handleSubmit}>
        <div className="input-field mb-3">
          <div className="checkboxs_inputs">
            <span className={`bg-active ${formData.state}`}></span>
            <label htmlFor="Active">
              <input
                type="radio"
                name="state"
                id="Active"
                checked={formData.state === "Active"}
                onChange={() => {
                  setFormData({
                    ...formData,
                    state: "Active"
                  });
                }}
              />
              <span>Active</span>
            </label>
            <label htmlFor="Inactive">
              <input
                type="radio"
                name="state"
                id="Inactive"
                checked={formData.state === "Inactive"}
                onChange={() => {
                  setFormData({
                    ...formData,
                    state: "Inactive",
                    inactivity_time_from: undefined,
                    inactivity_time_to: undefined
                  });
                }}
              />
              <span>Inactive</span>
            </label>
            <label htmlFor="Hidden">
              <input
                type="radio"
                name="state"
                id="Hidden"
                checked={formData.state === "Hidden"}
                onChange={() => {
                  setFormData({
                    ...formData,
                    state: "Hidden",
                    inactivity_time_from: undefined,
                    inactivity_time_to: undefined
                  });
                }}
              />
              <span>Hidden</span>
            </label>
          </div>
        </div>
        {formData.state === "Inactive" && (
          <div className="period">
            <div className="input-field mb-2">
              <div className="input-field">
                <label htmlFor="From">From</label>
                <input
                  placeholder="24/12/2024"
                  type="date"
                  id="from"
                  name="from"
                  required
                  value={formData?.inactivity_time_from}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      inactivity_time_from: e.target.value
                    });
                  }}
                />
              </div>
            </div>
            <div className="input-field mb-3">
              <div className="input-field">
                <label htmlFor="To">To</label>
                <input
                  placeholder="24/12/2024"
                  type="date"
                  id="to"
                  name="to"
                  required
                  value={formData?.inactivity_time_to}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      inactivity_time_to: e.target.value
                    });
                  }}
                />
              </div>
            </div>
          </div>
        )}
        <SubmitButton name="Confirm" loading={loading} />
      </form>
    </div>
  );
};

export default VesselStatusForm;
