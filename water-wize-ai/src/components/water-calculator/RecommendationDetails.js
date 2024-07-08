import React from "react";
import WaterCalculatorVariablesDetails from "../../resources/mapping/WaterCalculatorVariablesDetails";
import { Typography, Box } from "@mui/material";
import useDictionary from "../../resources/Dictionary/Dictionary";
import { Icon } from '@mui/material';
import ContainerBox from "../ContainerBox";
import PredictionFlag from "./PredictionFlag";

function RecommendationDetails({ detailedData, isPrediction, station, date }) {

  const dict = useDictionary();
  const variablesMapping = WaterCalculatorVariablesDetails()

  return (
    <ContainerBox sx={{ height: "100%", width: "100%", backgroundColor: 'var(--light-accent-gray)', borderColor: 'var(--light-gray)' }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        {/* <div>
          <Typography sx={{ fontWeight: "bold" }}>
            {variablesMapping["recommendation"]?.title}
          </Typography>
          <div>
            {station && station.label && (
              <Box sx={{ marginLeft: "auto", mt: 2 }}>
                {"Station: " + station.label}
              </Box>
            )}
            {date && (
              <Box>
                {"Date: " + date}
              </Box>
            )}
          </div>

          <Typography sx={{ marginLeft: "auto", mt: 2 }} >
            {dict["recommendation"]}
          </Typography>
        </div> */}

{dict.stylePage === 'right' ?(
  <>
        <Box sx={{flexGrow: 1, marginLeft: 2 }}>
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
              {detailedData.recommendation !== "--" ? detailedData.recommendation : dict.recommendationButton}
              <Typography>
                {detailedData.recommendation !== "--" ? variablesMapping["recommendation"]?.units : ""}
              </Typography>
            </Box>
          </Typography>
        </Box>

        <div>
          <Typography sx={{ fontWeight: "bold" }}>
            {variablesMapping["recommendation"]?.title}
          </Typography>
          <div>
            {station && station.label && (
              <Box sx={{textAlign:dict.stylePage, marginLeft: "auto", mt: 2 }}>
                {station.label+": "+ dict.station  }
              </Box>
            )}
            {date && (
              <Box>
                {dict.date +": " + date}
              </Box>
            )}
          </div>

          <Typography sx={{ marginLeft: "auto", mt: 2 }} >
            {dict["recommendation"]}
          </Typography>
        </div>
        </>
):(
  <>
      <div>
    <Typography sx={{ fontWeight: "bold" }}>
      {variablesMapping["recommendation"]?.title}
    </Typography>
    <div>
      {station && station.label && (
        <Box sx={{ marginLeft: "auto", mt: 2 }}>
          {"Station: " + station.label}
        </Box>
      )}
      {date && (
        <Box>
          {"Date: " + date}
        </Box>
      )}
    </div>

    <Typography sx={{ marginLeft: "auto", mt: 2 }} >
      {dict["recommendation"]}
    </Typography>
  </div>


  <Box sx={{flexGrow: 1, marginLeft: 2 }}>
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
        {detailedData.recommendation !== "--" ? detailedData.recommendation : dict.recommendationButton}
        <Typography>
          {detailedData.recommendation !== "--" ? variablesMapping["recommendation"]?.units : ""}
        </Typography>
      </Box>
    </Typography>
  </Box>

  </>
)}
      </Box>
    </ContainerBox>
  );
};

export default RecommendationDetails;

