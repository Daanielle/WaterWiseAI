import * as React from "react";
import dayjs from "dayjs";
import { Box } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import useDictionary from "../../resources/Dictionary/Dictionary";  

const DatePickerComponent = ({ date = dayjs(), onDateChange }) => {
  const dict = useDictionary();
  
  const handleDateChange = (newDate) => {
    onDateChange(newDate);
  };

  const disableDates = (date) => {
    // const tomorrow = dayjs().add(5, 'day').startOf('day');
    const tomorrow = dayjs().add(4, 'day').startOf('day');
    return date.isAfter(tomorrow);
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": {
            mt: 1, width: "80%",
        },
        "& .MuiInputLabel-root": {
            width: "127%",
            color: "var(--medium-green)",
            textAlign: dict.stylePage
        },
        "& .MuiInputLabel-shrink": {
            width: "127%",
            color: "var(--medium-green) !important",
            textAlign: dict.stylePage,
        },
        "& .MuiAutocomplete-popupIndicator": {
            color: "var(--medium-green)",
            marginRight: dict.stylePage === "right" ? "175px" : "",

        },
        "& .MuiAutocomplete-popupIndicatorOpen": {
            color: "var(--medium-green)",
            marginRight: dict.stylePage === "right" ? "175px" : "",
        },
        "& .MuiOutlinedInput-root": {
            color: "var(--medium-green)",
            "& fieldset": {
                borderColor: "var(--medium-green)",
                textAlign: dict.stylePage
            },
            "&:hover fieldset": {
                borderColor: "var(--medium-green)",
            },
            "&.Mui-focused fieldset": {
                borderColor: "var(--medium-green)",
                textAlign: dict.stylePage,
            },
            "&.Mui-focused .MuiInputLabel-root": {
                color: "var(--medium-green)",
                textAlign: dict.stylePage
            },
        },
    }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={dict.date}
          value={date}
          onChange={handleDateChange}
          shouldDisableDate={disableDates}
        />
      </LocalizationProvider>
    </Box>
  );
};

export default DatePickerComponent;
