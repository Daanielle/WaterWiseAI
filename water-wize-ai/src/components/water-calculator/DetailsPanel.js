import React from "react";
import DetailCard from "./DetailCard";
import classes from "../../styles/DetailsPanel.module.css";
import CustomCard from "../CustomCard";
import waterCalculatorVariablesDetails from "../../resources/mapping/waterCalculatorVariablesDetails";
import Fab from '@mui/material/Fab';
import Box from "@mui/material/Box";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { IconButton } from "@mui/material";
import useDictionary from "../../resources/Dictionary/Dictionary";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const DetailsPanel = ({ detailedData }) => {
  const [openModal, setOpenModal] = React.useState(false);
  const [currentTitle, setCurrentTitle] = React.useState('');

  const dict = useDictionary();

  // const handleOpenDetailsModal = () => setOpenDetailsModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const handleOpenModal = () => 
    {setOpenModal(true);
      console.log('hh')
    }

  const keys = Object.keys(detailedData);

  const bottomIcons = <Box sx={{ '& > :not(style)': { m: 1 } }}>
    <Fab size="small" aria-label="add">
      <IconButton aria-label="more info" onClick={handleOpenModal}>
        <QuestionMarkIcon sx={{ color: "#416e06" }} />
      </IconButton>
    </Fab>
  </Box>


  return (
    <div className={classes.detailsPanel}>
      <div className={classes.row}>
        {keys.slice(0, 6).map((key, index) => (
          <div className={classes.cardContainer} key={index}>
            {key && detailedData[key] &&
              // <DetailCard
              //   title={key}
              //   value={detailedData[key]}
              // />
              <div>
                <CustomCard
                  topIcon={waterCalculatorVariablesDetails[key]?.icon}
                  title={key}
                  description={detailedData[key]}
                  // description={typeof detailedData[key] === "number" ? detailedData.toFixed(3) : detailedData} // todo: make 3 digits after the dot
                  bottomIcons={bottomIcons}
                  // openModal={openDetailsModal}
                  //setOpenModal={setOpenDetailsModal}

                  openModal={openModal} 
                  onCloseModal={handleCloseModal}
                />
              </div>

            }

          </div>
        ))}
      </div>
      <div className={classes.row}>
        {keys.slice(6, 12).map((key, index) => (
          <div className={classes.cardContainer} key={index}>
            {key && detailedData[key] &&
              // <DetailCard
              //   title={key}
              //   value={detailedData[key]}
              // />
              <div>
              <CustomCard
                topIcon={waterCalculatorVariablesDetails[key]?.icon}
                title={key}
                description={detailedData[key]}
                // description={typeof detailedData[key] === "number" ? detailedData.toFixed(3) : detailedData} // todo: make 3 digits after the dot
                bottomIcons={bottomIcons}
                // openModal={openDetailsModal}
                //setOpenModal={setOpenDetailsModal}

                openModal={openModal} 
                onCloseModal={handleCloseModal}
              />
            </div>
              }
          </div>
        ))}
      </div>


    </div>
  );
};

export default DetailsPanel;
