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
      description: `Represents the balance between incoming and outgoing radiation at the surface. `,
      units: "[W/m^2]",
    },
    windSpeed1mm: {
      icon: AirIcon,
      title: dict?.WindSpeed1mmTitle,
      description: `Highest wind speed observed over a period of one minute. `,
      units: "[m/s]",
    },
    maxWindSpeed: {
      icon: AirIcon,
      title: "WSmax",
      description: `Maximum wind speed observed within a certain time interval.`,
      units: "[m/s]",
    },
    temperature: {
      icon: ThermostatIcon,
      title: "TD",
      description: `Temperature - the ambient air temperature at the meteorological station.`,
      units: "[°C]",
    },
    relativeHumidity: {
      icon: AirIcon,
      title: "RH",
      description: `Relative humidity - the amount of water vapor present in the air
relative to the maximum amount the air can hold at a given temperature. `,
      units: "[%]",
    },
    deltaY: {
      icon: ChangeHistoryIcon,
      title: "Delta Y",
      description: `Change in water vapor pressure based on temperature.`,
      units: "[kPa/°C]",
    },
    e0: {
      icon: WaterDropIcon,
      title: "e0",
      description: `Saturated vapor pressure,
calculated as e_0 = 6.2 * exp(17.26T / (T - 35.8 + 273.16)). `,
      units: "[kPa]",
    },
    ea: {
      icon: WaterDropIcon,
      title: "ea",
      description: `Actual vapor pressure,
calculated as RH / 100 * e0.`,
      units: "",
    },
    Ea: {
      icon: TrendingUpIcon,
      title: "Ea",
      description: `Aerodynamic evaporation, quantifying the difference between
saturation vapor pressure (e0) and actual vapor pressure (ea).
Calculated as Ea = 0.35 * (e0 - ea) * (0.5 + 0.54 * WS) * C,
with C being a constant equal to 1 / (24 * 3600 * 1000).
`,
      units: "[mm/day]",
    },
    E: {
      icon: TrendingUpIcon,
      title: "E",
      description: `Evapotranspiration rate,
calculated as ((deltaY * (Grad - WSmax) + Ea * L) / (deltaY + 1)) / L,
with L = 2.45 * 10^9.
`,
      units: "[mm/day]",
    },
    Kc: {
      icon: NumbersIcon,
      title: "Kc",
      description: `Crop coefficient for the current month
based on agricultural research. `,
      units: "[Constant]",
    },
    recommendation: {
      icon: RecommendIcon,
      title: "Recommendation",
      description: `Irrigation recommendation based on calculations.
I = Total Area * Kc * E
`,
      units: "[liters/day for the given area]",
    },
  };

  return details
}

export default WaterCalculatorVariablesDetails;
