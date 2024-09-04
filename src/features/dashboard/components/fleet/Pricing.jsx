import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { handleChange } from "../../../../utils/helper";
import { MIN_PERIOD_TYPES } from "../../../../utils/constants";
import calenderIcon from "../../../../assets/images/icons/calender.svg";
import addIcon from "../../../../assets/images/icons/add.svg";
import Vat from "./../../../../ui/Vat";
import InputField from "../../../../ui/form-elements/InputField";
import SubmitButton from "../../../../ui/form-elements/SubmitButton";
import GeneralPriceCard from "../../../../ui/GeneralPriceCard";
import SeasonCard from "../../../../ui/SeasonCard";
import axiosInstance from "../../../../utils/axiosInstance";
import UponRequestPrice from "./UponRequestPrice";
import useGetPeriodTypes from "../../../../hooks/useGetPeriodTypes";

const Pricing = ({
  id,
  formData,
  setFormData,
  createdYachtId,
  initialPricesData,
  seasonCardInitialData
}) => {
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState(formData?.min__type || 1);

  useEffect(() => {
    formData?.min__type && setType(formData?.min__type);
  }, [formData?.min__type]);

  const [filteredDurations, setFilteredDurations] = useState([]);

  const navigate = useNavigate();
  const { data: durations } = useGetPeriodTypes(1, true);

  useEffect(() => {
    const updatedDurations = durations?.filter((t) => {
      return t?.type === Number(type);
    });

    setFilteredDurations(updatedDurations);
  }, [durations, type]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payLoad = {
      yacht_id: id || createdYachtId,
      price_upon_request: formData.price_upon_request,
      advance_payment_percentage: formData.advance_payment_percentage,
      minimum_rental_period: formData.minimum_rental_period,
      minimum_rental_period_type: formData.minimum_rental_period_type,
      prices: formData.prices,
      season_prices: formData.season_prices
    };

    if (formData.vat_id) {
      payLoad.vat_id = formData.vat_id;
    }

    const payLoadUpoun = {
      yacht_id: id || createdYachtId,
      price_upon_request: formData.price_upon_request,
      advance_payment_percentage: formData.advance_payment_percentage,
      minimum_rental_period: formData.minimum_rental_period,
      minimum_rental_period_type: formData.minimum_rental_period_type,
      prices: [
        {
          price: formData.prices[0].price,
          period_id: formData.prices[0].period_id
        }
      ]
    };

    try {
      const response = await axiosInstance.post(
        "/api/v1/yacht/add_fleet_pricing",
        formData.price_upon_request ? payLoadUpoun : payLoad
      );
      if (response.status === 200 || response.status === 201) {
        toast.success("Working Hours Saved Successfully");
        navigate(
          id
            ? `/dashboard/fleet/edit-yacht/${id}/addons-connected`
            : "/dashboard/fleet/add-yacht/addons-connected"
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fleet_form__wrapper">
      <div className="bg_white_card">
        <form className="form_ui" onSubmit={handleSubmit}>
          <div className="row m-0">
            <div className="col-12 p-2">
              <h6 className="form_title">Pricing</h6>
            </div>

            <div className="col-12 p-2">
              <div className="uponRequest">
                <Form.Check
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      price_upon_request: !formData.price_upon_request
                    }))
                  }
                  type="switch"
                  label="Upon request"
                />
              </div>
            </div>

            <div className="col-lg-6 col-12 p-2">
              <InputField
                hint={"( Minimum 50% )"}
                label={"Advanced Payment percentage"}
                name="advance_payment_percentage"
                id="advance_payment_percentage"
                type="number"
                min={50}
                max={100}
                placeholder="00"
                value={formData?.advance_payment_percentage}
                onChange={(e) => handleChange(e, setFormData)}
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

            {/* Pricing Upon Request */}
            {formData.price_upon_request && (
              <UponRequestPrice formData={formData} setFormData={setFormData} />
            )}

            {/* Normal Pricing */}
            {!formData.price_upon_request && (
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
            )}

            {!formData.price_upon_request && (
              <>
                {formData?.prices?.map((e, index) => {
                  return (
                    <GeneralPriceCard
                      key={index}
                      formData={formData}
                      setFormData={setFormData}
                      index={index}
                      feature={1}
                      hasDeleteBtn={!formData.price_upon_request ? true : false}
                    />
                  );
                })}
              </>
            )}

            {!formData.price_upon_request && (
              <>
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
                          season_prices: [
                            ...prev.season_prices,
                            seasonCardInitialData
                          ]
                        };
                      });
                    }}
                    type="button"
                  >
                    <img src={addIcon} alt="addIcon" />
                  </button>
                </div>
                {formData?.season_prices?.map((_, rowIndex) => (
                  <SeasonCard
                    key={rowIndex}
                    index={rowIndex}
                    feature={1}
                    formData={formData}
                    minDurations={durations}
                    setFormData={setFormData}
                  />
                ))}
                <div className="col-12 p-2">
                  <Vat />
                </div>
              </>
            )}

            <div className="col-12 p-2 pt-4 d-flex">
              <SubmitButton
                name={"save"}
                loading={loading}
                className="save_btn ms-auto"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Pricing;
