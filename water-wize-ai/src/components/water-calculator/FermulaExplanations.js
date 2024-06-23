import * as React from 'react';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Grid} from '@mui/material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#72ab38',
  border: "2px solid #72ab38",
  color: theme.palette.text.primary,

}));

const FermulaExplanations = ({equation, Explanation})=> {
  return (
    <Box sx={{ width: 600, minHeight: 90 }}>
      <Grid columns={3} spacing={2}>
          <Paper >
            <StyledAccordion sx={{ minHeight: 20 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ fontSize:"26px" }}>{equation} </Typography>
              </AccordionSummary>
              <AccordionDetails  sx={{ fontSize:"20px", color:"#72ab38" }}>{Explanation}</AccordionDetails>
            </StyledAccordion>
          </Paper>
       
      </Grid>
    </Box>
  );
}

export default FermulaExplanations;