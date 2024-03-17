import React from "react";
import classes from "../styles/CustomButtons.module.css";

const Button = ({ onClick, label, type }) => {
  return (
    // <div className={classes.ripplecontainer}>
      <button className={classes.button} onClick={onClick} type={type}>
        {label}
      </button>
    // </div>
  );
};

export default Button;
