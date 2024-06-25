import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import Recommendation from '../recommendation/Recomendation';
import MessageHeader from './MessageHeader';
import MessageBody from './MessageBody';


export default function AccordionExpandIcon() {
  return (
    <div>
      <Accordion style={{ backgroundColor: '#f5f5f5' }}>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <MessageHeader title={"this is my first forum message!!!"} userId={"667adee37880d11fae2343b2"} time={"2024/06/25"} isRec={true} numOfComments={3}/>
        </AccordionSummary>
        <AccordionDetails>
          <MessageBody msgBody={"this is the body of my first forum message!!!"}/>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}