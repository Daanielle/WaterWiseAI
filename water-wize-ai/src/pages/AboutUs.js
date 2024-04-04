// AboutUs.js
import React from 'react';
import TeamInfo from "../components/TeamInfo";
import lanasImage from '../resources/images/lana.png';
import hadarsImage from '../resources/images/hadar.png';
import shacharsImage from '../resources/images/shachar.png';
import daniellesImage from '../resources/images/danielle.png';
import classes from "../styles/AboutUs.module.css";

function AboutUs() {
    const about_me = <p className={classes.text}>I am a fourth year software and information systems engineering student at Ben Gurion University of the Negev.</p>;
    const linkedinUrl = "https://www.linkedin.com/in/lana-aburaya-a78446224/";
    const emailUrl = "mailto:example@example.com"; // Change this to your email
    const facebookUrl = "https://www.facebook.com/yourfacebookprofile"; // Change this to your Facebook profile URL

    return (
        <div className={classes.back}>
            <div><p className={classes.WHO}>WHO</p></div>
            <div><p className={classes.WE}>WE</p></div>
            <div><p className={classes.ARE}>ARE</p></div>
            <div className={classes.team}>
                <TeamInfo
                    image_link={daniellesImage}
                    my_Name={"Danielle Aspir"}
                    about_me={about_me}
                    linkedinUrl={linkedinUrl}
                    emailUrl={"mailto:aspirda@bgu.post.ac.il"}
                    facebookUrl={facebookUrl}
                    className={classes.childTeam}
                />
                <TeamInfo
                    image_link={hadarsImage}
                    my_Name={"Hadar Sabati Mor"}
                    about_me={about_me}
                    linkedinUrl={linkedinUrl}
                    emailUrl={"mailto:hasab@bgu.post.ac.il"}
                    facebookUrl={facebookUrl}
                    className={classes.childTeam}
                />
                <TeamInfo
                    image_link={lanasImage}
                    my_Name={"Lana AbuRaya"}
                    about_me={about_me}
                    linkedinUrl={"https://www.linkedin.com/in/lana-aburaya-a78446224/"}
                    emailUrl={"mailto:lana.aburya@gmail.com"}
                    facebookUrl={facebookUrl}
                    className={classes.childTeam}
                />
                <TeamInfo
                    image_link={shacharsImage}
                    my_Name={"Shachar Adam"}
                    about_me={about_me}
                    linkedinUrl={"www.linkedin.com/in/shachar-adam-836a94277"}
                    emailUrl={"mailto:adamsha@bgu.post.ac.il"}
                    facebookUrl={facebookUrl}
                    className={classes.childTeam}
                />
            </div>
        </div>
    );
}

export default AboutUs;
