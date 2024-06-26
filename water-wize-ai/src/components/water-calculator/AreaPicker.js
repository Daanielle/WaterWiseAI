import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import useDictionary from "../../resources/Dictionary/Dictionary";

const AreaPicker = ({ area, onAreaChange }) => {
  const dict = useDictionary();
  const handleAreaChange = (newArea) => {
    onAreaChange(newArea.target.value);
  };

  return (
    <Box
      sx={{
        "& > :not(style)": { mt: 1, width: "100%" },
        "& .MuiInputLabel-shrink": { color: "var(--shrink-green) !important" }, // Change label color when shrink
        "& .MuiInputLabel-root": { color: "var(--shrink-green)" }, // Change label color
        "& .MuiOutlinedInput-root": {
          // Change input color and border color
          color: "var(--shrink-green)",
          "& fieldset": {
            borderColor: "var(--shrink-green)",
          },
          "&:hover fieldset": {
            // Change border color on hover
            borderColor: "var(--shrink-green)",
          },
          "&.Mui-focused fieldset": {
            // Change border color when focused
            borderColor: "var(--shrink-green)",
          },
          "&.Mui-focused .MuiInputLabel-root": {
            // Change label color when focused
            color: "var(--shrink-green)",
          },
        },
      }}
    >
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{dict.area}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={area}
          label={dict.area}
          onChange={handleAreaChange}
        >
          <MenuItem value={381}>Ashalim</MenuItem>
          <MenuItem value={29}>Arad</MenuItem>
          <MenuItem value={208}>Ashqelon</MenuItem>
          <MenuItem value={271}>Avdat</MenuItem>
          <MenuItem value={60}>Beer Sheva Uniersity</MenuItem>
          <MenuItem value={58}>Besor Farm</MenuItem>
          <MenuItem value={79}>Dorot</MenuItem>
          <MenuItem value={64}>Elat</MenuItem>
          <MenuItem value={211}>En Gedi</MenuItem>
          <MenuItem value={338}>Ezuz</MenuItem>
          <MenuItem value={236}>Gat</MenuItem>
          <MenuItem value={33}>Hazeva</MenuItem>
          <MenuItem value={350}>Lahav</MenuItem>
          <MenuItem value={210}>Metzoke Dragot</MenuItem>
          <MenuItem value={379}>Mizpe Ramon</MenuItem>
          <MenuItem value={82}>Negba</MenuItem>
          <MenuItem value={232}>Neot Smadar</MenuItem>
          <MenuItem value={349}>Nevatim</MenuItem>
          <MenuItem value={207}>Paran</MenuItem>
          <MenuItem value={98}>Sede Boqer</MenuItem>
          <MenuItem value={65}>Sedom</MenuItem>
          <MenuItem value={28}>Shani</MenuItem>
          <MenuItem value={36}>Yotvata</MenuItem>
          <MenuItem value={112}>Zomet Hanegev</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default AreaPicker;
