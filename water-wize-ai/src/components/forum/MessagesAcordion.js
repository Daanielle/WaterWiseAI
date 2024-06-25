import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MessageHeader from './MessageHeader';
import MessageBody from './MessageBody';

export default function AccordionExpandIcon({ messages }) {
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    };
    return date.toLocaleTimeString('en-US', options);
  }

  

  return (
    <div>
      {messages.map((message, index) => (
        <Accordion key={index} style={{ backgroundColor: '#dde6da' }}>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
          >
            <MessageHeader
              title={message.title}
              userId={message.userId}
              time={formatDate(message.createdAt)}
              isRec={message.recommendation}
              numOfComments={message.numOfComments}
            />
          </AccordionSummary>
          <AccordionDetails>
            <MessageBody 
            msgBody={message.body} 
            recId={message.recommendation} 
            msgId={message._id} />
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
