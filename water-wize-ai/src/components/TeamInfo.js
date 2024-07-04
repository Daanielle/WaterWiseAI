// TeamInfo.js
import React from 'react';
import { IconButton } from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';

function TeamInfo({ linkedinUrl, emailUrl, facebookUrl, style }) {
    return (
            <div style={style} >
                <IconButton onClick={() => window.open(emailUrl, '_blank')}>
                    <EmailOutlinedIcon />
                </IconButton>
                <IconButton onClick={() => window.open(linkedinUrl, '_blank')}>
                    <LinkedInIcon />
                </IconButton>
                {/* <IconButton onClick={() => window.open(facebookUrl, '_blank')}>
                    <FacebookIcon />
                </IconButton> */}
            </div>
    );
}

export default TeamInfo;
