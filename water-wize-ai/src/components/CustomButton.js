import React from "react";
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import classes from "../styles/CustomButtons.module.css";

const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .MuiTooltip-tooltip`]: {
    fontSize: '1.2rem', // Adjust the font size as needed
  },
});

const Button = ({ onClick, label, type, style, secondary, to, disabled, disabledTooltip }) => {
  const buttonClass = disabled
    ? (secondary ? classes['disabled-secondary-button'] : classes['disabled-secondary-button'])
    : (secondary ? classes['secondary-button'] : classes.button);

  const handleButtonClick = () => {
    if (disabled) {
      // Do nothing if the button is disabled
      return;
    }
    if (to) {
      // Navigate to the specified route if 'to' prop is provided
      window.location.href = to;
    } else if (onClick) {
      // Call the onClick handler if provided
      onClick();
    }
  };

  const buttonElement = (
    <button
      className={buttonClass}
      onClick={handleButtonClick}
      type={type}
      style={{
        width: '80%',
        ...style,
      }}
      disabled={disabled} // Add the disabled attribute to the button element
    >
      {label}
    </button>
  );

  return (
    disabled ? (
      <CustomTooltip title={disabledTooltip || "Button is disabled"}>
        <span>{buttonElement}</span>
      </CustomTooltip>
    ) : buttonElement
  );
};

export default Button;
