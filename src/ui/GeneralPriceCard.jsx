import { useEffect, useState } from "react";
import { PERIOD_TYPES } from "../utils/constants";
import { useSelector } from "react-redux";
import deleteIcon from "../assets/images/icons/delete.svg";
import InputField from "./form-elements/InputField";
import useGetPeriodTypes from "./../hooks/useGetPeriodTypes";

const GeneralPriceCard = ({
  formData,
  setFormData,
  index,
  feature,
  hasDeleteBtn = true
}) => {
  const currency = useSelector((state) => state.user?.user?.currency);
  const { data: durations } = useGetPeriodTypes(feature);
  const [type, setType] = useState(1);
  const [filteredDurations, setFilteredDurations] = useState([]);

  function handleChangePrice(e, i) {
    setFormData((prev) => {
      const prices = [...prev.prices];
      prices[i][e.target.name] = e.target.value;
      return {
        ...prev,
        prices
      };
    });
  }

  function handleDeletePriceCard(i) {
    setFormData((prev) => {
      const prices = [...prev.prices];
      prices.splice(i, 1);
      return {
        ...prev,
        prices
      };
    });
  }

  useEffect(() => {
    const updatedDurations = durations?.filter((t) => {
      return t?.type === Number(type);
    });

    setFilteredDurations(updatedDurations);
  }, [durations, type]);

  const leastDuration = filteredDurations?.reduce((min, current) => {
    return current?.duration < min?.duration ? current : min;
  }, filteredDurations[0]);

  return (
    <div key={index} className="col-12 p-2">
      <div className="price_card p-2">
        <div className="row m-0 w-100">
          {/* Minimum Booking Time */}

          <div className="col-lg-6 col-12 p-2">
            <div className="input-field">
              <label htmlFor="period">Booking Time</label>
              <div className="time-units">
                <select
                  className="units w-100"
                  name="period_id"
                  id="period_id"
                  value={formData?.prices[index].period_id}
                  onChange={(e) => handleChangePrice(e, index)}
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
                  name="period_type"
                  id="period_type"
                  value={type}
                  onChange={(e) => {
                    setType(e.target.value);
                    setFormData((prev) => {
                      const prices = [...prev.prices];
                      prices[index].period_id = "";
                      return {
                        ...prev,
                        prices
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
          <div className="col-lg-6 col-12 p-2">
            <InputField
              label="Price"
              name="price"
              hint={`( ${currency} )`}
              type="number"
              placeholder="00"
              value={formData?.prices[index].price}
              onChange={(e) => handleChangePrice(e, index)}
            />
          </div>
          {/* Extra Hour price */}
          <div className="col-lg-6 col-12 p-2">
            <InputField
              label={`Extra ${
                formData?.prices[index].period_id ? leastDuration?.name : ""
              } price`}
              name="extra_hour_price"
              hint={`( ${currency} )`}
              type="number"
              placeholder="00"
              value={formData?.prices[index].extra_hour_price}
              onChange={(e) => handleChangePrice(e, index)}
            />
          </div>
          {/* Min Price */}
          <div className="col-lg-6 col-12 p-2">
            <InputField
              hint={`( ${currency} )`}
              label={"Minimum Price"}
              name="minimum_price"
              type="number"
              placeholder="00"
              value={formData?.prices[index].minimum_price}
              onChange={(e) => handleChangePrice(e, index)}
            />
          </div>
        </div>
        {hasDeleteBtn && (
          <button
            disabled={formData?.prices.length === 1}
            style={{
              opacity: formData?.prices.length === 1 ? "0.5" : "1"
            }}
            type="button"
            className="delete_btn"
            onClick={() => handleDeletePriceCard(index)}
          >
            <img src={deleteIcon} alt="deleteIcon" />
          </button>
        )}
      </div>
      <button
        onClick={() => {
          setFormData((prev) => {
            const prices = [...prev.prices];
            prices.splice(index, 1);
            return {
              ...prev,
              prices
            };
          });
        }}
        className="price_trash_icon"
        type="button"
      >
        <img src={deleteIcon} alt="delete" />
      </button>
    </div>
  );
};

export default GeneralPriceCard;
