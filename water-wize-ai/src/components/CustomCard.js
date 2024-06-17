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

const style={
    marginBottom:"0px"
  }

const CustomCard = ({ title, description, image, topIcon, bottomIcons }) => {


    return (
        <div>
            <Card sx={{ width: 250, height: 300,   border: "2px solid #72ab38", color:"grey",marginLeft:"20px",marginRight:"20px"
 }}>

                {image && <CardMedia
                    sx={{ height: "40%", width:"50%", marginBottom:"0px",marginLeft:"50px" }}
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