import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Icon } from '@mui/material';
import Modal from "@mui/material/Modal";
import WaterCalculatorVariablesDetails from "../resources/mapping/WaterCalculatorVariablesDetails";
import { styled } from '@mui/material/styles';

const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 3,
    p: 4,
};

const CustomBackdrop = styled('div')({
    backgroundColor: 'rgba(0, 0, 0, 0)', // Semi-transparent black, adjust as needed
  });

const CustomCard = ({ title, description, image, topIcon, bottomIcons}) => {
    const waterCalculatorVariablesDetails = WaterCalculatorVariablesDetails()

    // const handleClose = () => {
    //     onCloseModal(); // Call the parent's onCloseModal function
    // };

    return (
        <div>
            <Card sx={{ width: 250, height:300, backgroundColor:'rgb(134, 161, 145)'}}>

                {image && <CardMedia
                    sx={{ height: 140 }}
                    image={image}
                />}

                <CardContent>
                    {topIcon && <Icon component={topIcon} sx={{ color: "#72ab38" }} />}
                    <Typography gutterBottom variant="h6" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </CardContent>
                {bottomIcons && <CardActions>
                    {bottomIcons}
                </CardActions>
}
            </Card>
            <div>

            </div>
        </div>
    );
}

export default CustomCard;