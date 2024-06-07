import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';
import Typography from "@mui/material/Typography";

import Icon from "@mui/material/Icon"; // Import the Icon component from Material-UI
import WavesIcon from "@mui/icons-material/Waves";
import AirIcon from "@mui/icons-material/Air";
import ThermostatIcon from '@mui/icons-material/Thermostat';
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import NumbersIcon from '@mui/icons-material/Numbers';
import RecommendIcon from '@mui/icons-material/Recommend';

import HelpOutlinedIcon from '@mui/icons-material/HelpOutlined';

const iconsPaths = {
  grad: WavesIcon,
  windSpeed1mm: AirIcon,
  maxWindSpeed: AirIcon,
  temperature: ThermostatIcon,
  relativeHumidity: AirIcon,
  deltaY: ChangeHistoryIcon,
  e0: WaterDropIcon,
  ea: WaterDropIcon,
  Ea: TrendingUpIcon,
  E: TrendingUpIcon,
  Kc: NumbersIcon,
  recommendation: RecommendIcon,
};

// Function to get the icon component based on the title
function getIcon(title) {
  const IconComponent = iconsPaths[title];
  if (IconComponent) {
    return <Icon component={IconComponent} sx={{ color: "#72ab38" }} />; // Render Material-UI icon component
  } else {
    return <Icon>{iconsPaths[title]}</Icon>; // Render a placeholder icon
  }
}

export default function DetailCard({ title, value }) {
  const formattedValue = typeof value === "number" ? value.toFixed(3) : value;

  return (
    <Box sx={{ minWidth: 50, width: 130 }}>
      <Card variant="outlined" >
        <React.Fragment>
          <CardContent>
            {getIcon(title)}
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {title}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {formattedValue}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
          <IconButton aria-label="more info">
            <HelpOutlinedIcon sx={{ color: "#bcbcbc" }}/>
          </IconButton>
        </CardActions>
        </React.Fragment>
      </Card>
    </Box>
  );
}
