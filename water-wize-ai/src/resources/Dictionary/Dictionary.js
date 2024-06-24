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
  goodMorning: "שלום",
  userPage: "פרטים",
  logOut: "התנתקות",

  // page titles
  waterCalculatorTitle: "מחשבון מים",
  LogIn: "התחברות",
  Register: "הרשמה",

  //Register & Log in page content
  username: "שם משתמש",
  password: "סיסמה",
  forgetpassword: " ?שכחת סיסמה",
  Login: "התחברות",
  Donthaveanaccount: " ?איך לך חשבון" ,
  alreadyhaveanaccount:"  ?יש לך כבר חשבון",
  loginhere: "התחבר כאן",
  nameR:"שם",
  firstName:"שם פרטי",
  lastName:"שם משפחה",
  email:"אימייל",
  image:"תמונה",

  //contactUs page content
  name:":שם",
  position: ":תפקיד",
  message: ":הודעה",
  sendMessage: "שלח הודעה",

  //WaterCalculator page content
  station:"תחנה",
  city:"עיר",
  date: "תאריך",
  areaSize: "גודל שטח",
  KcValue: "Kc",
  calculate: "חשב",
  WindSpeed1mmTitle: "מהירות הרוח המקסימלית בדקה האחרונה",
  grad: ".מייצג את האיזון בין קרינה נכנסת ויוצאת על פני השטח ",
  windSpeed1mm:" .מהירות הרוח הגבוהה ביותר שנצפתה על פני תקופה של דקה אחת",
  maxWindSpeed:".מהירות הרוח המרבית הנצפית בתוך מרווח זמן מסוים",
  temperature:".טמפרטורה - טמפרטורת האוויר הסביבתי בתחנה המטאורולוגית",
  relativeHumidity:".לחות יחסית - כמות אדי המים הקיימים באוויר ביחס לכמות המקסימלית שהאוויר יכול להחזיק בטמפרטורה נתונה",
  deltaY:".שינוי בלחץ אדי המים בהתאם לטמפרטורה",
  e0:`.לחץ אדים רווי`,
  ea:`לחץ אדים בפועל.`,
  Ea:`.(ea) ללחץ אדים בפועל ,(e0) אידוי אווירודינמי, מכמת את ההבדל בין לחץ אדי רוויה`,
E:`.קצב אידוי 
`,
Kc:`.מקדם יבול לחודש הנוכחי מבוסס על מחקר חקלאי`,
recommendation:`.המלצת השקיה על פי חישובים`,
saveCalculate:"שמור חישוב",
showAllCalcts:"הצגת החישובים שלי",
findMyCoordinates:"מציאת הקורדינטות שלי",
predict: "בצע חיזוי",
//Support page
Explanation1:"הסבר למסך 1",
Explanation2:"הסבר למסך 2",
Explanation3:"הסבר למסך 3",
Explanation4:"הסבר למסך 4",
Explanation5:"הסבר למסך 5",
Explanation6:"הסבר למסך 6",

//AboutUs page
MeetTeam:"..הכירו את הצוות שלנו",
aboutMe:".אני סטודנט שנה ד' להנדסת תוכנה ומערכות מידע באוניברסיטת בן גוריון בנגב",
Danielle_Name:"דניאל אספיר",
Hadar_Name:"הדר סבתאי מור",
Lana_Name:"לנא אבוריא",
Shachar_Name:"שחר אדם",

//style
stylePage:"right",
whostyle:"rightwho",
westyle:"rightwe",
arestyle:"rightare",

//errors
errorsAreaSizeRange: "הזינו מספר תקין, בין 10 ל-100000", 
errorsKcRange: "הזינו מספר תקין, בין 0 ל-2", 
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
  goodMorning: "Hello",
  userPage: "Details",
  logOut: "Logout",

  // page titles
  waterCalculatorTitle: "Water Calculator",
  LogIn: "Log In",
  Register: "Register",

  //Register & Log in page content
  username: "Username",
  password: "Password",
  forgetpassword: "Forgot Pssword?",
  Login: "Log in",
  Donthaveanaccount: "Dont have an account? Register",
  alreadyhaveanaccount:"Already have an account?",
  loginhere: "Login here",
  nameR:"Name",
  firstName:"first name",
  lastName:"last name",
  email:"Email",
  image:"Image",

  //contactUs page content
  name:"Name:",
  position: "Position:",
  message: "Message:",
  sendMessage: "Send Message",

  //WaterCalculator page content
  station:"Station",
  city:"City",
  date: "Date",
  areaSize: "Area Size",
  KcValue: "Kc",
  calculate: "Calculate",
  WindSpeed1mmTitle: "Maximum wind speed last minute",
  grad: "Represents the balance between incoming and outgoing radiation at the surface.",
  windSpeed1mm:"Highest wind speed observed over a period of one minute.",
  maxWindSpeed:"Maximum wind speed observed within a certain time interval. ",
  temperature:"Temperature - the ambient air temperature at the meteorological station.",
  relativeHumidity:"Relative humidity - the amount of water vapor present in the air relative to the maximum amount the air can hold at a given temperature. ",
  deltaY:"Change in water vapor pressure based on temperature.",
  e0:`Saturated vapor pressure.`,
  ea:`Actual vapor pressure.`,
  Ea:`Aerodynamic evaporation, quantifying the difference between
saturation vapor pressure (e0) and actual vapor pressure (ea).`,
E:`Evapotranspiration rate.`,
Kc:`Crop coefficient for the current month
based on agricultural research.`,
recommendation:`Irrigation recommendation based on calculations.`,
saveCalculate:"Save Calculate",
showAllCalcts:"Show all calcs",
findMyCoordinates:"Find my coordinates",
predict: "predict",
//Support page
Explanation1:"Explanation for Screen 1",
Explanation2:"Explanation for Screen 2",
Explanation3:"Explanation for Screen 3",
Explanation4:"Explanation for Screen 4",
Explanation5:"Explanation for Screen 5",
Explanation6:"Explanation for Screen 6",

//AboutUs page
MeetTeam:"Meet Our Team..",
aboutMe:"I am a fourth year software and information systems engineering student at Ben Gurion University of the Negev.",
Danielle_Name:"Danielle Aspir",
Hadar_Name:"Hadar Sabati Mor",
Lana_Name:"Lana AbuRaya",
Shachar_Name:"Shachar Adam",

//style
stylePage:"left",
whostyle:"leftwho",
westyle:"leftwe",
arestyle:"leftare",

//errors
errorsAreaSizeRange: "please enter a valid number - between 10 to 100000", 
errorsKcRange: "please enter a valid number - between 0 to 2",
};

const useDictionary = () => {
  const { lang } = useLanguage();
  return lang == "heb" ? hebDict : engDict;
};

export default useDictionary;
