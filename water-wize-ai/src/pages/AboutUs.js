// AboutUs.js
import React from "react";
import classes from "../styles/AboutUs.module.css";
import PageContainer from "../components/PageContainer";
import useDictionary from "../resources/Dictionary/Dictionary";
import CustomCard from "../components/CustomCard";
import GrouDetails from "../resources/mapping/GrouDetails";
import TeamInfo from "../components/TeamInfo"
import {Grid} from '@mui/material';


const stylebutton={ 
  marginTop: '-150px',  // Adjust vertical positioning as needed
  marginLeft: '60px',
}

const BottomIcons=(linkedIn,email,facebook, style)=>(
<TeamInfo 
            linkedinUrl={linkedIn} 
            emailUrl={email}  
            facebookUrl={facebook} 
            style={style}
        />
      );
function AboutUs() {
  const dict = useDictionary();
  const teamDetails = GrouDetails();
  const keys = Object.keys(teamDetails);

  return (
    <div>
      <PageContainer >
        <div>
          <p className={classes.Title}>{dict.MeetTeam}</p>
          <p className={classes.Description}>
            {dict.WhoWeAre}
          </p>
        </div> 
        <Grid item xs={12} sm={6} md={4}>
        <div className={classes.team}>
          {keys.slice().map((key, index) => (
          <div  key={index}>
            {key && teamDetails[key] && (
                <CustomCard sx={{width: 260,height: 280,marginLeft:"20px",image:{height: "45%", width:"50%", marginLeft:"20%" }}}
                  title={teamDetails[key].my_Name}
                  // description={ teamDetails[key].about_me}
                  image={teamDetails[key].image_link}
                  bottomIcons={BottomIcons(teamDetails[key].linkedinUrl,teamDetails[key].emailUrl,teamDetails[key].facebookUrl,stylebutton)}
                />
            )}
          </div>
        ))}
            </div>
           </Grid>
          
      </PageContainer>

    </div> 
  );
}

export default AboutUs;
