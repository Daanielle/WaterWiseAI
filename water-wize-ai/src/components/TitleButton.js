import React from "react";
import classes from "../styles/TitleButton.module.css";

const H1 = ({children, style }) => {
  return (
      <h1 className={classes.h1} style={style}>
        {children}
      </h1>
  );
};

export default H1;