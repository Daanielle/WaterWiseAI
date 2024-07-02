import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import useDictionary from "../../resources/Dictionary/Dictionary";

const InputField = ({ name, label, value, onValueChange, checkIfValid, error, inputProps, type, multiline, rows }) => {
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

        if (checkIfValid) {
            if (checkIfValid(newValue)) {
                setIsError(false);
                if (type === "file") {
                    handleFileChange(event)
                } else {
                    handleChange(newValue);
                }
            } else {
                setIsError(true);
                if (type === "file") {
                    handleFileChange(event)
                } else {
                    handleChange(newValue);
                }
            }
        }
        else {
            setIsError(false);
                if (type === "file") {
                    handleFileChange(event)
                } else {
                    handleChange(newValue);
                }
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
                    color: "var(--medium-green)",
                    textAlign: dict.stylePage
                },

                "& .MuiInputLabel-shrink": {
                    width: "127%",
                    color: "var(--medium-green) !important",
                    textAlign: dict.stylePage,
                    // transformOrigin: 'center',
                },

                "& .MuiOutlinedInput-root": {
                    // Change input color and border color
                    color: "var(--medium-green)",
                    "& fieldset": {
                        borderColor: "var(--medium-green)",
                        textAlign: dict.stylePage
                    },
                    "&:hover fieldset": {
                        // Change border color on hover
                        borderColor: "var(--medium-green)",
                    },
                    "&.Mui-focused fieldset": {
                        // Change border color when focused
                        borderColor: "var(--medium-green)",
                        textAlign: dict.stylePage,
                    },
                    "&.Mui-focused .MuiInputLabel-root": {
                        // Change label color when focused
                        color: "var(--medium-green)",
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
                name={name}
                label={label}
                variant="outlined"
                value={value}
                onChange={handleInputChange}
                error={isError}
                helperText={isError ? error : ""}
                type={type}
                multiline={multiline}
                rows={rows}
                InputProps={{
                    style: {
                        color: "var(--medium-green)",
                        paddingLeft: (type === "file" && dict.stylePage === "left") ? '60px' : '',
                    },
                }}
            />
        </Box>
    );
};

export default InputField;
