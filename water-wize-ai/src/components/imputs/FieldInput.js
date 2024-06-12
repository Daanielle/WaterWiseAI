import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";


const FieldInput = ({ label, value, onValueChange, checkIfValid, error, inputProps }) => {
    const [isError, setIsError] = useState(false);

    const handleChange = (newValue) => {
        // Call the parent's onValueChange callback with the new value
        onValueChange(newValue);
    };

    const handleInputChange = (event) => {
        const newValue = event.target.value;
        if (checkIfValid(newValue)) {
            setIsError(false);
            handleChange(newValue);
        } else {
            setIsError(true);
        }
        // if (!isNaN(newSize)) { // Check if the input is a valid number
        //   setError(false);
        //   handleChange(newValue);
        // } else {
        //   setError(true);
        // }
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
                label={label}
                variant="outlined"
                value={value}
                onChange={handleInputChange}
                error={isError}
                helperText={isError ? error : ""}
                InputProps={{
                    style: {
                        color: "#4CAF50",
                    },
                    inputProps: inputProps
                    // {
                    //     // Allow only numeric input
                    //     pattern: "[0-9]*",
                    // },
                }}
            />
        </Box>
    );
};

export default FieldInput;
