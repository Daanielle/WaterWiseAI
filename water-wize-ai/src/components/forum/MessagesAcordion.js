import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Recommendation from '../recommendation/Recomendation';


const detailedData = [{
  grad: "--",
  windSpeed1mm: "--",
  maxWindSpeed: "--",
  temperature: "--",
  relativeHumidity: "--",
  deltaY: "--",
  e0: "--",
  ea: "--",
  Ea: "--",
  E: "--",
  Kc: "--",
  recommendation: "--",
}]

export default function AccordionExpandIcon() {
  return (
    <div>
      <Accordion style={{ backgroundColor: 'var(--background-color)'}}>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Recommendation recommendationDataRows={detailedData} />
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
        <Typography>
          comments
        </Typography>
        <div style={{ paddingLeft: '30px' }}>
          <Accordion style={{ backgroundColor: 'var(--light-green)', border: '1px solid var(--background-color)', borderRadius: '8px', marginBottom: '8px' }}>
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography>Accordion 1</Typography>
            </AccordionSummary>
            <AccordionDetails >
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                malesuada lacus ex, sit amet blandit leo lobortis eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion style={{ backgroundColor: 'var(--light-green)', border: '1px solid var(--background-color)', borderRadius: '8px', marginBottom: '8px' }}>
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography>Accordion 1</Typography>
            </AccordionSummary>
            <AccordionDetails >
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                malesuada lacus ex, sit amet blandit leo lobortis eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </Accordion>
      <Accordion style={{ backgroundColor: 'var(--background-color)'}}>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography>Accordion 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
        <Typography>
          comments
        </Typography>
        <div style={{ paddingLeft: '30px' }}>
          <Accordion style={{ backgroundColor: 'var(--light-green)', border: '1px solid var(--background-color)', borderRadius: '8px', marginBottom: '8px' }}>
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography>Accordion 1</Typography>
            </AccordionSummary>
            <AccordionDetails >
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                malesuada lacus ex, sit amet blandit leo lobortis eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </Accordion>
    </div>
  );
}