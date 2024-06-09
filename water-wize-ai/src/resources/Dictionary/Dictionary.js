import { useLanguage } from "../../LanguageContext";

const hebDict = {
  // navBar
  forum: "פורום",
  tasksManagement: "ניהול משימות",
  support: "תמיכה והדרכה",
  contuctUs: "צרו קשר",
  aboutUs: "עלינו",
  home: "בית",
  waterCalculator: "מחשבון מים",
  goodMorning: "בוקר טוב",

  // Water Calculator
  waterCalculatorTitle: "מחשבון מים",
  calculate: "חשב",
};

const engDict = {
  // navBar
  forum: "Forum",
  tasksManagement: "To Do List",
  support: "Support",
  contuctUs: "Contact Us",
  aboutUs: "About Us",
  home: "Home",
  waterCalculator: "Water Calculator",
  goodMorning: "Good morning",

  // Water Calculator
  waterCalculatorTitle: "Water Calculator",
  calculate: "Calculate",
};

const useDictionary = () => {
  const { lang } = useLanguage();
  return lang == "heb" ? hebDict : engDict;
};

export default useDictionary;
