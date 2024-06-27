import PageContainer from "../components/PageContainer";
import CustomButton from "../components/CustomButton";
import React, { useState } from "react";
import RegisterForm from "../components/RegisterForm";
// import classes from "../styles/Register_and_Login.css";
// import classes from "../styles/Home.module.css";
import { Box, Grid } from "@mui/material";
import irrigationImg from '../resources/images/irrigation.jpg';
import ContainerBox from "../components/ContainerBox";
import WaterCalculator from "./WaterCalculator";
import leafpalm from "../resources/images/LeafPalmRight.jpg"
import leafpalmLeft from "../resources/images/LeafPalmLeft.jpg"

const containerStyle = {
  position: 'absolute',
  top: '60px', // Adjust as needed
  right: '10px', // Adjust as needed
  zIndex: 10, // Ensures the div is in the front
  width: '500px', // Adjust as needed
  height: '500px', // Adjust as needed
  backgroundImage: `url(${leafpalm})`,
  backgroundSize: 'cover', // Cover the entire div
  backgroundPosition: 'center', // Center the image
};

const containerStyleLeft = {
  position: 'absolute',
  bottom: '-1px', // Adjust as needed
  left: '10px', // Adjust as needed
  zIndex: 10, // Ensures the div is in the front
  width: '500px', // Adjust as needed
  height: '500px', // Adjust as needed
  backgroundImage: `url(${leafpalmLeft})`,
  backgroundSize: 'cover', // Cover the entire div
  backgroundPosition: 'center', // Center the image
};

function Home() {
  return (
    <PageContainer
      children={
        <Box
          sx={{
            //   backgroundImage: `url(${imsLogoImg})`,
            //   backgroundSize: 'cover',
            // backgroundPosition: 'center',
            height: '70vh',
            width: '100vw',
            display: 'flex',
            // alignItems: 'center',
            justifyContent: 'center',
            border: "var(--medium-green)"
            //   marginTop:"-88px",
            //   marginBottom:"-88px"
          }}
        >

          <div style={containerStyle} />
          <div style={containerStyleLeft} />
          <ContainerBox
            sx={{ backgroundColor: "white", width: "60%", height: 640, border: "2px solid var(--medium-green)" }}>
            <div><h1 style={{ fontStyle: "italic", color: "var(--medium-green)" }} >Water Wise AI</h1></div>
            <Grid container spacing={4}>
              <Grid item xs={7}>
                The Water Wise AI system deals with calculating the amount of irrigation required for date crops in the Araba region in Israel. The system will use existing models and especially the Evapotranspiration formula in order to automatically calculate the irrigation needs of Tamari Majhol in the Araba.
              </Grid>
              <Grid item xs={5}></Grid>
              <Grid item xs={5}></Grid>
              <Grid item xs={7}>
                Our system offers a comprehensive solution by integrating factors and real-time data specifically adapted to the needs of growing dates in the Arava region, such as soil characteristics, crop coefficients and local weather data. This integration ensures that the farmers will receive the most accurate and practical insights for irrigation management, while addressing the specific challenges facing date farming with great precision and efficiency
              </Grid>
              <Grid item xs={3} >
              </Grid>
              <Grid item xs={6} justifyContent="center" style={{ marginTop: '40px' }}>
                "Join us today in harnessing the power of data to cultivate smarter, conserve better, and grow sustainably with Water Wise AI."
                <CustomButton label={"Start Saving Water"} to={"/WaterCalculator"} type="button" />
              </Grid>
              <Grid item xs={3}>
              </Grid>
            </Grid>
          </ContainerBox>
        </Box>

      }>


    </PageContainer>
  );
}

export default Home;
