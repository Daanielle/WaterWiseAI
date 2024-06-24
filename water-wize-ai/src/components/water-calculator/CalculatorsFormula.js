import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FermulaExplanations from "./FermulaExplanations";

const style={
  fontWeight: "bold",
  fontSize: "30px",
  marginBottom:"40px"
}

const styleFormula={
  fontSize: "25px"
}

const mainformula={
  fontWeight: "bold",
  fontSize: "25px"
}

const CalculatorsFormula = () => {


  return (
    <div>
        
        <div style={style}> 
        How did we get the result? We used several formulas listed here..
        </div>

          <div>
            <FermulaExplanations
            equation={"e_0=6.2 * exp⁡(17.26T/(T-35.8+273.16))"}
            Explanation={" .שנמצא לעיל TD מיוצג על ידי הפרמטר T לחץ אדים רוו, מחושב לפי הנוסחה הזו כאשר "}
            />

            <FermulaExplanations
            equation={"ea =  RH/100 * e0"}
            Explanation={" ea(לחץ אדים בפועל) שמחושב על ידי RH/100 * e0, כאשר RH מייצג לחות יחסית(Relative Humidity) ואותו נוציא מה-API של השירות המטאורולוגי."}
            />
            <FermulaExplanations
            equation={"Ea = 0.35 * (e0- ea) (0.5 + 0.54 * u2m) * C"}
            Explanation={"(Ea) - התאדות אירודינאמית. מכמת את ההבדל בין לחץ אדי הרוויה ללחץ האדים בפועל (ea). זה בעצם מודד כמה קרוב האוויר להיות רווי באדי מים. אם האוויר רווי, כלומר אינו יכול להחזיק יותר אדי מים, Ea יהיה אפס. מצד שני, אם האוויר יבש, עם לחות נמוכה, הגירעון בלחץ האדים יהיה גבוה. [נמדד ביחידות של (m/s)]u2m - מהירות הרוח 2 מטרים מעל הקרקע. הפרמטר WS ב-API של השירות המטאורולוגי מייצג משתנה זה, שכן תחנות מטאורולוגיות מודדות את מהירות הרוח בגובה סטנדרטי של 2 מטר מעל פני הקרקע.    (Ea) - התאדות אירודינאמית. מכמת את ההבדל בין לחץ אדי הרוויה ללחץ האדים בפועל (ea). זה בעצם מודד כמה קרוב האוויר להיות רווי באדי מים. אם האוויר רווי, כלומר אינו יכול להחזיק יותר אדי מים, Ea יהיה אפס. מצד שני, אם האוויר יבש, עם לחות נמוכה, הגירעון בלחץ האדים יהיה גבוה. [נמדד ביחידות של (m/s)] .קבוע בשם C שהוא 1-^(24 * 3600 * 1000)"}
            />
            <FermulaExplanations
            equation={"E=((∆γ*(Rn-G)+Ea*L)/(∆γ+1))/L"}
            Explanation={"      E - התאיידות [נמדד ב- m/s] L - חום כמוס(Latent Heat Energy), מתאר את כמות האנרגיה בצורה של חום הדרושה לחומר מסוים כדי לעבור מצב צבירה. [עבור תמרי מג'הול זה 2.45 * (9 ^ 10) ביחידות של J/m^3] דלתא Y - השינוי בלחץ אדי המים. לחץ אדי המים הוא הלחץ המופעל על ידי מולקולות אדי מים באטמוספרה. הוא מייצג את הלחץ החלקי של אדי המים באוויר וקשור ישירות לכמות אדי המים הקיימים באוויר. [בערך 0.067 kPa/°C](Rn) - קרינה על המשטח: פרמטר זה מייצג את המאזן בין הקרינה הנכנסת(כמו למשל מהשמש) והקרינה היוצאת של המשטח. [נמדד ביחידות של (w/m^2)] חילופ י  חום (G): מייצג את צפיפות שטף חום הקרקע. כלומר כמות האנרגיה התרמית שעוברת באזור אדמה ביחידת זמן( שטף חום הקרקע או צפיפות שטף החום). היכולת של אדמה להוביל חום קובעת באיזו מהירות הטמפרטורה משתנה במהלך יום או בין עונות.  [נמדד ביחידות של (w/m^2)] Grad ב-API מייצג את Rn בנוסחה  הפרמטר WSmax ב-API מייצג את G בנוסחה  בנוסחה  L הוא קבוע והוא 2.45 כפול 10 בתשיעית, על פי מה שניתן לנו  ה-E שנחשב מייצג את ה-ET0, וזה מה שבעצם נחלץ מהנוסחה."}
            />

            <FermulaExplanations
            equation={"l = ET0 *Kc*Total Area"}
            Explanation={"השקיה - Irrigation l ET0  - אידוי מים פוטנציאלי  Kc- כיסוי כגון גיל העץ או האדמה,דילול העץ, רווח בין העצים באדמה ועוד  Total Area - מייצג את שטח החלקה"}
            />
          </div>





</div>

  );
};

export default CalculatorsFormula;
