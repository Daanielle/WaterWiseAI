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
  area:"אזור",
  date: "תאריך",
  areaSize: "גודל שטח",
  calculate: "חשב",
  grad: " (W/m^2) .מייצג את האיזון בין קרינה נכנסת ויוצאת על פני השטח ",
  windSpeed1mm:" (m/s).מהירות הרוח הגבוהה ביותר שנצפתה על פני תקופה של דקה אחת",
  maxWindSpeed:"(m/s).מהירות הרוח המרבית הנצפית בתוך מרווח זמן מסוים",
  temperature:"(°C).טמפרטורה - טמפרטורת האוויר הסביבתי בתחנה המטאורולוגית",
  relativeHumidity:"(%).לחות יחסית - כמות אדי המים הקיימים באוויר ביחס לכמות המקסימלית שהאוויר יכול להחזיק בטמפרטורה נתונה",
  deltaY:"(kPa/°C).שינוי בלחץ אדי המים בהתאם לטמפרטורה",
  e0:`  :לחץ אדים רווי, מחושב כ  
    e_0 = 6.2 * exp(17.26T / (T - 35.8 + 273.16)). (kPa)`,
  ea:`:לחץ אדים בפועל, מחושב כ 
   RH / 100 * e0.`,
  Ea:`.(ea) ללחץ אדים בפועל ,(e0) אידוי אווירודינמי, מכמת את ההבדל בין לחץ אדי רוויה
 :מחושב כ  
 Ea = 0.35 * (e0 - ea) * (0.5 + 0.54 * WS) * C,
 הוא קבוע שווה ל C כאשר 
 1 / (24 * 3600 * 1000).(mm/day)
`,
E:`,קצב אידוי 
 :מחושב כ  
((deltaY * (Grad - WSmax) + Ea * L) / (deltaY + 1)) / L,
with L = 2.45 * 10^9.
(mm/day)`,
Kc:`מקדם יבול לחודש הנוכחי מבוסס על מחקר חקלאי. (קָבוּעַ)`,
recommendation:`המלצת השקיה על פי חישובים
I = Total Area * Kc * E
(ליטר ליום עבור השטח הנתון)`,

//Support page
Explanation1:"הסבר למסך 1",
Explanation2:"הסבר למסך 2",
Explanation3:"הסבר למסך 3",
Explanation4:"הסבר למסך 4",
Explanation5:"הסבר למסך 5",
Explanation6:"הסבר למסך 6",

//AboutUs page
who:"מי",
we:"אנחנו",
are:"באמת",
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
  area:"Area",
  date: "Date",
  areaSize: "Area Size",
  calculate: "Calculate",
  grad: "Represents the balance between incoming and outgoing radiation at the surface. (W/m^2)",
  windSpeed1mm:"Highest wind speed observed over a period of one minute. (m/s)",
  maxWindSpeed:"Maximum wind speed observed within a certain time interval. (m/s)",
  temperature:"Temperature - the ambient air temperature at the meteorological station. (°C)",
  relativeHumidity:"Relative humidity - the amount of water vapor present in the air relative to the maximum amount the air can hold at a given temperature. (%)",
  deltaY:"Change in water vapor pressure based on temperature. (kPa/°C)",
  e0:`Saturated vapor pressure, 
  calculated as e_0 = 6.2 * exp(17.26T / (T - 35.8 + 273.16)). (kPa)`,
  ea:`Actual vapor pressure, calculated as RH / 100 * e0.`,
  Ea:`Aerodynamic evaporation, quantifying the difference between
saturation vapor pressure (e0) and actual vapor pressure (ea).
Calculated as Ea = 0.35 * (e0 - ea) * (0.5 + 0.54 * WS) * C,
with C being a constant equal to 1 / (24 * 3600 * 1000).
(mm/day)`,
E:`Evapotranspiration rate,
calculated as ((deltaY * (Grad - WSmax) + Ea * L) / (deltaY + 1)) / L,
with L = 2.45 * 10^9.
(mm/day)`,
Kc:`Crop coefficient for the current month
based on agricultural research. (Constant)`,
recommendation:`Irrigation recommendation based on calculations.
I = Total Area * Kc * E
(liters/day for the given area)`,

//Support page
Explanation1:"Explanation for Screen 1",
Explanation2:"Explanation for Screen 2",
Explanation3:"Explanation for Screen 3",
Explanation4:"Explanation for Screen 4",
Explanation5:"Explanation for Screen 5",
Explanation6:"Explanation for Screen 6",

//AboutUs page
who:"WHO",
we:"WE",
are:"ARE",
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

// //errors
// invalitTextInput: "Invalid input"

};

const useDictionary = () => {
  const { lang } = useLanguage();
  return lang == "heb" ? hebDict : engDict;
};

export default useDictionary;
