import { useLanguage } from "../../LanguageContext";

const hebDict = {
  // Home Page
  HomeWW: "Water Wise AI",
  HomeText1: "המערכת שלנו עוסקת בחישוב כמות ההשקיה הנדרשת לגידולי תמרים באזור הערבה בישראל. המערכת משתמשת במודלים של למידת מכונה ובנוסחת התאדות על מנת לחשב באופן אוטומטי את צרכי ההשקיה של תמרים מג'הול בערבה.",
  HomeText2: "המערכת שלנו מציעה פתרון מקיף על ידי שילוב משתנים ונתוני זמן אמת המותאמים במיוחד לצורכי גידול תמרים באזור הערבה, כגון מקדמי יבול ונתוני מזג אוויר מקומיים. שילוב זה מבטיח שהחקלאים יקבלו את התובנות המדויקות והמעשיות ביותר לניהול השקיה, תוך התייחסות לאתגרים הספציפיים העומדים בפני גידול תמרים בדיוק ויעילות רבה.",
  HomeText3: "הצטרפו אלינו היום ונצלו את כוחם של הנתונים על מנת לגדל יבול בצורה חכמה יותר, לשמרו טוב יותר וגדלו בצורה בת קיימא יחד איתנו",
  HomeSaveWater: "התחילו לחסוך במים",
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
  ResetPass:"שמור סיסמה ",

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
  Donthaveanaccount: " ?איך לך חשבון",
  alreadyhaveanaccount: "  ?יש לך כבר חשבון",
  loginhere: "התחבר כאן",
  nameR: "שם",
  firstName: "שם פרטי",
  lastName: "שם משפחה",
  email: "אימייל",
  image: "תמונה",
  successRegister: "משתמש נשמר בהצלחה",

  //contactUs page content
  name: ":שם",
  position: ":תפקיד",
  message: ":הודעה",
  sendMessage: "שלח הודעה",

  //WaterCalculator page content
  station: "תחנה",
  city: "עיר",
  date: "תאריך",
  areaSize: "גודל שטח [הקטאר]",
  KcValue: "Kc",
  calculate: "חשב",
  recommendationButton: "לחץ 'חשב' כדי לגלות את ההמלצה",
  WindSpeed1mmTitle: "מהירות רוח מקסימלית בדקה אחרונה",
  grad: ".מייצג את האיזון בין קרינה נכנסת ויוצאת על פני השטח ",
  windSpeed1mm: " .מהירות הרוח הגבוהה ביותר שנצפתה על פני תקופה של דקה אחת",
  maxWindSpeed: ".מהירות הרוח המרבית הנצפית בתוך מרווח זמן מסוים",
  temperature: ".טמפרטורה - טמפרטורת האוויר הסביבתי בתחנה המטאורולוגית",
  relativeHumidity: ".לחות יחסית - כמות אדי המים הקיימים באוויר ביחס לכמות המקסימלית שהאוויר יכול להחזיק בטמפרטורה נתונה",
  deltaY: ".שינוי בלחץ אדי המים בהתאם לטמפרטורה",
  e0: `.לחץ אדים רווי`,
  ea: `לחץ אדים בפועל.`,
  Ea: `.(ea) ללחץ אדים בפועל ,(e0) אידוי אווירודינמי, מכמת את ההבדל בין לחץ אדי רוויה`,
  E: `.קצב אידוי 
`,
  Kc: `.מקדם יבול לחודש הנוכחי מבוסס על מחקר חקלאי`,
  recommendation: `.המלצת השקיה על פי חישובים`,
  saveCalculate: "שמור חישוב",
  showAllCalcts: "הצגת החישובים שלי",
  findMyCoordinates: "מציאת הקורדינטות שלי",
  predict: "בצע חיזוי",


  // Calculator Parameters
  gradParameter: "קרינה גלובלית",
  windSpeed1mmParameter: "מהירות רוח מקסימלית בדקה האחרונה",
  maxWindSpeedParameter: "מהירות רוח מקסימלית",
  temperatureParameter: "טמפרטורה",
  relativeHumidityParameter: "לחות יחסית",
  deltaYParameter: "שינוי בלחץ אדי המים",
  e0Parameter: `לחץ אדים רווי`,
  eaParameter: `לחץ אדים בפועל`,
  EaParameter: `התאדות אירודינמית`,
  EParameter: "אידוי",
  KcParameter: "קבוע השקיה",
  RecParmeter: "המלצה",

  CalculatorFormulaParam: "נוסחת המחשבון",
  EditFormulaParm: "ערכו נוסחה",
  HowGetResult: "...איך הגענו לתוצאה? השתמשנו בכמה נוסחאות המפורטות כאן",
  NewKc: "...Kc אתה יכול לערוך את הערך של המשתנה אם תרצה אנא הזן את הערך החדש של",

  //Explenations Fermulas
  Explenationse0: " •	נוסחה זו משמשת לחישוב לחץ האדים רווי המציין את הלחץ המופעל על ידי מולקולות אדים באטמוספירה כשהאוויר מכיל את כמות האדים המקסימלית שהוא יכול להחזיק בהתאם לטמפרטורה את החישוב מתבסס על טמפרטורת הקירוב ",
  Explenationsea: "•	נוסחה זו משמשת לחישוב הלחץ האדים בפועל באטמוספירה, המייצג את הלחץ החלקי של אדי המים באוויר ביחס למקסימום שהאוויר יכול להחזיק בהתאם ללחות היחסית. את החישוב נעשה בהתבסס על הלחות היחסית שזה היחס בין כמות האדים הנוכחית באוויר לכמות האדים המקסימלית שהוא יכול להחזיק באותה טמפרטורה, מסופר באחוזים ועל הלחץ האדים.",
  ExplenationsEa: "נוסחה זו משמשת לחישוב ערך התאדות אירודינמית, המייצג את ההבדל בין לחץ אדים הרווי לבין לחץ אדים בפועל ומתחשבת גם במהירות הרוח בגובה 2 מטרים מעל פני הקרקע.",
  ExplenationsE: "הנוסחה משמשת לחיזוי התאיידות המים מפני השטח של כדור הארץ, בהתבסס על מרכיבים כמו קרינה על המשטח, חילופי חום, התאיידות אירודינאמית, לחץ אדי המים, וחום כמוס. הנוסחה מחלקת את כל זה על ידי, ומצטפה ב ואחד.",
  ExplenationsI: "הנוסחה מתייחסת לכמות המים הנדרשת ליבול התמרים בהתבסס על השקיה ואידוי המים הפוטנציאלי. היא משתמשת במקדם הכיסוי, שמייצג את הצורך הנוכחי של התמרים במים ביחס לאידוי המים, ובשטח הכללי של החלקה לחישוב כמות המים הכוללת הנדרשת להשקיה.",


  //Support page
  Explanation1: "הסבר למסך 1",
  Explanation2: "הסבר למסך 2",
  Explanation3: "הסבר למסך 3",
  Explanation4: "הסבר למסך 4",
  Explanation5: "הסבר למסך 5",
  Explanation6: "הסבר למסך 6",

  //AboutUs page
  AboutUsTitle: "...הכירו את הצוות שלנו",
  OurTeam:"הצוות שלנו",
  OurSolution:"הפתרון שלנו",
  JoinUs:"הצטרף אלינו",
  OurMission:"המשימה שלנו",

  //Forum Page
  NewMessage:"הודעה חדשה",
  LogInMessage:"התחבר כדי להוסיף הודעה חדשה",
  AddNewComment:"הוסף תגובה חדשה",
  Title:"כותרת",
  Body:"טקסט",
  SaveComment:"שמור תגובה",
  AddNewMessage:"הוסף הודעה חדשה",
  SaveMessage:"שמור הודעה",
  AttachRecommendation:"צרף המלצה",
  Guest:"אורח",
  CommentsMessage:"תגובות להודעה זו",
  NoCommentsYet:"!עדיין אין תגובות",
  NewComment:"תגובה חדשה",


  // OurTeamExp: ".אני סטודנט שנה ד' להנדסת תוכנה ומערכות מידע באוניברסיטת בן גוריון בנגב",
  Danielle_Name: "דניאל אספיר",
  Hadar_Name: "הדר סבתי מור",
  Lana_Name: "לנא אבוריא",
  Shachar_Name: "שחר אדם",
  OurTeamExp: ".אנחנו צוות של ארבעה סטודנטים בשנה הרביעית בהנדסת תוכנה ומערכות מידע. הצוות שלנו מוקדש למינוף טכנולוגיה כדי לפתור בעיות בעולם האמיתי בחקלאות. עם בסיס חזק בפיתוח תוכנה, ניתוח נתונים והנדסת מערכות, אנו ערוכים היטב על מנת להביא פתרונות לקהילת החקלאים",
  OurMessionExp:"המשימה שלנו היא לספק לחקלאי תמרים המלצות מדויקות ומהימנות להשקיה, לעזור להם לחסוך במים ולמקסם את התפוקה. בהשראת האתגרים העומדים בפני חקלאים באזורים צחיחים כמו הערבה, אנו מחויבים להשתמש בטכנולוגיה חדשנית כדי להתמודד עם הצורך הגובר לחיסכון במים על ידי מינוף אלגוריתמים מתקדמים ונתונים בזמן אמת, האתר שואף לתמוך בחקלאים בקבלת החלטות מושכלות המועילות הן עם היבולים והן עם הסביבה, תוך תרומה לעתיד בר-קיימא יותר לחקלאות.", 
OurSolutionExp:"האתר משתמש בטכנולוגיה חדשנית כדי לנתח נתונים מטאורולוגיים, רמות לחות בקרקע וגורמים קריטיים אחרים כדי לספק המלצות השקיה מותאמות אישית. הפלטפורמה שלנו נועדה להיות ידידותית ונגישה למשתמש, ומאפשרת לחקלאים להזין את העיר שלהם ולקבל מידע מדויק על תחנת מזג האוויר הקרובה ונוהלי השקיה אופטימליים.",
JoinUsExp:"אנו מזמינים אותך לחקור את האתר שלנו ולראות כיצד אתר זה יכול לשנות את שיטות ההשקיה שלך. בין אם אתה חקלאי שמחפש פתרונות טובים יותר לניהול מים או מישהו שמתעניין בחקלאות בת קיימא, אתר זה כאן כדי לעזור.",  
//style
  stylePage: "right",
  whostyle: "rightwho",
  westyle: "rightwe",
  arestyle: "rightare",

  //editUser
  save: "שמירה",
  editDetails: "עריכת פרטים",
  editPassword: "עריכת סיסמה",
  successSaveUser: "פרטי משתמש נשמרו בהצלחה",
  successSavePass: "סיסמה נשמרה בהצלחה",
  successSentMessage:"!הודעה נשלחה בהצלחה",
  successSentEmailChangePass:".לבדוק את הדואר האלקטרוני שלך. שלחנו לך קישור לשינוי הסיסמה",

  //errors
  errorTryAgain: "הפעולה נכשלה, נסו שוב",
  errorsAreaSizeRange: "הזינו מספר תקין, בין 1 ל-10000",
  errorsKcRange: "הזינו מספר תקין, בין 0.3 ל-2",
  errorEmailExists: "אימייל קיים במערכת",
  errorEmailNotExists: "אימייל לא קיים במערכת",
  errorEmail: "הזינו כתובת אימייל תקינה, לדוגמה example@example.com",
  errorPass: "הזינו סיסמה תקינה - לפחות 8 תווים, אות גדולה ואות קטנה",
  errorWrongPass: "סיסמה שגויה",
  errorFields: "אנא מלאו את כל השדות",

  //Modal
  CloseModal: "סגירה",

  textAlign: "right",

  CheckEmail:"בדוק אימייל",
newPass:"סיסמה חדשה",
confirmPass:"אשר סיסמה",

};

