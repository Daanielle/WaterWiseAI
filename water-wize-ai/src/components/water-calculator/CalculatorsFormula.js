import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FermulaExplanations from "./FermulaExplanations";
import useDictionary from "../../resources/Dictionary/Dictionary";  




const CalculatorsFormula = () => {

  const dict = useDictionary();

  return (
    <Box
      sx={{fontWeight: "bold", fontSize: "30px"}}
    >
      <Box sx={{ marginBottom:"40px", marginLeft:"8%"}}> 
        How did we get the result? We used several formulas listed here..
      </Box>
      <Box sx={{marginLeft:"36%"}}> 
        <FermulaExplanations
          equation={"e_0=6.2 * exp⁡(17.26T/(T-35.8+273.16))"}
          Explanation={dict.e0}
        />

        <FermulaExplanations
          equation={"ea =  RH/100 * e0"}
          Explanation={dict.ea}
        />
        <FermulaExplanations
          equation={"Ea = 0.35 * (e0- ea) (0.5 + 0.54 * u2m) * C"}
          Explanation={dict.Ea}
        />
        <FermulaExplanations
          equation={"E=((∆γ*(Rn-G)+Ea*L)/(∆γ+1))/L"}
          Explanation={dict.E}
        />
                          
        <FermulaExplanations
          equation={"l = ET0 *Kc*Total Area"}
          Explanation={dict.I}
        />
      </Box>
    </Box>

  );
};

export default CalculatorsFormula;
