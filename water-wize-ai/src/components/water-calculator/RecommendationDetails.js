import React from "react";
import WaterCalculatorVariablesDetails from "../../resources/mapping/waterCalculatorVariablesDetails";
import { Typography, Box } from "@mui/material";
import useDictionary from "../../resources/Dictionary/Dictionary";
import { Icon } from '@mui/material';
import ContainerBox from "../ContainerBox";
import PredictionFlag from "./PredictionFlag";

function RecommendationDetails({ detailedData, isPrediction, station, date }) {

  const dict = useDictionary();
  const variablesMapping = WaterCalculatorVariablesDetails()
  return (
    <ContainerBox height="100%" width="100%" backgroundColor='var(--light-accent-gray)' borderColor='var(--light-accent-gray)'>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <div>
          <Typography sx={{ fontWeight: "bold" }}>
            {variablesMapping["recommendation"]?.title}
          </Typography>
          <Typography sx={{ marginLeft: "auto", mt: 2 }}>
          {station && station.label && (
            <Box>
              {"Station: " + station.label}
            </Box>
          )}
          {date && (
            <Box>
              {"Date: " + date}
            </Box>
          )}
        </Typography>

          <Typography sx={{ marginLeft: "auto", mt: 2 }} >
            {dict["recommendation"]}
          </Typography>
        </div>
        <Box sx={{ flexGrow: 1, marginLeft: 2 }}>
          <Typography sx={{
            padding: '10px',
            lineHeight: '1.2',
            fontSize: detailedData.recommendation !== "--" ? 24 : 15,
            border: '1px solid #ccc',
            borderRadius: '60px',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, var(--light-green), var(--medium-green), var(--darker-green))',
            color: '#fff',
            display: 'flex', // Ensures that children are laid out in a row
            alignItems: 'center', // Aligns children vertically centered
            justifyContent: 'center', // Centers children horizontally
            textAlign: 'center'
          }}>
            {isPrediction && <Box sx={{ marginRight: 2 }}><PredictionFlag /></Box>}
            <Box>
              {detailedData.recommendation !== "--" ? detailedData.recommendation : 'Click "Calculate" to find out the recommendation'}
              <Typography>
                {detailedData.recommendation !== "--" ? variablesMapping["recommendation"]?.units : ""}
              </Typography>
            </Box>
          </Typography>
        </Box>
      </Box>
    </ContainerBox>
  );
};

export default RecommendationDetails;

