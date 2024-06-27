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
      title: dict?.gradParameter,
      description: dict.grad,
      units: "[W/m^2]",
    },
    windSpeed1mm: {
      icon: AirIcon,
      // title: dict?.WindSpeed1mmTitle,
      title: dict?.WindSpeed1mmTitle,
      description: dict.windSpeed1mm,
      units: "[m/s]",
    },
    maxWindSpeed: {
      icon: AirIcon,
      title: dict?.windSpeed1mmParameter,
      description: dict.maxWindSpeed,
      units: "[m/s]",
    },
    temperature: {
      icon: ThermostatIcon,
      title: dict?.temperatureParameter,
      description: dict.temperature,
      units: "[°C]",
    },
    relativeHumidity: {
      icon: AirIcon,
      title: dict?.relativeHumidityParameter,
      description: dict.relativeHumidity,
      units: "[%]",
    },
    deltaY: {
      icon: ChangeHistoryIcon,
      title: dict?.deltaYParameter,
      description: dict.deltaY,
      units: "[kPa/°C]",
    },
    e0: {
      icon: WaterDropIcon,
      title: dict?.e0Parameter,
      description: dict.e0,
    },
    ea: {
      icon: WaterDropIcon,
      title: dict?.eaParameter,
      description: dict.ea,
      units: "",
    },
    Ea: {
      icon: TrendingUpIcon,
      title: dict?.EaParameter,
      description: dict.Ea,
      units: "[mm/day]",
    },
    E: {
      icon: TrendingUpIcon,
      title: dict?.EParameter,
      description: dict.E,
      units: "[mm/day]",
    },
    Kc: {
      icon: NumbersIcon,
      title: dict?.KcParameter,
      description: dict.Kc,
      units: "[Constant]",
    },
    recommendation: {
      icon: RecommendIcon,
      title: dict?.RecParmeter,
      description: dict.recommendation,
      units: "[liters/day for the given area]",
    },
  };

  return details
}

export default WaterCalculatorVariablesDetails;
