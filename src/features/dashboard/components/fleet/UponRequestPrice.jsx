import { useEffect, useState } from "react";
import { PERIOD_TYPES } from "../../../../utils/constants";
import InputField from "../../../../ui/form-elements/InputField";
import useGetPeriodTypes from "../../../../hooks/useGetPeriodTypes";

export default function UponRequestPrice({ formData, setFormData }) {
  const { data: durations } = useGetPeriodTypes(1);
  const [type, setType] = useState(1);
  const [filteredDurations, setFilteredDurations] = useState([]);

  useEffect(() => {
    const updatedDurations = durations?.filter((t) => {
      return t?.type === Number(type);
    });

    setFilteredDurations(updatedDurations);
  }, [durations, type]);

  const handlePeriodChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      prices: [
        {
          ...prev.prices[0],
          period_id: value
        }
      ]
    }));
  };

  const handlePriceChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      prices: [
        {
          ...prev.prices[0],
          price: value
        }
      ]
    }));
  };

  return (
    <div className="col-12 p-2">
      <div className="price_card p-2">
        <div className="row m-0 w-100">
          <div className="col-lg-6 col-12 p-2">
            <div className="input-field">
              <label htmlFor="period">Booking Time</label>
              <div className="time-units">
                <select
                  className="units w-100"
                  name="period_id"
                  id="period_id"
                  value={formData?.prices[0]?.period_id || ""}
                  onChange={handlePeriodChange}
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
                  onChange={(e) => setType(Number(e.target.value))}
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
              name="price_upon_request_price"
              id="price_upon_request_price"
              type="number"
              placeholder="00"
              value={formData?.prices[0]?.price || ""}
              onChange={handlePriceChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
