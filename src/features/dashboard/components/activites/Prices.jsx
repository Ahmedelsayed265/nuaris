import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { MIN_PERIOD_TYPES } from "../../../../utils/constants";
import calenderIcon from "../../../../assets/images/icons/calender.svg";
import addIcon from "../../../../assets/images/icons/add.svg";
import InputField from "../../../../ui/form-elements/InputField";
import GeneralPriceCard from "./../../../../ui/GeneralPriceCard";
import SeasonCard from "./../../../../ui/SeasonCard";
import SubmitButton from "./../../../../ui/form-elements/SubmitButton";
import axiosInstance from "../../../../utils/axiosInstance";
import useGetPeriodTypes from "../../../../hooks/useGetPeriodTypes";
import useGetActivities from "../../../../hooks/useGetActivities";

const Prices = ({
  id,
  createdActivityId,
  formData,
  setFormData,
  setForm,
  isValid,
  setIsValid,
  initialPricesData,
  seasonCardInitialData
}) => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const { data: durations } = useGetPeriodTypes(2, true);
  const [filteredDurations, setFilteredDurations] = useState([]);
  const { refetch } = useGetActivities();

  const [type, setType] = useState(formData?.min__type || 1);

  useEffect(() => {
    formData?.min__type && setType(formData?.min__type);
  }, [formData?.min__type]);

  useEffect(() => {
    const updatedDurations = durations?.filter((t) => {
      return t?.type === Number(type);
    });

    setFilteredDurations(updatedDurations);
  }, [durations, type]);

  const handleNext = (e) => {
    e.preventDefault();
    if (isValid) {
      setForm("Policy");
    }
  };

  const handleBack = (e) => {
    e.preventDefault();
    setForm("Working hours");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      step_id: 4,
      activity_id: id || createdActivityId,
      advance_payment_percentage: formData?.advance_payment_percentage,
      minimum_rental_period: formData?.minimum_rental_period,
      minimum_rental_period_type: formData?.minimum_rental_period_type,
      prices: formData?.prices,
      season_prices: formData?.season_prices
    };
    try {
      const response = await axiosInstance.post(
        "/api/v1/activity/add_activity_pricing",
        payload
      );
      if (response.status === 200 || response.status === 201) {
        toast.success("Activity Prices Info Saved Successfully");
        refetch();
        queryClient.invalidateQueries(["activity", id || createdActivityId]);
        setForm("Policy");
        setIsValid(true);
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
          <h6 className="form_title">Prices</h6>
        </div>

        {/* Prepayment percentage */}
        <div className="col-lg-6 col-12 p-2">
          <InputField
            hint={"( Minimum 50% )"}
            label={"Advanced Payment percentage"}
            name="prepaymentPercentage"
            type="number"
            placeholder="00"
            min="50"
            max="100"
            value={formData?.advance_payment_percentage}
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                advance_payment_percentage: e.target.value
              }));
            }}
          />
        </div>

        <div className="col-lg-6 col-12 p-2">
          <div className="input-field">
            <label htmlFor="period">Minimum rental Period</label>
            <div className="time-units">
              <select
                className="units w-100"
                name="minits"
                id="minits"
                value={formData?.minimum_rental_period}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    minimum_rental_period: e.target.value
                  }))
                }
              >
                <option value="">Select</option>
                {filteredDurations?.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.display_duration}
                  </option>
                ))}
              </select>
              <select
                className="units"
                name="period_type"
                id="units"
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                  setFormData({
                    ...formData,
                    minimum_rental_period: ""
                  });
                }}
              >
                {MIN_PERIOD_TYPES.map((unit, index) => (
                  <option key={index} value={unit.id}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="col-12 p-2 d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-2 addSeason">
            <h6 className="m-0">General Price</h6>
          </div>
          <button
            onClick={() => {
              setFormData((prev) => {
                return {
                  ...prev,
                  prices: [...prev.prices, initialPricesData]
                };
              });
            }}
            type="button"
          >
            <img src={addIcon} alt="addIcon" />
          </button>
        </div>

        {formData?.prices?.map((e, index) => {
          return (
            <GeneralPriceCard
              key={index}
              formData={formData}
              setFormData={setFormData}
              feature={2}
              index={index}
            />
          );
        })}

        {/* calender seasons title */}
        <div className="col-12 p-2 d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-2 addSeason">
            <img src={calenderIcon} alt="calender" />
            <h6 className="m-0">Season Price</h6>
          </div>
          <button
            onClick={() => {
              setFormData((prev) => {
                return {
                  ...prev,
                  season_prices: [...prev.season_prices, seasonCardInitialData]
                };
              });
            }}
            type="button"
          >
            <img src={addIcon} alt="addIcon" />
          </button>
        </div>
        {/* calender seasons cards */}
        {formData?.season_prices?.map((_, rowIndex) => (
          <SeasonCard
            key={rowIndex}
            index={rowIndex}
            formData={formData}
            feature={2}
            setFormData={setFormData}
          />
        ))}
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

export default Prices;
