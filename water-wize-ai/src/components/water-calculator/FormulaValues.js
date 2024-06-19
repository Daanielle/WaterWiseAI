import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import useDictionary from "../../resources/Dictionary/Dictionary";
const style={
  fontWeight: "bold",
  fontSize: "30px"
}

const styleFormula={
  fontSize: "30px"
}

const FormulaValues = () => {
    const dict = useDictionary();


  return (
    <Box
      sx={{
      }}
    >
              <div style={style}> 
              Values ​​you received according to your inputs
        </div>
        <div style={styleFormula}>
            <p>E*L=(∆γ*(Rn-G)+Ea*L)/(∆γ+1)</p>
            <p>L = constant</p>
            <p>E = want to calculate</p>
            <p>Rn = Grad</p>
            <p>G = WSmax</p>
    

        </div>
        
        <div style={styleFormula}>
        <p>Ea = 0.35 * (e0- ea) (0.5 + 0.54 * u2m) * C
            </p> 
        <p>e_0=6.2 * exp⁡(17.26T/(T-35.8+273.16))</p>
        <p>T = TD</p>
        <p>ea =  RH/100 * e0</p>
        <p>u2m  = WSmax</p>
        <p>C = constant</p>

        </div>

        <div style={styleFormula}>
            <p>l = ET0 *Kc*Total Area</p>
            <p>ET0 = E</p>
            <p>Kc = constant by month</p>
            <p>Total Area = users input</p>
            <p>l=Recomendation</p>
        </div>

        
   

        
    </Box>
  );
};

export default FormulaValues;
