import WavesIcon from "@mui/icons-material/Waves";
import AirIcon from "@mui/icons-material/Air";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import ChangeHistoryIcon from "@mui/icons-material/ChangeHistory";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import NumbersIcon from "@mui/icons-material/Numbers";
import RecommendIcon from "@mui/icons-material/Recommend";
import useDictionary from "../Dictionary/Dictionary";

function WaterCalculatorVariablesDetails() {
  const dict = useDictionary();

  const details = {
    grad: {
      icon: WavesIcon,
      title: "Grad",
      description: dict.grad,
      units: "[W/m^2]",
    },
    windSpeed1mm: {
      icon: AirIcon,
      // title: dict?.WindSpeed1mmTitle,
      title:"WindSpeed1mm",
      description: dict.windSpeed1mm,
      units: "[m/s]",
    },
    maxWindSpeed: {
      icon: AirIcon,
      title: "WSmax",
      description: dict.maxWindSpeed,
      units: "[m/s]",
    },
    temperature: {
      icon: ThermostatIcon,
      title: "TD",
      description: dict.temperature,
      units: "[°C]",
    },
    relativeHumidity: {
      icon: AirIcon,
      title: "RH",
      description: dict.relativeHumidity,
      units: "[%]",
    },
    deltaY: {
      icon: ChangeHistoryIcon,
      title: "Delta Y",
      description: dict.deltaY,
      units: "[kPa/°C]",
    },
    e0: {
      icon: WaterDropIcon,
      title: "e0",
      description: dict.e0,
    },
    ea: {
      icon: WaterDropIcon,
      title: "ea",
      description: dict.ea,
      units: "",
    },
    Ea: {
      icon: TrendingUpIcon,
      title: "Ea",
      description: dict.Ea,
      units: "[mm/day]",
    },
    E: {
      icon: TrendingUpIcon,
      title: "E",
      description: dict.E,
      units: "[mm/day]",
    },
    Kc: {
      icon: NumbersIcon,
      title: "Kc",
      description: dict.Kc,
      units: "[Constant]",
    },
    recommendation: {
      icon: RecommendIcon,
      title: "Recommendation",
      description: dict.recommendation,
      units: "[liters/day for the given area]",
    },
  };

  return details
}

export default WaterCalculatorVariablesDetails;
