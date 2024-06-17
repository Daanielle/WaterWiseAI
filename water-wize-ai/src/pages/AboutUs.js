// AboutUs.js
import React from "react";
import classes from "../styles/AboutUs.module.css";
import PageContainer from "../components/PageContainer";
import useDictionary from "../resources/Dictionary/Dictionary";
import CustomCard from "../components/CustomCard";
import GrouDetails from "../resources/mapping/GrouDetails";
import TeamInfo from "../components/TeamInfo"


const style={
  marginLeft:"10px"
}

function AboutUs() {
  const dict = useDictionary();
  const teamDetails = GrouDetails();


  return (
    <div>
      <PageContainer>
      {/* <div className={classes.back}>
          <p className={classes.WHO}>{dict.who}</p>
        </div>
        <div>
          <p className={classes.WE}>{dict.we}</p>
        </div>
        <div>
          <p className={classes.ARE}>{dict.are}</p>
        </div> */}
        <div className={classes.team}>
          <CustomCard
           title={teamDetails.Danielle.my_Name}
           description={teamDetails.Danielle.about_me}
           image={teamDetails.Danielle.image_link}
           bottomIcons={<TeamInfo 
            linkedinUrl={teamDetails.Danielle.linkedinUrl} 
            emailUrl={teamDetails.Danielle.emailUrl}  
            facebookUrl={teamDetails.Danielle.facebookUrl} 
        />}

           />
           <CustomCard
           title={teamDetails.Hadar.my_Name}
           description={teamDetails.Hadar.about_me}
           image={teamDetails.Hadar.image_link}
           bottomIcons={<TeamInfo 
            linkedinUrl={teamDetails.Hadar.linkedinUrl} 
            emailUrl={teamDetails.Hadar.emailUrl}  
            facebookUrl={teamDetails.Hadar.facebookUrl} 
        />}

           />
           <CustomCard
           title={teamDetails.Lana.my_Name}
           description={teamDetails.Lana.about_me}
           image={teamDetails.Lana.image_link}
           bottomIcons={<TeamInfo 
            linkedinUrl={teamDetails.Lana.linkedinUrl} 
            emailUrl={teamDetails.Lana.emailUrl}  
            facebookUrl={teamDetails.Lana.facebookUrl} 
        />}


           />
           <CustomCard
           title={teamDetails.Shachar.my_Name}
           description={teamDetails.Shachar.about_me}
           image={teamDetails.Shachar.image_link}
           bottomIcons={<TeamInfo 
            linkedinUrl={teamDetails.Shachar.linkedinUrl} 
            emailUrl={teamDetails.Shachar.emailUrl}  
            facebookUrl={teamDetails.Shachar.facebookUrl} 
        />}
        
           />
           </div>
      </PageContainer>

    </div> 
  );
}

export default AboutUs;
