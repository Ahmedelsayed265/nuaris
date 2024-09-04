import { useEffect, useState } from "react";
import { PERIOD_TYPES } from "../../utils/constants";
import useGetPeriodTypes from "../../hooks/useGetPeriodTypes";

function PeriodField({ label, value, handlePeriodChange, filter }) {
  const [type, setType] = useState(1);
  const { data: durations } = useGetPeriodTypes(filter);
  const [filteredDurations, setFilteredDurations] = useState([]);

  useEffect(() => {
    const updatedDurations = durations?.filter((t) => {
      return t?.type === Number(type);
    });

    setFilteredDurations(updatedDurations);
  }, [durations, type]);

  return (
    <div className="input-field">
      <label htmlFor="period_id">{label}</label>
      <div className="time-units">
        <select
          className="units w-100"
          name="period_id"
          id="period_id"
          value={value}
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
          onChange={(e) => setType(e.target.value)}
        >
          {PERIOD_TYPES.map((unit) => (
            <option key={unit.id} value={unit.id}>
              {unit.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default PeriodField;
