import * as React from "react";
import { useState } from "react";

//import classes from "../styles/DatePicker.module.css";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box } from "@mui/material";

const DatePickerComponent = ({ date, onDateChange }) => {
  const handleDateChange = (newDate) => {
    // Call the parent's onDateChange callback with the new date
    onDateChange(newDate);
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { mt: 1, width: "100%" },
        "& .MuiInputLabel-root": { color: "#4CAF50" }, // Change label color
        "& .MuiInputLabel-shrink": { color: "#4CAF50 !important" }, // Change label color when shrink
        "& .MuiOutlinedInput-root": {
          // Change input color and border color
          color: "#4CAF50",
          "& fieldset": {
            borderColor: "#4CAF50",
          },
          "&:hover fieldset": {
            // Change border color on hover
            borderColor: "#4CAF50",
          },
          "&.Mui-focused fieldset": {
            // Change border color when focused
            borderColor: "#4CAF50",
          },
          "&.Mui-focused .MuiInputLabel-root": {
            // Change label color when focused
            color: "#4CAF50",
          },
        },
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label="Date" value={date} onChange={handleDateChange} />
      </LocalizationProvider>
    </Box>
  );
};

export default DatePickerComponent;
