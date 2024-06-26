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

  //Guide
  GuideScreenExplanations: "הסברים על המסכים",
  GuideHomeTitle: "בית",
  GuideAboutUs: "עלינו",
  GuideContactUs: "צרו קשר",
  GuideWaterCalculator: "מחשבון מים",
  GuideForum: "פורום",

  GuideHomeExplanation: "מסך הבית מאפשר למשתמשים להירשם ולהיכנס לאפליקציה.",
  GuideAboutUsExplanation: "המסך עלינו נותן רקע על מפתחי הפרויקט",
  GuideContactExplanation: "מסך צרו קשר מאפשר למשתמשים ליצור קשר עם מפתחי הפרויקט",
  GuideWCExplanation: "מסך מחשבון המים מסייע למשתמשים להעריך את צרכי המים עבור היבול שלהם על סמך פרמטרים שונים.",
  GuideForumExplanation: "מסך הפורום מאפשר למשתמשים לשאול שאלות ולהשתתף בדיונים.",

  GuideFAQ: "שאלות נפוצות",
  GuideResourcesAndTools: "כלי עזר ומשאבים שימושיים",
  GuideDemonstration: "הדגמת מחשבון מים",


  GuideAravaCenter: "מרכז ופיתוח ערבה תיכונה וצפונית",
  GuideResearch: "מחקר ומאמרים מדעיים על קרקע ומים",
  GuideIMS: "השירות המטאורולוגי של ישראל (IMS)",
  GuideGovMap: "אתר המפות הממשלתי",
  GuideSouthernArava: "מרכז ופיתוח ערבה דרומית",
  GuideWebMap: "יישום מיפוי אינטרנטי של חלקות חקלאיות",

  GuideCenterAravaDesc: "מרכז מחקר ופיתוח זה בערבה הוקם בשנת 1986 במטרה לשרת את צורכי הפיתוח של היישוב באזורים מועדפים לאורך גבולות ישראל בנגב ובערבה.",
  GuideResearchDesc: "מטרות מרכז מחקר ופיתוח זה הן לפתח ולחקור ממשקי השקיה שיבטיחו קיימות חקלאית בדרום הערבה, תוך שמירה על משאבים סביבתיים, ולהגיע להתפתחויות טכנולוגיות במדעי ההשקיה.",
  GuideIMSDesc: "יחידה של משרד התחבורה הישראלי האחראית על חיזוי מזג האוויר, נתונים מטאורולוגיים וחקר האקלים בישראל. מספק מידע מטאורולוגי מדויק ואמין.",
  GuideGovDesc: "אתר המפות הרשמי של מדינת ישראל. מאפשר: חיפושים שונים כגון כתובת, חלקה חקלאית, צפייה בשכבות מידע במגוון נושאים, שיתוף מפות, יצירת שכבות מידע אישיות ועוד.",
  GuideSouthernAravaDesc: "מרכז מחקר ופיתוח הערבה הדרומית ממוקם בסמוך לקיבוץ יטבתה שבערבה הדרומית ומרכז בו פעילות מחקר חקלאי ענפה במגוון תחומים כגון: קרקע ומים, טיפול בפירות לאחר הקטיף, פרדסים, פרחים וצמחי נוי, ירקות, הגנת הצומח, בעלי חיים ואגרוטכניקה.",
  GuideWebDesc: "מפה זו מציגה את מיפוי החלקות החקלאיות במדינת ישראל. המפה מאפשרת זיהוי חלקה חקלאית על פי מספר הזיהוי שלה.",

  GuideReadMore: "קראו עוד",

  GuideFaq1Title: "?כיצד משמשים במחשבון המים",
  GuideFaq1Ans: "מחשבון המים נועד לעזור לך להעריך את כמות המים הדרושה להשקית היבול שלכם. עליכם פשוט צריך להזין את הפרמטרים הרלוונטיים והמחשבון יספק המלצה.",
  GuideFaq2Title: "?אילו משתנים נלקחים בחשבון בעת חישוב כמות ההשקיה",
  GuideFaq2Ans: "מחשבון המים לוקח בחשבון גורמים כמו טמפרטורה, לחות, מהירות רוח וקרינת שמש כדי לספק המלצות מדויקות.",


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
MeetTeam:"...הכירו את הצוות שלנו",
aboutMe:".אני סטודנט שנה ד' להנדסת תוכנה ומערכות מידע באוניברסיטת בן גוריון בנגב",
Danielle_Name:"דניאל אספיר",
Hadar_Name:"הדר סבתאי מור",
Lana_Name:"לנא אבוריא",
Shachar_Name:"שחר אדם",
TitleWhoWeAre: "Who We Are",
WhoWeAre: "We are a team of four passionate students in our fourth year of Software and Information Systems Engineering. Our team is dedicated to leveraging technology and data-driven insights to solve real-world problems in agriculture. With a strong foundation in software development, data analysis, and systems engineering, we are well-equipped to bring solutions to the farming community.",

