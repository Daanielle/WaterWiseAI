import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Icon } from '@mui/material';

const CustomCard = ({ title, description, image, topIcon, bottomIcons, sx }) => {
    return (
        <Card sx={{ 
            width: 170, 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column', 
            border: "2px solid var(--medium-green)", 
            color: "var(--text-color)", 
            //marginLeft: "10px", 
            //marginRight: "20px",
            borderRadius: '15px', 
            ...sx 
        }}>
            {image && (
                <CardMedia
                    style={sx?.image}
                    image={image}
                    component="img"
                    alt={title}
                />
            )}

            <CardContent sx={{ flexGrow: 1, paddingBottom: 0 }}>
                {topIcon && <Icon component={topIcon} sx={{ color: "var(--medium-green)", ...sx?.icon }} />}
                <Typography gutterBottom component="div" fontWeight="bold" fontSize={13}>
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
            {bottomIcons && (
                <CardActions sx={{ display: 'flex', justifyContent: 'center', mt: 'auto', paddingTop: 0 }} disableSpacing>
                    {bottomIcons}
                </CardActions>
            )}
        </Card>
    );
}

export default CustomCard;
