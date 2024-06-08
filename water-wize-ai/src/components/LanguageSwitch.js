import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import IsraelFlag from "../resources/images/il.svg";
import UsaFlag from "../resources/images/us.svg";
import { useLanguage } from '../LanguageContext';

const LanguageSwitch = () => {
    const { lang, setLang } = useLanguage();

  const handleLanguageChange = (event, newLang) => {
    if (newLang !== null) {
        setLang(newLang);
      }
  };

  return (
    <ToggleButtonGroup
      value={lang}
      exclusive
      onChange={handleLanguageChange}
      aria-label="Language"
    >
      <ToggleButton value="eng">
        <img
          src={UsaFlag}
          alt="USA Flag"
          style={{ width: "20px", height: "auto" }}
        />
      </ToggleButton>
      <ToggleButton value="heb">
        <img
          src={IsraelFlag}
          alt="Israel Flag"
          style={{ width: "20px", height: "auto" }}
        />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default LanguageSwitch;
