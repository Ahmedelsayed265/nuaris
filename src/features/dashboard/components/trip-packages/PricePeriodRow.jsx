import deleteIcon from "../../../../assets/images/icons/delete.svg";
import addIcon from "../../../../assets/images/icons/addRow.svg";
import InputField from "./../../../../ui/form-elements/InputField";
import useGetPeriodTypes from "./../../../../hooks/useGetPeriodTypes";
import CustomTimePicker from "../../../../ui/working-hours/CustomTimePicker";
import dayjs from "dayjs";

const PricePeriodRow = ({
  index,
  currentObject,
  setFormData,
  formData,
  day,
  dayIndex
}) => {
  const { data: durations } = useGetPeriodTypes(5);

  const handleAddRow = () => {
    const updatedTripPackageDays = [...formData.trip_package_days];
    updatedTripPackageDays[dayIndex] = {
      ...updatedTripPackageDays[dayIndex],
      periods: [
        ...updatedTripPackageDays[dayIndex].periods,
        {
          start_time: "",
          end_time: "",
          price: "",
          price_type: ""
        }
      ]
    };
    setFormData({ ...formData, trip_package_days: updatedTripPackageDays });
  };

  const handleDeleteRow = () => {
    const updatedTripPackageDays = [...formData.trip_package_days];
    updatedTripPackageDays[dayIndex] = {
      ...updatedTripPackageDays[dayIndex],
      periods: updatedTripPackageDays[dayIndex].periods.filter(
        (_, idx) => idx !== index
      )
    };
    setFormData({ ...formData, trip_package_days: updatedTripPackageDays });
  };

  const handleChange = (value, key, periodIndex) => {
    const updatedTripPackageDays = formData.trip_package_days.map((day, i) => {
      if (i === dayIndex) {
        return {
          ...day,
          periods: day.periods.map((period, j) => {
            if (j === periodIndex) {
              return {
                ...period,
                [key]: value
              };
            }
            return period;
          })
        };
      }
      return day;
    });

    setFormData({ ...formData, trip_package_days: updatedTripPackageDays });
  };

  const calculateDisabledTimes = (hours, currentIndex) => {
    let disabledTimes = [];
    hours.forEach((time, i) => {
      if (i !== currentIndex) {
        let start = dayjs(time.start_time, "HH:mm");
        let end = dayjs(time.end_time, "HH:mm");
        let range = [];
        let curr = start;
        while (curr.isBefore(end) || curr.isSame(end)) {
          range.push(curr.format("HH:mm"));
          curr = curr.add(5, "minute");
        }
        disabledTimes = [...disabledTimes, ...range];
      }
    });
    return disabledTimes;
  };

  const disabledFromTimes = calculateDisabledTimes(
    currentObject.periods,
    index,
    "start_time"
  );

  const disabledToTimes = calculateDisabledTimes(
    currentObject.periods,
    index,
    "end_time"
  );

  const handleTimeChange = (value, key, index, currentObject, day) => {
    const updatedHours = [...currentObject.periods];
    updatedHours[index][key] = value;
    const updatedObject = { ...currentObject, periods: updatedHours };
    setFormData((prev) => {
      const currentIndex = prev.trip_package_days.findIndex(
        (obj) => obj.day === day
      );
      const newFormData = [...prev.trip_package_days];
      newFormData[currentIndex] = updatedObject;
      return {
        ...prev,
        trip_package_days: newFormData
      };
    });
  };

  return (
    <div className="price_period_row">
      <div className="row m-0">
        <div className="col-12 p-2">
          <div className="title">
            <h6>Package Time & Price</h6>
            {index === 0 ? (
              <button
                type="button"
                disabled={currentObject.periods.length >= 3}
                onClick={handleAddRow}
              >
                <img src={addIcon} alt="add icon" />
              </button>
            ) : (
              <button type="button" onClick={handleDeleteRow}>
                <img src={deleteIcon} alt="delete icon" />
              </button>
            )}
          </div>
        </div>
        <div className="col-lg-6 col-12 p-2">
          <div className="input-field">
            <label htmlFor="start_item">Start Time</label>
            <CustomTimePicker
              value={currentObject.periods[index].start_time}
              onChange={(value) =>
                handleTimeChange(value, "start_time", index, currentObject, day)
              }
              disabledTimes={disabledFromTimes}
            />
          </div>
        </div>
        <div className="col-lg-6 col-12 p-2">
          <div className="input-field">
            <label htmlFor="end_item">End Time</label>
            <CustomTimePicker
              value={currentObject.periods[index].end_time}
              onChange={(value) =>
                handleTimeChange(value, "end_time", index, currentObject, day)
              }
              disabledTimes={disabledToTimes}
            />
          </div>
        </div>
        <div className="col-12 p-2">
          <div className="d-flex gap-2 align-items-end">
            <InputField
              label="Price"
              type="number"
              id="price"
              name="price"
              value={
                formData.trip_package_days[dayIndex]?.periods[index]?.price ||
                ""
              }
              placeholder="00"
              min="0"
              onChange={(e) => handleChange(e.target.value, "price", index)}
            />
            <div className="input-field w-25">
              <select
                name="period_id"
                id="period_id"
                value={
                  formData.trip_package_days[dayIndex]?.periods[index]
                    ?.period_id || ""
                }
                onChange={(e) =>
                  handleChange(e.target.value, "period_id", index)
                }
              >
                <option value="">select</option>
                {durations?.map((duration) => (
                  <option value={duration.id} key={duration.id}>
                    {duration.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricePeriodRow;
