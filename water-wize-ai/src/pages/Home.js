import PageContainer from "../components/PageContainer";
import CustomButton from "../components/CustomButton";
import React from "react";
import { Box, Grid } from "@mui/material";
import ContainerBox from "../components/ContainerBox";
import leafpalm from "../resources/images/LeafPalmRight.png"
import leafpalmLeft from "../resources/images/LeafPalmLeft.png";
// import leafpalm from "../resources/images/LeafPalmRight.jpg"
// import leafpalmLeft from "../resources/images/LeafPalmLeft.jpg";
import useDictionary from "../resources/Dictionary/Dictionary";

const containerStyle = {
  position: 'absolute',
  top: '100px', // Adjust as needed
  right: '10px', // Adjust as needed
  zIndex: 10, // Ensures the div is in the front
  width: '600px', // Adjust as needed
  height: '420px', // Adjust as needed
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
  const dict = useDictionary();
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
            <div><h1 style={{ fontStyle: "italic", color: "var(--medium-green)" }} >{dict.HomeWW}</h1></div>


            {dict.stylePage === 'right' ? (
              <Grid container spacing={4} >
                <Grid item xs={5}>
                </Grid>
                <Grid item sx={{ paddingRight: "80px" }} xs={7}>{dict.HomeText1}</Grid>
                <Grid item xs={7}>{dict.HomeText2}</Grid>
                <Grid item xs={5}>

                </Grid>
                <Grid item xs={3} >
                </Grid>
                <Grid item xs={6} justifyContent="center" style={{ marginTop: '40px' }}>
                  {dict.HomeText3}
                  <CustomButton label={dict.HomeSaveWater} to={"/WaterCalculator"} type="button" />
                </Grid>
                <Grid item xs={3}>
                </Grid>
              </Grid>


            ) : (
              <Grid container spacing={4}>
                <Grid item xs={7}>
                  {dict.HomeText1}
                </Grid>
                <Grid item xs={5}></Grid>
                <Grid item xs={5}></Grid>
                <Grid item xs={7}>
                  {dict.HomeText2}
                </Grid>
                <Grid item xs={3} >
                </Grid>
                <Grid item xs={6} justifyContent="center" style={{ marginTop: '40px' }}>
                  {dict.HomeText3}
                  <CustomButton label={dict.HomeSaveWater} to={"/WaterCalculator"} type="button" />
                </Grid>
                <Grid item xs={3}>
                </Grid>
              </Grid>

            )}







            {/* <Grid container spacing={4}>
              <Grid item xs={7}>
                {dict.HomeText1}
              </Grid>
              <Grid item xs={5}></Grid>
              <Grid item xs={5}></Grid>
              <Grid item xs={7}>
                {dict.HomeText2}
              </Grid>
              <Grid item xs={3} >
              </Grid>
              <Grid item xs={6} justifyContent="center" style={{ marginTop: '40px' }}>
                {dict.HomeText3}
                <CustomButton label={dict.HomeSaveWater} to={"/WaterCalculator"} type="button" />
              </Grid>
              <Grid item xs={3}>
              </Grid>
            </Grid> */}
          </ContainerBox>
        </Box>

      }>


    </PageContainer>
  );
}

export default Home;
