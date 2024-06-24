// AboutUs.js
import React from "react";
import classes from "../styles/AboutUs.module.css";
import PageContainer from "../components/PageContainer";
import useDictionary from "../resources/Dictionary/Dictionary";
import CustomCard from "../components/CustomCard";
import GrouDetails from "../resources/mapping/GrouDetails";
import TeamInfo from "../components/TeamInfo"
import {Grid} from '@mui/material';
const CardStyle={ 
  width: 360,
   height: 380,
  border: "2px solid var(--medium-green)",
  color:"grey",
  marginLeft:"20px",
  marginRight:"20px",
  image:{
    height: "55%",
     width:"58%",
      marginLeft:"20%" 
  }
}

const stylebutton={ 
  //  width: '100%',
  marginTop: '-90px',  // Adjust vertical positioning as needed
  marginLeft: '100px',
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


  return (
    <div>
      <PageContainer >
        <div><p className={classes.ARE}>{dict.TitleWhoWeAre}</p></div>
        <div>
          <p className={classes.ARE}>{dict.MeetTeam}</p>
        </div> 
        <Grid item xs={12} sm={6} md={4}>
        <div className={classes.team}>
        
          <CustomCard
          style={CardStyle}
           title={teamDetails.Danielle.my_Name}
           description={teamDetails.Danielle.about_me}
           image={teamDetails.Danielle.image_link}
           bottomIcons={BottomIcons(teamDetails.Danielle.linkedinUrl,teamDetails.Danielle.emailUrl,teamDetails.Danielle.facebookUrl,stylebutton)}

            
           />
           <CustomCard
           style={CardStyle}
           title={teamDetails.Hadar.my_Name}
           description={teamDetails.Hadar.about_me}
           image={teamDetails.Hadar.image_link}
           bottomIcons={BottomIcons(teamDetails.Hadar.linkedinUrl,teamDetails.Hadar.emailUrl,teamDetails.Hadar.facebookUrl,stylebutton)}
            
            // <TeamInfo 
            // linkedinUrl={teamDetails.Hadar.linkedinUrl} 
            // emailUrl={teamDetails.Hadar.emailUrl}  
            // facebookUrl={teamDetails.Hadar.facebookUrl} 
        // />
      

           />
           <CustomCard
           style={CardStyle}
           title={teamDetails.Lana.my_Name}
           description={teamDetails.Lana.about_me}
           image={teamDetails.Lana.image_link}
           bottomIcons={BottomIcons(teamDetails.Lana.linkedinUrl,teamDetails.Lana.emailUrl,teamDetails.Lana.facebookUrl,stylebutton)}



           />
           <CustomCard
           style={CardStyle}
           title={teamDetails.Shachar.my_Name}
           description={teamDetails.Shachar.about_me}
           image={teamDetails.Shachar.image_link}
           bottomIcons={BottomIcons(teamDetails.Shachar.linkedinUrl,teamDetails.Shachar.emailUrl,teamDetails.Shachar.facebookUrl,stylebutton)}
        
           />
            </div>
           </Grid>
          
      </PageContainer>

    </div> 
  );
}

export default AboutUs;
