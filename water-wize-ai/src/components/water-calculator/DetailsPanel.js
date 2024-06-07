import React from "react";
import DetailCard from "./DetailCard";
import classes from "../../styles/DetailsPanel.module.css";

const DetailsPanel = ({ detailedData }) => {
  const keys = Object.keys(detailedData);

  return (
    <div className={classes.detailsPanel}>
      <div className={classes.row}>
        {keys.slice(0, 6).map((key, index) => (
          <div className={classes.cardContainer} key={index}>
            <DetailCard
              title={key}
              value={detailedData[key]}
              // Pass other properties similarly
            />
          </div>
        ))}
      </div>
      <div className={classes.row}>
        {keys.slice(6, 12).map((key, index) => (
          <div className={classes.cardContainer} key={index}>
            <DetailCard
              title={key}
              value={detailedData[key]}
              // Pass other properties similarly
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailsPanel;
