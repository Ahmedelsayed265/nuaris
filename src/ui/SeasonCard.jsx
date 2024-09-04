import { Calendar, DateObject } from "react-multi-date-picker";
import { useEffect, useState } from "react";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import InputField from "./form-elements/InputField";
import deleteIcon from "../assets/images/icons/delete.svg";
import useGetPeriodTypes from "../hooks/useGetPeriodTypes";
import { MIN_PERIOD_TYPES, PERIOD_TYPES } from "../utils/constants";

const SeasonCard = ({
  formData,
  setFormData,
  index,
  feature,
  minDurations
}) => {
  const currentCard = formData?.season_prices[index];
  const { data: durations } = useGetPeriodTypes(feature);
  const [type, setType] = useState(1);
  const [initialDates, setInitialDates] = useState([]);
  const [filteredDurations, setFilteredDurations] = useState([]);

  const [minType, setMinType] = useState(1);
  const [minFilteredDurations, setMinFilteredDurations] = useState([]);

  useEffect(() => {
    if (currentCard?.dates) {
      setInitialDates(
        currentCard.dates.map((e) => [
          new DateObject().set({
            year: Number(e?.start_date?.split("-")[0]),
            month: Number(e?.start_date?.split("-")[1]),
            day: Number(e?.start_date?.split("-")[2])
          }),
          new DateObject().set({
            year: Number(e?.end_date?.split("-")[0]),
            month: Number(e?.end_date?.split("-")[1]),
            day: Number(e?.end_date?.split("-")[2])
          })
        ])
      );
    }
  }, [currentCard]);

  function handleDeleteSeasonCard() {
    setFormData((prev) => {
      const season_prices = [...prev.season_prices];
      season_prices.splice(index, 1);
      return {
        ...prev,
        season_prices
      };
    });
  }

  function handleChangeSeasonPrice(e, i) {
    setFormData((prev) => {
      const season_prices = [...prev.season_prices];
      season_prices[i][e.target.name] = e.target.value;
      return {
        ...prev,
        season_prices
      };
    });
  }

  useEffect(() => {
    const updatedDurations = durations?.filter((t) => {
      return t?.type === Number(type);
    });

    setFilteredDurations(updatedDurations);
  }, [durations, type]);

  useEffect(() => {
    const updatedDurations = minDurations?.filter((t) => {
      return t?.type === Number(minType);
    });

    setMinFilteredDurations(updatedDurations);
  }, [minDurations, minType]);

  const leastDuration = filteredDurations?.reduce((min, current) => {
    return current?.duration < min?.duration ? current : min;
  }, filteredDurations[0]);

  return (
    <div className="col-12 p-2">
      <div className="season_calender_card">
        <div className="row m-0">
          <div className="col-lg-6 col-12 p-2">
            <InputField
              hint={"( Minimum 50% )"}
              label={"Advanced Payment percentage"}
              name="advance_payment_percentage"
              type="number"
              placeholder="00"
              min="50"
              max="100"
              value={currentCard.advance_payment_percentage}
              onChange={(e) => handleChangeSeasonPrice(e, index)}
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
                  {minFilteredDurations?.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.display_duration}
                    </option>
                  ))}
                </select>

                <select
                  className="units"
                  name="period_type"
                  id="units"
                  value={minType}
                  onChange={(e) => {
                    setMinType(e.target.value);
                    setFormData((prev) => {
                      const season_prices = [...prev.season_prices];
                      season_prices[index].minimum_rental_period = "";
                      return {
                        ...prev,
                        season_prices
                      };
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

          <div className="d-flex gap-3 p-2">
            <div className="p-0 h-100 d-flex align-items-end">
              <Calendar
                value={initialDates}
                onChange={(dates) => {
                  console.log(dates);
                  const updatedSeasonPrices = [...formData.season_prices];
                  updatedSeasonPrices[index].dates = dates.map((dateRange) => {
                    if (dateRange[0] && dateRange[1]) {
                      return {
                        start_date: dateRange[0].format("YYYY-MM-DD"),
                        end_date: dateRange[1].format("YYYY-MM-DD")
                      };
                    }
                    return null;
                  });
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    season_prices: updatedSeasonPrices
                  }));
                }}
                multiple
                range
                plugins={[<DatePanel key="date-panel" />]}
              />
            </div>
            <div className="row m-0">
              {/* Minimum rental period */}
              <div className="col-12 p-2 pe-0 ps-0">
                <div className="input-field">
                  <label htmlFor="period">Booking Time</label>
                  <div className="time-units">
                    <select
                      className="units w-100"
                      name="period_id"
                      id="period_id"
                      value={formData?.season_prices[index].period_id}
                      onChange={(e) => handleChangeSeasonPrice(e, index)}
                    >
                      <option value="" disabled>
                        Select
                      </option>
                      {filteredDurations?.map((d) => (
                        <option key={d?.id} value={d?.id}>
                          {d?.display_duration}
                        </option>
                      ))}
                    </select>

                    <select
                      className="units"
                      name="min_period_type"
                      id="min_period_type"
                      value={type}
                      onChange={(e) => {
                        setType(e.target.value);
                        setFormData((prev) => {
                          const season_prices = [...prev.season_prices];
                          season_prices[index].period_id = "";
                          return {
                            ...prev,
                            season_prices
                          };
                        });
                      }}
                    >
                      {PERIOD_TYPES.map((unit) => (
                        <option key={unit.id} value={unit.id}>
                          {unit.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="col-12 p-2 pe-0 ps-0">
                <InputField
                  name={"price"}
                  onChange={(e) => handleChangeSeasonPrice(e, index)}
                  value={currentCard.price}
                  label={"Price"}
                  placeholder="00"
                />
              </div>
              {/* Extra Hour price */}
              <div className="col-lg-6 col-12 p-2 pe-lg-2 ps-0 pb-0">
                <InputField
                  name="extra_hour_price"
                  label={`Extra ${
                    formData?.season_prices[index]?.period_id
                      ? leastDuration?.name
                      : ""
                  } Price`}
                  placeholder="00"
                  type="number"
                  value={currentCard.extra_hour_price}
                  onChange={(e) => handleChangeSeasonPrice(e, index)}
                />
              </div>
              {/* Extra Hour price */}
              <div className="col-lg-6 col-12 p-2 pe-0 ps-0 pb-0">
                <InputField
                  name="minimum_price"
                  label={"Minimum Price"}
                  placeholder="00"
                  type="number"
                  value={currentCard.minimum_price}
                  onChange={(e) => handleChangeSeasonPrice(e, index)}
                />
              </div>
            </div>
          </div>
        </div>
        <button
          disabled={formData?.season_prices.length === 1}
          style={{
            opacity: formData?.season_prices.length === 1 ? "0.5" : "1"
          }}
          type="button"
          className="delete_btn"
          onClick={handleDeleteSeasonCard}
        >
          <img src={deleteIcon} alt="deleteIcon" />
        </button>
      </div>
    </div>
  );
};

export default SeasonCard;
