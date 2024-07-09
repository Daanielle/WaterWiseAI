import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import useDictionary from "../../resources/Dictionary/Dictionary";

const InputField = ({
    name,
    label,
    value,
    onValueChange,
    checkIfValid,
    error,
    inputProps,
    type,
    multiline,
    rows,
    onValidChange
}) => {
    const dict = useDictionary();
    const [isError, setIsError] = useState(false);
    const [isInitiallyValid, setIsInitiallyValid] = useState(true);

    useEffect(() => {
        if (value && checkIfValid) {
            const isValid = checkIfValid(value);
            setIsError(!isValid);
            setIsInitiallyValid(isValid);
            onValidChange && onValidChange(isValid);
        }
    }, [value, checkIfValid, onValidChange]);

    const handleInputChange = (event) => {
        const newValue = event.target.value;
        if(type === "file"){
            onValueChange(event); // Pass the whole event for file inputs
        }
        else {
            onValueChange(newValue)
        }


        if (!isInitiallyValid && checkIfValid) {
            const isValid = checkIfValid(newValue);
            setIsError(!isValid);
            onValidChange && onValidChange(isValid);
        }
    };

    return (
        <Box
            component="form"
            sx={{
                "& > :not(style)": {
                    mt: 1,
                    width: "80%",
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
