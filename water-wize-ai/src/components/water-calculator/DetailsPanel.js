import React from "react";
import CustomCard from "../CustomCard";
import WaterCalculatorVariablesDetails from "../../resources/mapping/waterCalculatorVariablesDetails";
import Box from "@mui/material/Box";
import InfoIcon from '@mui/icons-material/Info';
import { IconButton } from "@mui/material";
import useDictionary from "../../resources/Dictionary/Dictionary";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { Icon } from "@mui/material";
import { Grid } from "@mui/material";

function DetailsPanel({ detailedData, selectedStation, selectedDate }) {
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
    <IconButton
      aria-label="more info"
      onClick={(e) => handleOpenModal(e, title, description, icon)}
    >
      <InfoIcon
        sx={{ color: "var(--light-gray)" }}
        aria-label="more info"
      />
    </IconButton>
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



  const varCard = (key) =>
  (
    <CustomCard
      topIcon={variablesMapping[key].icon}
      title={variablesMapping[key]?.title}
      description={
        detailedData[key] !== "--" ?

          (typeof detailedData[key] === 'number' ?
            parseFloat(detailedData[key].toFixed(3))
            :
            detailedData[key]) +
          " " +
          variablesMapping[key]?.units

          :

          detailedData[key]
      }
      sx={{
        width: '100%',
        height: '160px',
        backgroundColor: 'var(--extra-white-transparent)',
        borderColor: 'var(--extra-white-transparent)',
      }}
      bottomIcons={
        bottomIcons(
          variablesMapping[key].title,
          variablesMapping[key].description,
          variablesMapping[key].icon
        )}
    />
  )


  return (
    <div >
      <Grid container spacing={1}>
        {keys.slice(0, 3).map((key) => (
          <Grid item md={4} key={key}>
            {varCard(key)}
          </Grid>
        ))}

        {keys.slice(3, 6).map((key) => (
          <Grid item md={4} key={key}>
            {varCard(key)}
          </Grid>
        ))}

        {keys.slice(6, 9).map((key) => (
          <Grid item md={4} key={key}>
            {varCard(key)}
          </Grid>
        ))}

        {keys.slice(9, 11).map((key) => (
          <Grid item md={6} key={key}>
            {varCard(key)}
          </Grid>
        ))}
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
