import * as React from "react";
import { useState } from "react";

//import classes from "../styles/DatePicker.module.css";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box } from "@mui/material";
import useDictionary from "../../resources/Dictionary/Dictionary";

const DatePickerComponent = ({ date, onDateChange }) => {
  const dict = useDictionary();
  const handleDateChange = (newDate) => {
    // Call the parent's onDateChange callback with the new date
    onDateChange(newDate);
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { mt: 1, width: "100%" },
        "& .MuiInputLabel-root": { color: "var(--shrink-green)" }, // Change label color
        "& .MuiInputLabel-shrink": { color: "var(--shrink-green) !important" }, // Change label color when shrink
        "& .MuiOutlinedInput-root": {
          // Change input color and border color
          color: "var(--shrink-green)",
          "& fieldset": {
            borderColor: "var(--shrink-green)",
          },
          "&:hover fieldset": {
            // Change border color on hover
            borderColor: "var(--shrink-green)",
          },
          "&.Mui-focused fieldset": {
            // Change border color when focused
            borderColor: "var(--shrink-green)",
          },
          "&.Mui-focused .MuiInputLabel-root": {
            // Change label color when focused
            color: "var(--shrink-green)",
          },
        },
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label={dict.date} value={date} onChange={handleDateChange} />
      </LocalizationProvider>
    </Box>
  );
};

export default DatePickerComponent;
