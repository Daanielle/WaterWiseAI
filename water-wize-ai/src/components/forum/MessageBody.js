import React, { useEffect, useState } from 'react';
// import { getUserById } from '../../apiRequests';
import { Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Recommendation from '../recommendation/Recomendation';
import MessageHeader from './MessageHeader';

export default function MessageBody({ msgId, msgBody, recId }) {

    const detailedData = [{ //TODO: change to api
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


    return (
        <div>
            <Recommendation recommendationDataRows={detailedData} />
            <Typography sx={{ padding: '10px 0', lineHeight: '1.5' }}>
                {msgBody}
            </Typography>
            <Typography variant="h6" sx={{ padding: '20px 0 10px 0', fontWeight: 'bold', fontSize: '1.2rem' }}>
                Comments
            </Typography>
            <div style={{ paddingLeft: '30px' }}>
                <Accordion style={{ backgroundColor: '#b0d66a', border: '1px solid #ccc', borderRadius: '8px', marginBottom: '8px' }}>
                    <AccordionSummary
                        expandIcon={<ArrowDropDownIcon />}

                    >
                        <MessageHeader title={"this is my first forum comment!!!"} userId={"000000000000000000000000"} time={"2024/06/25"} isRec={false} numOfComments={-1}/>
                    </AccordionSummary>
                    <AccordionDetails >
                        <Typography>
                            some comment
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion style={{ backgroundColor: '#b0d66a', border: '1px solid #ccc', borderRadius: '8px', marginBottom: '8px' }}>
                    <AccordionSummary
                        expandIcon={<ArrowDropDownIcon />}

                    >
                        <MessageHeader title={"this is my second forum comment!!!"} userId={"667adee37880d11fae2343b2"} time={"2024/06/25"} isRec={false} numOfComments={-1}/>
                    </AccordionSummary>
                    <AccordionDetails >
                        <Typography>
                            some comment
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </div>
        </div>
    );
}
