import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import waterCalculatorVariablesDetails from "../../resources/mapping/WaterCalculatorVariablesDetails";
import { Icon } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
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

export default function DetailCard({ title, value }) {
  const dict = useDictionary();
  const [openDetailsModal, setOpenDetailsModal] = React.useState(false);
  const handleOpenDetailsModal = () => setOpenDetailsModal(true);
  const handleCloseDetailsModal = () => setOpenDetailsModal(false);

  const formattedValue = typeof value === "number" ? value.toFixed(3) : value;
  const variableDetails = waterCalculatorVariablesDetails[title];


  function getIcon(variableDetails) {
    const IconComponent = variableDetails?.icon || HelpOutlineIcon;
    return <Icon component={IconComponent} sx={{ color: "#72ab38" }} />;
  }

  return (
    <Box sx={{ minWidth: 50, width: 130 }}>
      <Card variant="outlined">
        <React.Fragment>
          <CardContent>
            {getIcon(variableDetails)}
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {waterCalculatorVariablesDetails[title].title}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {formattedValue}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="more info" onClick={handleOpenDetailsModal}>
              <HelpOutlinedIcon sx={{ color: "#bcbcbc" }} />
            </IconButton>
          </CardActions>
        </React.Fragment>
      </Card>
      <div>
        <Modal
          open={openDetailsModal}
          onClose={handleCloseDetailsModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}>
              {getIcon(variableDetails)}
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {waterCalculatorVariablesDetails[title].title}
              </Typography>
            </Box>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {/* {waterCalculatorVariablesDetails[title].description} */}
              {dict[title]}
            </Typography>
          </Box>
        </Modal>
      </div>
    </Box>
  );
}
