import { useLanguage } from "../../LanguageContext";

const hebDict = {
  // navBar titles
  forum: "פורום",
  tasksManagement: "ניהול משימות",
  support: "תמיכה והדרכה",
  contuctUs: "צרו קשר",
  aboutUs: "עלינו",
  home: "בית",
  waterCalculator: "מחשבון מים",

  // page titles
  waterCalculatorTitle: "מחשבון מים",
};

const engDict = {
  // navBar titles
  forum: "Forum",
  tasksManagement: "To Do List",
  support: "support",
  contuctUs: "Contuct Us",
  aboutUs: "About Us",
  home: "Home",
  waterCalculator: "Water Calculator",

  // page titles
  waterCalculatorTitle: "Water Calculator",
};

const useDictionary = () => {
  const { lang } = useLanguage();
  return lang == "heb" ? hebDict : engDict;
};

export default useDictionary;