const engDict = {
  // Home Page
  HomeWW: "Water Wise AI",
  HomeText1: "The Water Wise AI system deals with calculating the amount of irrigation required for date crops in the Arava region in Israel. The system uses machine learning models and the Evapotranspiration formula in order to automatically calculate the irrigation needs of Majhool dates in the Arava.",
  HomeText2: "Our system offers a comprehensive solution by integrating factors and real-time data specifically adapted to the needs of growing dates in the Arava region, such as crop coefficients and local weather data. This integration ensures that the farmers will receive the most accurate and practical insights for irrigation management, while addressing the specific challenges facing date farming with great precision and efficiency",
  HomeText3: "Join us today in harnessing the power of data to cultivate smarter, conserve better, and grow sustainably with Water Wise AI.",
  HomeSaveWater: "Start Saving Water",
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
  ResetPass:"Reset Password",
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
  alreadyhaveanaccount: "Already have an account?",
  loginhere: "Login here",
  nameR: "Name",
  firstName: "first name",
  lastName: "last name",
  email: "Email",
  image: "Image",
  successRegister: "User saved successfully",

  //contactUs page content
  name: "Name:",
  position: "Position:",
  message: "Message:",
  sendMessage: "Send Message",

  //WaterCalculator page content
  station: "Station",
  city: "City",
  date: "Date",
  areaSize: "Area Size [ha]",
  KcValue: "Kc",
  calculate: "Calculate",
  recommendationButton:"Click 'Calculate' to find out the recommendation",
  // WindSpeed1mmTitle: "Max Wind Speed Last Min",
  grad: "Represents the balance between incoming and outgoing radiation at the surface.",
  windSpeed1mm: "Highest wind speed observed over a period of one minute.",
  maxWindSpeed: "Maximum wind speed observed within a certain time interval. ",
  temperature: "Temperature - the ambient air temperature at the meteorological station.",
  relativeHumidity: "Relative humidity - the amount of water vapor present in the air relative to the maximum amount the air can hold at a given temperature. ",
  deltaY: "Change in water vapor pressure based on temperature.",
  e0: `Saturated vapor pressure`,
  ea: `Actual vapor pressure`,
  Ea: `Aerodynamic evaporation, quantifying the difference between
saturation vapor pressure (e0) and actual vapor pressure (ea).`,
  E: `Evapotranspiration rate.`,
  Kc: `Crop coefficient for the current month
based on agricultural research.`,
  recommendation: `Irrigation recommendation based on calculations.`,
  saveCalculate: "Save Calculation",
  showAllCalcts: "Show all saved calculations",
  findMyCoordinates: "Find my coordinates",
  predict: "predict",

  // Calculator Parameters
  gradParameter: "Global Radiation",
  windSpeed1mmParameter: "Max Wind Speed Last Min",
  maxWindSpeedParameter: "Max Wind Speed",
  temperatureParameter: "Temperature",
  relativeHumidityParameter: "Relative humidity",
  deltaYParameter: "Change in water vapor pressure",
  e0Parameter: `Saturated vapor pressure`,
  eaParameter: `Actual vapor pressure`,
  EaParameter: `Aerodynamic evaporation`,
  EParameter: "Evapotranspiration rate",
  KcParameter: "Irrigation Constant",
  RecParmeter: "Recommendation",

  CalculatorFormulaParam: "Calculator Formula",
  EditFormulaParm: "Editing Formula",
  HowGetResult: "How did we get the result? We used several formulas listed here:",
  NewKc: "You can edit the value of the variable Kc, if you want please enter your new value:",

  //Explenations Fermulas
  Explenationse0: "This formula is used to calculate the saturated vapor pressure indicating the pressure exerted by vapor molecules in the atmosphere when the air contains the maximum amount of vapor it can hold depending on the temperature, the calculation is based on the approximate temperature",
  Explenationsea: "This formula is used to calculate the actual vapor pressure in the atmosphere, which represents the partial pressure of the water vapor in the air in relation to the maximum that the air can hold according to the relative humidity. The calculation is made based on the relative humidity, which is the ratio between the current amount of vapor in the air and the maximum amount of vapor it can hold at the same temperature, expressed in percentages and the vapor pressure.",
  ExplenationsEa: "This formula is used to calculate the aerodynamic evaporation value, which represents the difference between the saturated vapor pressure and the actual vapor pressure and also takes into account the wind speed at a height of 2 meters above the ground.",
  ExplenationsE: "The formula is used to predict water evaporation from the Earth's surface, based on components such as surface radiation, heat exchange, aerodynamic evaporation, water vapor pressure, and capsule heat. The formula divides all of this by, and adds up to and one.",
  ExplenationsI: "The formula refers to the amount of water required for the date crop based on irrigation and potential water evaporation. It uses the coverage factor, which represents the date palm's current need for water in relation to water evaporation, and the general area of ​​the plot to calculate the total amount of water required for irrigation.",

  //Support page
  Explanation1: "Explanation for Screen 1",
  Explanation2: "Explanation for Screen 2",
  Explanation3: "Explanation for Screen 3",
  Explanation4: "Explanation for Screen 4",
  Explanation5: "Explanation for Screen 5",
  Explanation6: "Explanation for Screen 6",

  //AboutUs page
  // MeetTeam: "Meet Our Team...",
  AboutUsTitle:"About Us",
  OurMission:"Our Mission",
  OurTeam:"Our Team",
  OurSolution:"Our Solution",
  JoinUs:"Join Us",

  //Forum Page
  NewMessage:"New Message",
LogInMessage:"Log in in order to add a new message",
AddNewComment:"Add a new comment",
Title:"Title",
Body:"Body",
SaveComment:"Save Comment",
AddNewMessage:"Add a new message",
SaveMessage:"Save Message",
AttachRecommendation:"attach a recommendation",
Guest:"Guest",
CommentsMessage:"Comments for this message",
NoCommentsYet:"no comments yet!",
NewComment:"New Comment",






  // OurTeamExp: "I am a fourth year software and information systems engineering student at Ben Gurion University of the Negev.",
  Danielle_Name: "Danielle Aspir",
  Hadar_Name: "Hadar Sabati Mor",
  Lana_Name: "Lana AbuRaya",
  Shachar_Name: "Shachar Adam",
  // WhoWeAre: "We are a team of four passionate students in our fourth year of Software and Information Systems Engineering. Our team is dedicated to leveraging technology to solve real-world problems in agriculture. With a strong foundation in software development, data analysis, and systems engineering, we are well-equipped to bring solutions to the farming community.",
  OurTeamExp:"Welcome to WaterWizeAI, where technology meets agriculture to ensure optimal irrigation for date palm cultivation. We are a team of four dedicated Information Systems Engineering students passionate about harnessing the power of data and technology to solve real-world problems.",
 OurMessionExp:"Our mission is to provide date palm farmers with precise and reliable recommendations for irrigation, helping them conserve water and maximize yields. Inspired by the challenges faced by farmers in arid regions like the Arava, we are committed to using cutting-edge technology to address the growing need for water conservation. By leveraging advanced algorithms and real-time data, WaterWizeAI aims to support farmers in making informed decisions that benefit both their crops and the environment, while contributing to a more sustainable future for agriculture.", 
 OurSolutionExp:"WaterWizeAI utilizes cutting-edge technology to analyze meteorological data, soil moisture levels, and other critical factors to provide customized irrigation recommendations. Our platform is designed to be user-friendly and accessible, allowing farmers to input their city and receive precise information about the nearest weather station and optimal irrigation practices.",
JoinUsExp:"We invite you to explore our website and see how WaterWizeAI can transform your irrigation practices. Whether you're a farmer looking for better water management solutions or someone interested in sustainable agriculture, WaterWizeAI is here to help.",  

 //style
  stylePage: "left",
  whostyle: "leftwho",
  westyle: "leftwe",
  arestyle: "leftare",

  //editUser
  save: "save",
  editDetails: "Edit Details",
  editPassword: "Edit Password",
  successSaveUser: "User details saved successfully",
  successSavePass: "Password saved successfully",
  successSentMessage:"Messege sent successfully!",
  successSentEmailChangePass:"Check your email. We've sent you a link to change your password.",

  //errors
  errorTryAgain: "Action failed, please try again",
  errorsAreaSizeRange: "Please enter a valid number - between 1 to 10000",
  errorsKcRange: "Please enter a valid number - between 0.3 to 2",
  errorEmailExists: "Email already exists",
  errorEmailNotExists: "Email does not exist",
  errorEmail: "Please enter a valid email - e.g. example@example.com",
  errorPass: "Please enter a valid password - 8 characters, at least one uppercase letter, one lowercase letter and one number",
  errorWrongPass: "Password is wrong",
  errorFields: "Please fill all the fields",
  errorMessage: "Please fill message field",

  //Modal
  CloseModal: "Close",
  textAlign: "left",

  CheckEmail:"Check Email",
  newPass:"new password",
confirmPass:"confirm password",

};

const useDictionary = () => {
  const { lang } = useLanguage();
  return lang === "heb" ? hebDict : engDict;
};

export default useDictionary;
