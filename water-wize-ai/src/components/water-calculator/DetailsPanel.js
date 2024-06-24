import React from "react";
import DetailCard from "./DetailCard";
import classes from "../../styles/DetailsPanel.module.css";
import CustomCard from "../CustomCard";
import WaterCalculatorVariablesDetails from "../../resources/mapping/WaterCalculatorVariablesDetails";
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { IconButton } from "@mui/material";
import useDictionary from "../../resources/Dictionary/Dictionary";
import Modal from "@mui/material/Modal";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import CalculatorsFormula from "./CalculatorsFormula";



const RecomendationStyle = {
 backgroundColor:'var(--medium-green)', 
 width: 250,
 height: 200,
border: "2px solid darkgreen",
 marginLeft: "43%",
}
const CardStyle={ 
  width: 250,
   height: 200,
  border: "2px solid var(--medium-green)",
  color:"grey",
  marginLeft:"20px",
  marginRight:"20px"
}
function DetailsPanel ({ detailedData }){
  const [openModal, setOpenModal] = React.useState(false);
  const [currentTitle, setCurrentTitle] = React.useState("");
  const [currentDescription, setCurrentDescription] = React.useState('');
  const [clickPosition, setClickPosition] = React.useState({ top: 0, left: 0 });

  const dict = useDictionary();
  const variablesMapping = WaterCalculatorVariablesDetails()

  // const handleOpenDetailsModal = () => setOpenDetailsModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const handleOpenModal = (event, title, description) => {
    setOpenModal(true);
    setCurrentDescription(description);
    setCurrentTitle(title);
    setClickPosition({ top: event.clientY , left: event.clientX - window.scrollX });

  };
  const modalStyle = {
  // position: "absolute",
  // top: "50%",
  // left: "50%",
  // transform: "translate(-50%, -50%)",
  position: 'absolute',
  top: `${clickPosition.top}px`,
  left: `${clickPosition.left}px`,
  transform: 'translate(-50%, -50%)',

  width: 400,
  bgcolor: "background.paper",
  border: "2px solid --text-color",
  boxShadow: 24,
  p: 4,
};


  const CustomBackdrop = styled('div')({
    backgroundColor: 'rgba(0, 0, 0, 0)', // Semi-transparent black, adjust as needed
  });
  
  const keys = Object.keys(detailedData);

  const bottomIcons =(title, description)=>( <Box sx={{ '& > :not(style)': { m: 1,marginLeft: '185%',marginTop: '-150%'} }}>
    <Fab size="small" aria-label="add">
      <IconButton aria-label="more info" onClick={(e) => handleOpenModal(e,title, description)}>
        <QuestionMarkIcon sx={{ color: "var(--dark-green)" }} aria-label="more info" />
      </IconButton>
    </Fab>
  </Box>
  );
  const style = {
    // position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid --text-color',
    boxShadow: 24,
    p: 4,
  };


  return (
    <div>
    <div className={classes.detailsPanel}>

    <div className={classes.row} >
        {keys.slice(11, 12).map((key, index) => (
          <div className={classes.cardContainer} key={index}>
            {key && detailedData[key] && (
              <div >
                <CustomCard style={RecomendationStyle}
                  topIcon={variablesMapping[key]?.icon}
                  title={variablesMapping[key]?.title}
                  description={ detailedData[key] !== "--" ? detailedData[key] + " " + variablesMapping[key]?.units : detailedData[key]}
                  // description={typeof detailedData[key] === "number" ? detailedData.toFixed(3) : detailedData} // todo: make 3 digits after the dot
                  bottomIcons={bottomIcons(key, detailedData[key])}
                />
              </div>
            )}
          </div>
        ))}
      </div>




      <div className={classes.row}>
        {keys.slice(0, 4).map((key, index) => (
          <div className={classes.cardContainer} key={index}>
            {key && detailedData[key] && (
              <div>
                <CustomCard style={CardStyle}
                  topIcon={variablesMapping[key]?.icon}
                  title={variablesMapping[key]?.title}
                  description={ detailedData[key] !== "--" ? detailedData[key] + " " + variablesMapping[key]?.units : detailedData[key]}
                  // description={typeof detailedData[key] === "number" ? detailedData.toFixed(3) : detailedData} // todo: make 3 digits after the dot
                  bottomIcons={bottomIcons(key, detailedData[key])}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {openModal&&  <Modal
                    open={openModal}
                    onClose={handleCloseModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    BackdropComponent={CustomBackdrop} // 
                >
                    <Box sx={modalStyle}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                {currentTitle}
                            </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {dict[currentTitle]}
                        </Typography>
                      <Button onClick={handleCloseModal}>Close Child Modal</Button>

                    </Box>
                </Modal>
                } 


      <div className={classes.row2}>
        {keys.slice(4, 7).map((key, index) => (
          <div className={classes.cardContainer} key={index}>
            {key && detailedData[key] && (
              // <DetailCard
              //   title={key}
              //   value={detailedData[key]}
              // />
              <div>
                <CustomCard style={CardStyle}
                  topIcon={variablesMapping[key]?.icon}
                  title={variablesMapping[key]?.title}
                  description={ detailedData[key] !== "--" ? detailedData[key] + " " + variablesMapping[key]?.units : detailedData[key]}
                  // description={typeof detailedData[key] === "number" ? detailedData.toFixed(3) : detailedData} // todo: make 3 digits after the dot
                  bottomIcons={bottomIcons(key, detailedData[key])}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className={classes.row}>
        {keys.slice(7, 11).map((key, index) => (
          <div className={classes.cardContainer} key={index}>
            {key && detailedData[key] && (
              // <DetailCard
              //   title={key}
              //   value={detailedData[key]}
              // />
              <div>
                <CustomCard style={CardStyle}
                  topIcon={variablesMapping[key]?.icon}
                  title={variablesMapping[key]?.title}
                  description={ detailedData[key] !== "--" ? detailedData[key] + " " + variablesMapping[key]?.units : detailedData[key]}
                  // description={typeof detailedData[key] === "number" ? detailedData.toFixed(3) : detailedData} // todo: make 3 digits after the dot
                  bottomIcons={bottomIcons(key, detailedData[key])}
                  // openModal={openDetailsModal}
                  //setOpenModal={setOpenDetailsModal}

                  // openModal={openModal}
                  // onCloseModal={handleCloseModal}
                />
              </div>
            )}
          </div>
        ))}
      </div>



      



    </div>
    
    </div>
  );
};

export default DetailsPanel;
