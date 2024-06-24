import * as React from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import useDictionary from "../../resources/Dictionary/Dictionary";


const InputPicker = ({ label, value, onValueChange, options, }) => {
    const [inputValue, setInputValue] = React.useState('');
    const dict = useDictionary();

    return (
        <div>
            <Autocomplete
                disableClearable 
                value={value}
                onChange={(event, newValue) => {
                    onValueChange(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                // id="controllable-states-demo"
                options={options}
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
                    "& .MuiAutocomplete-popupIndicator": {
                        color: "var(--medium-green)",
                        marginRight: dict.stylePage === "right" ? "175px" : "",

                    },
                    "& .MuiAutocomplete-popupIndicatorOpen": {
                        color: "var(--medium-green)",
                        marginRight: dict.stylePage === "right" ? "175px" : "",
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
                renderInput={(params) => <TextField {...params} label={label} />}
            />
        </div>
    );
};

export default InputPicker;