//style
stylePage:"right",
whostyle:"rightwho",
westyle:"rightwe",
arestyle:"rightare",

//errors
errorsAreaSizeRange: "הזינו מספר תקין, בין 10 ל-100000", 
errorsKcRange: "הזינו מספר תקין, בין 0 ל-2", 

//Modal
CloseModal: "סגור מודאל",
textAlign: "right"
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

  //Guide
  GuideScreenExplanations: "Screen Explanations",
  GuideHomeTitle: "Home",
  GuideAboutUs: "About Us",
  GuideContactUs: "Contact Us",
  GuideWaterCalculator: "Water Calculator",
  GuideForum: "Forum",

  GuideHomeExplanation: "The Home screen allows users to register and log in to the application.",
  GuideAboutUsExplanation: "The About Us screen provides background information about the project developers.",
  GuideContactExplanation: "The Contact Us screen lets users reach out to the project developers.",
  GuideWCExplanation: "The Water Calculator screen helps users estimate the water needs for their plants based on various parameters.",
  GuideForumExplanation: "The Forum screen allows users to ask questions and engage in discussions.",

  GuideFAQ: "FAQ",
  GuideResourcesAndTools: "Resources & Tools",
  GuideDemonstration: "Water Calculator Demonstration",

  GuideAravaCenter: "Central and Northern ARAVA R&D",
  GuideResearch: "Research and scientific articles about soil and water",
  GuideIMS: "Israel Meteorological Service (IMS)",
  GuideGovMap: "Govmap",
  GuideSouthernArava: "Southern ARAVA R&D",
  GuideWebMap: "Web Mapping Application Of Agricultural Plots",

  GuideCenterAravaDesc: "Research and Development in the Arava was established in 1986, as part of the Negev Arava R&D, with the aim of serving the development needs of the settlement in preferred areas along Israel's borders in the Negev and Arava.",
  GuideResearchDesc: "The goals of the Arava R&D agricultural are to develop and research irrigation interfaces that will ensure agricultural sustainability in the southern Arava, while preserving environmental resources, and to reach technological developments in the science of irrigation.",
  GuideIMSDesc: "A unit of the Israeli Ministry of Transportation responsible for forecasting weather, meteorological data, and climate research in Israel. Provides accurate and reliable meteorological information.",
  GuideGovDesc: "The official map site of the State of Israel. Enables: various searches such as address, block/plot, viewing information layers on a variety of topics, map sharing capabilities, creating personal information layers and more.",
  GuideSouthernAravaDesc: "Southern Arava R&D is located near Kibbutz Yotvata in the Southern Arava and centers extensive agricultural research activities in a variety of fields such as: soil and water, post-harvest fruit handling, orchards, flowers and ornamental plants, vegetables, plant protection, animals and agrotechnics.",
  GuideWebDesc: "This map shows the mapping of agricultural plots in the State of Israel. The map allows the identification of an agricultural plot according to its identification number.",

  GuideReadMore: "Read More",

  GuideFaq1Title: "How do I use the water calculator?",
  GuideFaq1Ans: "The water calculator is designed to help you estimate the amount of water needed for your plants. You simply need to input the relevant parameters and the calculator will provide recommendation.",
  GuideFaq2Title: "What factors does the water calculator consides?",
  GuideFaq2Ans: "The water calculator takes into account factors such as temperature, humidity, wind speed, and solar radiation to provide accurate recommendations.",

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
MeetTeam:"Meet Our Team...",
aboutMe:"I am a fourth year software and information systems engineering student at Ben Gurion University of the Negev.",
Danielle_Name:"Danielle Aspir",
Hadar_Name:"Hadar Sabati Mor",
Lana_Name:"Lana AbuRaya",
Shachar_Name:"Shachar Adam",
TitleWhoWeAre: "Who We Are",
WhoWeAre: "We are a team of four passionate students in our fourth year of Software and Information Systems Engineering. Our team is dedicated to leveraging technology and data-driven insights to solve real-world problems in agriculture. With a strong foundation in software development, data analysis, and systems engineering, we are well-equipped to bring solutions to the farming community.",
//style
stylePage:"left",
whostyle:"leftwho",
westyle:"leftwe",
arestyle:"leftare",

//errors
errorsAreaSizeRange: "please enter a valid number - between 10 to 100000", 
errorsKcRange: "please enter a valid number - between 0 to 2",

//Modal
CloseModal: "Close Modal",
textAlign: "left"
};

const useDictionary = () => {
  const { lang } = useLanguage();
  return lang == "heb" ? hebDict : engDict;
};

export default useDictionary;
