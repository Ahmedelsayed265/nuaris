import add from "../../../assets/images/icons/add.svg";
import trashIcon from "../../../assets/images/icons/delete.svg";
import InputField from "./../../../ui/form-elements/InputField";

const CancellationPolicy = ({ formData, setFormData }) => {
  const handleAddPolicy = () => {
    const lastPolicy =
      formData.policy.cancellation_policy[
        formData.policy.cancellation_policy.length - 1
      ];

    if (lastPolicy.cancel_before && lastPolicy.percentage && lastPolicy.type) {
      setFormData((prev) => ({
        ...prev,
        policy: {
          ...prev.policy,
          cancellation_policy: [
            ...prev.policy.cancellation_policy,
            {
              percentage: "",
              type: lastPolicy.type_end || lastPolicy.type,
              cancel_before:
                lastPolicy.cancel_before_end || lastPolicy.cancel_before,
              cancel_before_end: ""
            }
          ]
        }
      }));
    }
  };

  const handlePolicyChange = (index, field, value) => {
    const updatedPolicies = [...formData.policy.cancellation_policy];
    updatedPolicies[index][field] = value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      policy: {
        ...prevFormData.policy,
        cancellation_policy: updatedPolicies
      }
    }));
  };

  const handleRemovePolicy = (index) => {
    const updatedPolicies = formData.policy.cancellation_policy.filter(
      (_, idx) => idx !== index
    );
    setFormData((prevFormData) => ({
      ...prevFormData,
      policy: {
        ...prevFormData.policy,
        cancellation_policy: updatedPolicies
      }
    }));
  };

  return (
    <div className="col-12 p-2">
      <div className="input-field policy_form">
        <div className="header">
          <label>Cancellation Policy</label>
          <button
            type="button"
            onClick={handleAddPolicy}
            disabled={
              !formData.policy.cancellation_policy?.length ||
              !formData.policy.cancellation_policy[
                formData.policy.cancellation_policy.length - 1
              ].cancel_before ||
              formData.policy.cancellation_policy?.length >= 5
            }
          >
            <img src={add} alt="add" />
          </button>
        </div>
        {formData.policy.cancellation_policy?.map((policy, index) => (
          <div key={index} className="col-12 p-0 pt-2 pb-2 policy_cancel">
            <div className="policyRow">
              <div className="input-field">
                <label htmlFor={`cancel_before_${index}`}>
                  {index === 0 ? "If cancel less than" : "If cancel between"}
                </label>
                <div className="time-units">
                  <input
                    type="number"
                    min="0"
                    placeholder="00"
                    name={`cancel_before_${index}`}
                    id={`cancel_before_${index}`}
                    value={policy.cancel_before}
                    disabled={index > 0}
                    onChange={(e) =>
                      handlePolicyChange(
                        index,
                        "cancel_before",
                        +e.target.value
                      )
                    }
                  />
                  <select
                    className="units"
                    name={`units_${index}`}
                    id={`units_${index}`}
                    value={policy.type}
                    disabled={index > 0}
                    onChange={(e) =>
                      handlePolicyChange(index, "type", e.target.value)
                    }
                  >
                    {["minutes", "hours", "days", "weeks", "months"].map(
                      (unit, idx) => (
                        <option key={idx} value={unit}>
                          {unit}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>
              {index > 0 && (
                <div className="input-field">
                  <label htmlFor={`cancel_before_end_${index}`}>And</label>
                  <div className="time-units">
                    <input
                      type="number"
                      placeholder="00"
                      name={`cancel_before_end_${index}`}
                      id={`cancel_before_end_${index}`}
                      value={policy.cancel_before_end}
                      onChange={(e) =>
                        handlePolicyChange(
                          index,
                          "cancel_before_end",
                          +e.target.value
                        )
                      }
                    />
                    <select
                      className="units"
                      name={`units_end_${index}`}
                      id={`units_end_${index}`}
                      value={policy.type_end}
                      onChange={(e) =>
                        handlePolicyChange(index, "type_end", e.target.value)
                      }
                    >
                      {["minutes", "hours", "days", "weeks", "months"].map(
                        (unit, idx) => (
                          <option key={idx} value={unit}>
                            {unit}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                </div>
              )}
              <div>
                <label htmlFor={`firstDaysRefund_${index}`}>Refund is</label>
                <InputField
                  type="number"
                  id={`firstDaysRefund_${index}`}
                  name="firstDaysRefund"
                  placeholder="00"
                  value={policy.percentage}
                  onChange={(e) =>
                    handlePolicyChange(
                      index,
                      "percentage",
                      Number(e.target.value)
                    )
                  }
                />
                <span>%</span>
              </div>
            </div>
            <button
              className="trash_btn"
              type="button"
              disabled={formData.policy.cancellation_policy?.length <= 1}
              onClick={() => handleRemovePolicy(index)}
            >
              <img src={trashIcon} alt="trash" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CancellationPolicy;
