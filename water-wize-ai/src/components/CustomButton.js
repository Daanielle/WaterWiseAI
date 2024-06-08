import React from "react";
import classes from "../styles/CustomButtons.module.css";

const Button = ({ onClick, label, type, style }) => {
  return (
    // <div className={classes.ripplecontainer}>
      <button className={classes.button} onClick={onClick} type={type} style={style}>
        {label}
      </button>
    // </div>
  );
};

export default Button;
