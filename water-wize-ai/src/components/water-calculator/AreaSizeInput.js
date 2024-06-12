import * as React from "react";
import { useState } from "react";

//import classes from "../styles/DatePicker.module.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import useDictionary from "../../resources/Dictionary/Dictionary";

const AreaSizeInput = ({ areaSize, onAreaSizeChange }) => {
  const [error, setError] = useState(false);
  const dict = useDictionary();
  const handleAreaSizeChange = (newSize) => {
    // Call the parent's onAreaSizeChange callback with the new size
    onAreaSizeChange(newSize);
  };

  const handleInputChange = (event) => {
    const newSize = event.target.value;
    if (!isNaN(newSize)) { // Check if the input is a valid number
      setError(false);
      handleAreaSizeChange(newSize);
    } else {
      setError(true);
    }
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
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        label={dict.areaSize}
        variant="outlined"
        value={areaSize}
        onChange={handleInputChange}
        error={error}
        helperText={error ? "Please enter a valid number" : ""}
        InputProps={{
          style: {
            color: "#4CAF50",
          },
          inputProps: {
            // Allow only numeric input
            pattern: "[0-9]*",
          },
        }}
      />
    </Box>
  );
};

export default AreaSizeInput;
