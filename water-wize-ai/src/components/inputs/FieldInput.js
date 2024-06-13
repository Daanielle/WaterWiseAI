import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import useDictionary from "../../resources/Dictionary/Dictionary";

const FieldInput = ({ label, value, onValueChange, checkIfValid, error, inputProps, type }) => {
    const dict = useDictionary();
    const [isError, setIsError] = useState(false);

    const handleChange = (newValue) => {
        // Call the parent's onValueChange callback with the new value
        onValueChange(newValue);
    };

    const handleFileChange = (event) => {
        onValueChange(event);
    }

    const handleInputChange = (event) => {
        const newValue = event.target.value;
        if (checkIfValid(newValue)) {
            setIsError(false);
            if (type == "file") {
                handleFileChange(event)
            } else {
                handleChange(newValue);
            }
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
                "& > :not(style)": {
                    mt: 1, width: "80%",
                },
                "& .MuiInputLabel-root": {
                    width: "127%",
                    color: "#4CAF50",
                    textAlign: dict.stylePage
                },

                "& .MuiInputLabel-shrink": {
                    width: "127%",
                    color: "#4CAF50 !important",
                    textAlign: dict.stylePage,
                    // transformOrigin: 'center',
                },

                "& .MuiOutlinedInput-root": {
                    // Change input color and border color
                    color: "#4CAF50",
                    "& fieldset": {
                        borderColor: "#4CAF50",
                        textAlign: dict.stylePage
                    },
                    "&:hover fieldset": {
                        // Change border color on hover
                        borderColor: "#4CAF50",
                    },
                    "&.Mui-focused fieldset": {
                        // Change border color when focused
                        borderColor: "#4CAF50",
                        textAlign: dict.stylePage,
                    },
                    "&.Mui-focused .MuiInputLabel-root": {
                        // Change label color when focused
                        color: "#4CAF50",
                        // textAlign: "right",
                        textAlign: dict.stylePage
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
                type={type}
                InputProps={{
                    style: {
                        color: "#4CAF50",
                        // color: "red",
                        paddingLeft: (type === "file" && dict.stylePage === "left") ? '60px' : '',
                        //textAlign: (dict.stylePage === "right") ? "right" : "left"
                    },
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
