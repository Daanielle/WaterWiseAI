import React from "react";
import classes from "../styles/CustomButtons.module.css";

const Button = ({ onClick, label, type, style, secondary, to }) => {
  const buttonClass = secondary ? classes['secondary-button'] : classes.button;

  const handleButtonClick = () => {
    if (to) {
      // Navigate to the specified route if 'to' prop is provided
      window.location.href = to
    } else if (onClick) {
      // Call the onClick handler if provided
      onClick();
    }
  };

  return (
    <button
      className={buttonClass} 
      onClick={handleButtonClick}
      type={type}
      style={{
        width: '80%',
        ...style
      }}
    >
      {label}
    </button>
  );
};

export default Button;
