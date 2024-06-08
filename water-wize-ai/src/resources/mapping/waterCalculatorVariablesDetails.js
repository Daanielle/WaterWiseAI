import WavesIcon from "@mui/icons-material/Waves";
import AirIcon from "@mui/icons-material/Air";
import ThermostatIcon from '@mui/icons-material/Thermostat';
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import NumbersIcon from '@mui/icons-material/Numbers';
import RecommendIcon from '@mui/icons-material/Recommend';

const waterCalculatorVariablesDetails = {
  grad: {
    icon: WavesIcon,
    title: "Grad",
    description: "test",
  },
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

export default waterCalculatorVariablesDetails;
