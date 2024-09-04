import dayjs from "dayjs";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const CustomTimePicker = ({ value, onChange, disabledTimes = [] }) => {
  const handleChange = (newValue) => {
    if (newValue) {
      onChange(newValue.format("HH:mm"));
    } else {
      onChange("");
    }
  };

  const shouldDisableTime = (timeValue) => {
    const timeStr = timeValue.format("HH:mm");
    return disabledTimes.includes(timeStr);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopTimePicker
        value={value ? dayjs(value, "HH:mm") : null}
        onChange={handleChange}
        minutesStep={5}
        ampm={false}  // Set to false to use 24-hour format
        views={["hours", "minutes"]}
        shouldDisableTime={shouldDisableTime}
      />
    </LocalizationProvider>
  );
};

export default CustomTimePicker;
