import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Icon } from "@mui/material";
import VirtecalSlider from "./water-calculator/VirtecalSlider";

const CustomCard = ({
  title,
  description,
  image,
  topIcon,
  bottomIcons,
  VerticaleIcon,
  Min,
  Max,
  Value,
  Onchange,

  sx,
}) => {
  return (
    <Card
      sx={{
        width: 170,
        height: "100%",
        display: "flex",
        // flexDirection: 'column',
        flexDirection: "row",
        border: "2px solid var(--medium-green)",
        color: "var(--text-color)",
        borderRadius: "15px",
        ...sx,
      }}
    >
        {VerticaleIcon && (
            <VirtecalSlider
            iconuser={VerticaleIcon}
            min={Min}
            max={Max}
            value={Value}
            onChange={Onchange} />
         )}
      
      <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        {image && (
          <CardMedia
            style={sx?.image}
            image={image}
            component="img"
            alt={title}
          />
        )}


        <CardContent component="div" sx={{ flexGrow: 1, paddingBottom: 0 }}>
          {topIcon && (
            <Icon
              component={topIcon}
              sx={{ color: "var(--medium-green)", ...sx?.icon }}
            />
          )}
          <Typography
            gutterBottom
            component="div"
            fontWeight="bold"
            fontSize={13}
          >
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>

        {bottomIcons && (
          <CardActions
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: "auto",
              paddingTop: 0,
            }}
            disableSpacing
          >
            {bottomIcons}
          </CardActions>
        )}
      </div>
    </Card>
  );
};

export default CustomCard;
