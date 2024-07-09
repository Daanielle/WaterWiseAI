// AboutUs.js
import React from "react";
import classes from "../styles/AboutUs.module.css";
import PageContainer from "../components/PageContainer";
import useDictionary from "../resources/Dictionary/Dictionary";
import CustomCard from "../components/CustomCard";
import GrouDetails from "../resources/mapping/GrouDetails";
import TeamInfo from "../components/TeamInfo";
import { Grid } from "@mui/material";
import ContainerBox from "../components/ContainerBox"

const stylebutton = {
  marginTop: "-10px", // Adjust vertical positioning as needed
  //marginLeft: '85px',
};

// const BottomIcons=(linkedIn,email,facebook, style)=>(
const BottomIcons = (linkedIn, email, style) => (
  <TeamInfo
    linkedinUrl={linkedIn}
    emailUrl={email}
    // facebookUrl={facebook}
    style={style}
  />
);
function AboutUs() {
  const dict = useDictionary();
  const teamDetails = GrouDetails();
  const keys = Object.keys(teamDetails);

  return (
    <div>
      <PageContainer>
        {dict.stylePage=='left'?(

        
        <div>
        <ContainerBox sx={{ marginLeft:"5%", backgroundColor: "white", width: "90%", padding: '2rem', border: "2px solid var(--medium-green)" }}>

          <p className={classes.Title}>{dict.OurTeam}</p>
          <p className={classes.DescriptionEng}>{dict.OurTeamExp}</p>

          <Grid item xs={12} sm={6} md={4}>
            <div className={classes.team}>
              {keys.slice().map((key, index) => (
                <div key={index}>
                  {key && teamDetails[key] && (
                    <CustomCard
                      sx={{
                        width: 260,
                        height: 240,
                        marginLeft: "20px",
                        image: {
                          width: 150,
                          height: 140,
                          borderRadius: "2%",
                          marginLeft: "20%",
                          marginTop: "2%",
                        },
                      }}
                      title={teamDetails[key].my_Name}
                      // description={ teamDetails[key].about_me}
                      image={teamDetails[key].image_link}
                      bottomIcons={BottomIcons(
                        teamDetails[key].linkedinUrl,
                        teamDetails[key].emailUrl,
                        stylebutton
                      )}
                    />
                  )}
                </div>
              ))}
            </div>
          </Grid>
          <p className={classes.Title}>{dict.OurMission}</p>
          <p className={classes.DescriptionEng}>{dict.OurMessionExp}</p>
          <p className={classes.Title}>{dict.OurSolution}</p>
          <p className={classes.DescriptionEng}>{dict.OurSolutionExp}</p>
          <p className={classes.Title}>{dict.JoinUs}</p>
          <p className={classes.DescriptionEng}>{dict.JoinUsExp}</p>
        </ContainerBox>
        </div>
        ):(
                  
        <div>
                  <ContainerBox sx={{ marginLeft:"5%", backgroundColor: "white", width: "90%", padding: '2rem', border: "2px solid var(--medium-green)" }}>

        <p className={classes.Title}>{dict.OurTeam}</p>
        <p className={classes.DescriptionHeb}>{dict.OurTeamExp}</p>

        <Grid item xs={12} sm={6} md={4}>
          <div className={classes.team}>
            {keys.slice().map((key, index) => (
              <div key={index}>
                {key && teamDetails[key] && (
                  <CustomCard
                    sx={{
                      width: 260,
                      height: 240,
                      marginLeft: "20px",
                      image: {
                        width: 150,
                        height: 140,
                        borderRadius: "2%",
                        marginLeft: "20%",
                        marginTop: "2%",
                      },
                    }}
                    title={teamDetails[key].my_Name}
                    // description={ teamDetails[key].about_me}
                    image={teamDetails[key].image_link}
                    bottomIcons={BottomIcons(
                      teamDetails[key].linkedinUrl,
                      teamDetails[key].emailUrl,
                      stylebutton
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </Grid>
        <p className={classes.Title}>{dict.OurMission}</p>
        <p className={classes.DescriptionHeb}>{dict.OurMessionExp}</p>
        <p className={classes.Title}>{dict.OurSolution}</p>
        <p className={classes.DescriptionHeb}>{dict.OurSolutionExp}</p>
        <p className={classes.Title}>{dict.JoinUs}</p>
        <p className={classes.DescriptionHeb}>{dict.JoinUsExp}</p>
        </ContainerBox>
      </div>
        )}
      </PageContainer>
    </div>
  );
}

export default AboutUs;
