import React from "react";
import classes from "../../styles/DetailsPanel.module.css";
import CustomCard from "../CustomCard";
import WaterCalculatorVariablesDetails from "../../resources/mapping/waterCalculatorVariablesDetails";
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { IconButton } from "@mui/material";
import useDictionary from "../../resources/Dictionary/Dictionary";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { Icon } from "@mui/material";
import { Paper, Grid } from "@mui/material";

function DetailsPanel({ detailedData }) {
  const [openModal, setOpenModal] = React.useState(false);
  const [currentTitle, setCurrentTitle] = React.useState("");
  const [currentIcon, setCurrentIcon] = React.useState();
  const [currentDescription, setCurrentDescription] = React.useState("");
  const [clickPosition, setClickPosition] = React.useState({ top: 0, left: 0 });

  const dict = useDictionary();
  const variablesMapping = WaterCalculatorVariablesDetails();

  const handleCloseModal = () => setOpenModal(false);
  const handleOpenModal = (event, title, description, icon) => {
    setOpenModal(true);
    setCurrentDescription(description);
    setCurrentTitle(title);
    setCurrentIcon(icon);
    setClickPosition({
      top: event.clientY,
      left: event.clientX - window.scrollX,
    });
  };

  const keys = Object.keys(detailedData);

  const bottomIcons = (title, description, icon) => (
    <Box
      sx={{
        position: "sticky",
        "& > :not(style)": { m: 1, marginLeft: "120%", marginTop: "-240%" },
      }}
    >
      <Fab size="small" aria-label="add">
        <IconButton
          aria-label="more info"
          onClick={(e) => handleOpenModal(e, title, description, icon)}
        >
          <QuestionMarkIcon
            sx={{ color: "var(--dark-green)" }}
            aria-label="more info"
          />
        </IconButton>
      </Fab>
    </Box>
  );

  const modalStyle = {
    position: "absolute",
    top: `${clickPosition.top}px`,
    left: `${clickPosition.left}px`,
    transform: "translate(-50%, -50%)",
    // height: 200,
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid --text-color",
    boxShadow: 24,
    p: 4,
  };

  const CustomBackdrop = styled("div")({
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black, adjust as needed
  });

  return (
    <div className={classes.detailsPanel}>
      {/* <div className={classes.row}>
        {keys.slice(0, 4).map((key, index) => (
          <div className={classes.cardContainer} key={index}>
            {key && detailedData[key] !== undefined && detailedData[key] !== null && (
              <CustomCard
                topIcon={variablesMapping[key].icon}
                title={variablesMapping[key]?.title}
                description={detailedData[key] !== "--" ? detailedData[key] + " " + variablesMapping[key]?.units : detailedData[key]}
                bottomIcons={bottomIcons(variablesMapping[key].title, variablesMapping[key].description, variablesMapping[key].icon)}
              />
            )}
          </div>
        ))}
      </div>

      <div className={classes.row2}>
        {keys.slice(4, 7).map((key, index) => (
          <div className={classes.cardContainer} key={index}>
            {key && detailedData[key] !== undefined && detailedData[key] !== null && (
              <CustomCard
                topIcon={variablesMapping[key]?.icon}
                title={variablesMapping[key]?.title}
                description={detailedData[key] !== "--" ? detailedData[key] + " " + variablesMapping[key]?.units : detailedData[key]}
                bottomIcons={bottomIcons(variablesMapping[key].title, variablesMapping[key].description, variablesMapping[key].icon)}
              />
            )}
          </div>
        ))}
      </div>

      <div className={classes.row}>
        {keys.slice(7, 11).map((key, index) => (
          <div className={classes.cardContainer} key={index}>
            {key && detailedData[key] !== undefined && detailedData[key] !== null && (
              <CustomCard
                topIcon={variablesMapping[key]?.icon}
                title={variablesMapping[key]?.title}
                description={detailedData[key] !== "--" ? detailedData[key] + " " + variablesMapping[key]?.units : detailedData[key]}
                bottomIcons={bottomIcons(variablesMapping[key].title, variablesMapping[key].description, variablesMapping[key].icon)}
              />
            )}
          </div>
        ))}
      </div> */}

      <Grid sx={{ flexGrow: 1 }} container spacing={0.5}>
        <Grid item xs={12}>
          {/* First Row */}
          <Grid container justifyContent="center" spacing={0.5}>
            {keys.slice(0, 4).map((key, index) => (
              <Grid key={index} item>
                {key &&
                  detailedData[key] !== undefined &&
                  detailedData[key] !== null && (
                    <CustomCard
                      topIcon={variablesMapping[key].icon}
                      title={variablesMapping[key]?.title}
                      description={
                        detailedData[key] !== "--"
                          ? detailedData[key] +
                            " " +
                            variablesMapping[key]?.units
                          : detailedData[key]
                      }
                      bottomIcons={bottomIcons(
                        variablesMapping[key].title,
                        variablesMapping[key].description,
                        variablesMapping[key].icon
                      )}
                    />
                  )}{" "}
              </Grid>
            ))}
          </Grid>
            {/* Second Row */}
          <Grid container justifyContent="center" spacing={2}>
            {keys.slice(4, 7).map((key, index) => (
              <Grid key={index} item>
                {key &&
                  detailedData[key] !== undefined &&
                  detailedData[key] !== null && (
                    <CustomCard
                      sx={{ marginTop: 2 }}
                      topIcon={variablesMapping[key].icon}
                      title={variablesMapping[key]?.title}
                      description={
                        detailedData[key] !== "--"
                          ? detailedData[key] +
                            " " +
                            variablesMapping[key]?.units
                          : detailedData[key]
                      }
                      bottomIcons={bottomIcons(
                        variablesMapping[key].title,
                        variablesMapping[key].description,
                        variablesMapping[key].icon
                      )}
                    />
                  )}{" "}
              </Grid>
            ))}
          </Grid>
            {/* Third Row */}
          <Grid container justifyContent="center" spacing={0.5}>
            {keys.slice(7, 11).map((key, index) => (
              <Grid key={index} item>
                {key &&
                  detailedData[key] !== undefined &&
                  detailedData[key] !== null && (
                    <CustomCard
                      sx={{ marginTop: 2 }}
                      topIcon={variablesMapping[key].icon}
                      title={variablesMapping[key]?.title}
                      description={
                        detailedData[key] !== "--"
                          ? detailedData[key] +
                            " " +
                            variablesMapping[key]?.units
                          : detailedData[key]
                      }
                      bottomIcons={bottomIcons(
                        variablesMapping[key].title,
                        variablesMapping[key].description,
                        variablesMapping[key].icon
                      )}
                    />
                  )}{" "}
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      {openModal && (
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          BackdropComponent={CustomBackdrop} //
        >
          <Box sx={modalStyle}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
                justifyContent: "center",
                flexDirection: "column",
                marginBottom: 1,
              }}
            >
              <Typography variant="h6" component="div" gutterBottom>
                {currentIcon && (
                  <Icon
                    component={currentIcon}
                    sx={{ color: "var(--medium-green)", marginRight: 1 }}
                  />
                )}
                {currentTitle}
              </Typography>
            </Box>
            <Typography
              sx={{ textAlign: dict.textAlign, marginLeft: "auto", mt: 2 }}
              id="modal-modal-description"
            >
              {currentDescription}
            </Typography>
            <Button sx={{ marginLeft: "45%" }} onClick={handleCloseModal}>
              {dict.CloseModal}
            </Button>
          </Box>
        </Modal>
      )}
    </div>
  );
}

export default DetailsPanel;
