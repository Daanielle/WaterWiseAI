// TeamInfo.js
import React from 'react';
import { IconButton } from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import classes from "../styles/TeamInfo.module.css";

function TeamInfo({ image_link, my_Name, about_me, linkedinUrl, emailUrl, facebookUrl }) {
    return (
        <div className={classes.child}>
            <img src={image_link} alt="my_image" />
            <div className={classes.name}>{my_Name}</div>
            <div>{about_me}</div>
            <div className={classes.icons}>
                <IconButton onClick={() => window.open(emailUrl, '_blank')}>
                    <EmailOutlinedIcon />
                </IconButton>
                <IconButton onClick={() => window.open(linkedinUrl, '_blank')}>
                    <LinkedInIcon />
                </IconButton>
                <IconButton onClick={() => window.open(facebookUrl, '_blank')}>
                    <FacebookIcon />
                </IconButton>
            </div>
        </div>
    );
}

export default TeamInfo;
