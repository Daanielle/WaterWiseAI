import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const style={
  fontWeight: "bold",
  fontSize: "30px"
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
    <Box
      sx={{
        // "& > :not(style)": { mt: 1, width: "100%" },
        // "& .MuiInputLabel-shrink": { color: "#4CAF50 !important" }, // Change label color when shrink
        // "& .MuiInputLabel-root": { color: "#4CAF50" }, // Change label color
        // "& .MuiOutlinedInput-root": {
        //   // Change input color and border color
        //   color: "#4CAF50",
        //   "& fieldset": {
        //     borderColor: "#4CAF50",
        //   },
        //   "&:hover fieldset": {
        //     // Change border color on hover
        //     borderColor: "#4CAF50",
        //   },
        //   "&.Mui-focused fieldset": {
        //     // Change border color when focused
        //     borderColor: "#4CAF50",
        //   },
        //   "&.Mui-focused .MuiInputLabel-root": {
        //     // Change label color when focused
        //     color: "#4CAF50",
        //   },
        // },
      }}
    >
        
        <div style={style}> 
        How did we get the result? We used several formulas listed here..
        </div>
        <div style={styleFormula}>
            <p style={mainformula}>E=((∆γ*(Rn-G)+Ea*L)/(∆γ+1))/L</p>
            <p>L = constant</p>
            <p>Rn = Grad</p>
            <p>G = WSmax</p>
    

        </div>
        
        <div style={styleFormula}>
        <p style={mainformula}>Ea = 0.35 * (e0- ea) (0.5 + 0.54 * u2m) * C
            </p> 
        <p>e_0=6.2 * exp⁡(17.26T/(T-35.8+273.16))</p>
        <p>T = TD</p>
        <p>ea =  RH/100 * e0</p>
        <p>u2m  = WSmax</p>
        <p>C = constant</p>

        </div>

        <div style={styleFormula}>
            <p style={mainformula}>l = ET0 *Kc*Total Area</p>
            <p>ET0 = E</p>
            <p>Kc = constant by month</p>
            <p>Total Area = users input</p>
            <p>l=Recomendation</p>
        </div>

        
   
        

    </Box>
  );
};

export default CalculatorsFormula;
