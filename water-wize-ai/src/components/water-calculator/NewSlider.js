import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Tooltip from "@mui/material/Tooltip";

export default function NewSlider(value, minValue, maxValue) {
  //   function valuetext(value) {
  //     return `${value}°C`;
  //   }

  function preventHorizontalKeyboardNavigation(event) {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
    }
  }

  return (
    <Box
      sx={{
        height: 130,
        marginTop: 2,
      }}
    >
      <Slider
        sx={{
          color: "var(--medium-green)",
          "& .MuiSlider-thumb": {
            width: 14,
            height: 14,
          },
          "& .MuiSlider-track": {
            width: 7,
          },
          "& .MuiSlider-rail": {
            width: 7,
          },
          "& .MuiSlider-valueLabel": {
            left: "calc(100% + 8px)",
          },
        }}
        orientation="vertical"
        // defaultValue={5}
        value={value.value} // Set value prop here
        // step={1}
        // marks
        min={value.minValue}
        max={value.maxValue}
        aria-label="Temperature"
        valueLabelDisplay="auto"
        onKeyDown={preventHorizontalKeyboardNavigation}
        // getAriaValueText={valuetext}
      />
    </Box>
  );
}
