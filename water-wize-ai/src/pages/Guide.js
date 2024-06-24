import React, { useState } from 'react';
import "../styles/Guide.css"; // Import the CSS file for styling
import { Container, Typography, Grid, Paper, Box, Accordion, AccordionSummary, AccordionDetails, Card, CardContent, CardMedia, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PageContainer from '../components/PageContainer'
import CustomButton from "../components/CustomButton";
import TitleButton from "../components/TitleButton"
import useDictionary from "../resources/Dictionary/Dictionary";

// Import image files
import MOPCenterImg from '../resources/images/MOPCenter.png';
import KarkaIMG from '../resources/images/Karka.jpg';
import imsLogoImg from '../resources/images/IMS.jpg';
import govmapIMG from "../resources/images/govmapIMG.jpeg";
import SouthernIMG from "../resources/images/SouthernArava.png";
import MappingIMG from "../resources/images/MappingSite.png"
import CustomCard from '../components/CustomCard';
const CardStyle={ 
  //width: 250,
   height: 400,
  border: "2px solid var(--medium-green)",
  color:"grey",
  minHeight: 180,
  //marginLeft:"20px",
  //marginRight:"20px",
  //minHeight: 180,
 image:{
  height: 140
 }


}
const CardStyleExlain={ 
  //width: 250,
   height: 130,
  border: "2px solid var(--medium-green)",
  color:"grey",
  //marginLeft:"20px",
  //marginRight:"20px",
  //minHeight: 180,
}


const stylebutton={ 
     justifyContent: 'center',
      width: '100%',
  paddingBottom:"0px" }

const BottomIcons=(link)=>(
  <Button
size="small"
color="primary"
href={link}
target="_blank"
rel="noopener noreferrer"
style={stylebutton}
>
Read More
</Button>
)


const faqData = [
  {
    question: "How do I use the water calculator?",
    answer: "The water calculator is designed to help you estimate the amount of water needed for your plants. You simply need to input the relevant parameters and the calculator will provide a recommendation."
  },
  {
    question: "What factors does the water calculator consider?",
    answer: "The water calculator takes into account factors such as temperature, humidity, wind speed, and solar radiation to provide accurate recommendations."
  }
];

const resources = [
  {
    title: "Central and Northern ARAVA R&D",
    summary: "Research and Development in the Arava was established in 1986, as part of the Negev Arava R&D, with the aim of serving the development needs of the settlement in preferred areas along Israel's borders in the Negev and Arava.",
    imageUrl: MOPCenterImg, // Use the imported image variable
    link: "http://agri.arava.co.il/"
  },
  {
    title: "Research and scientific articles about soil and water",
    summary: "The goals of the Arava R&D agricultural are to develop and research irrigation interfaces that will ensure agricultural sustainability in the southern Arava, while preserving environmental resources, and to reach technological developments in the science of irrigation.",
    imageUrl: KarkaIMG, // Use the imported image variable
    link: "https://aravard.org.il/%D7%9E%D7%97%D7%A7%D7%A8%D7%99%D7%9D/"
  },
  {
    title: "Israel Meteorological Service (IMS)",
    summary: "A unit of the Israeli Ministry of Transportation responsible for forecasting weather, meteorological data, and climate research in Israel. Provides accurate and reliable meteorological information.",
    imageUrl: imsLogoImg, // Use the imported image variable
    link: "https://ims.gov.il/en"
  },
  {
    title: "Govmap",
    summary: "The official map site of the State of Israel. Enables: various searches such as address, block/plot, viewing information layers on a variety of topics, map sharing capabilities, creating personal information layers and more.",
    imageUrl: govmapIMG, // Use the imported image variable
    link: "https://www.govmap.gov.il/?c=176414.17,648081.48&z=0"
  },
  {
    title: "Southern ARAVA R&D",
    summary: "Southern Arava R&D is located near Kibbutz Yotvata in the Southern Arava and centers extensive agricultural research activities in a variety of fields such as: soil and water, post-harvest fruit handling, orchards, flowers and ornamental plants, vegetables, plant protection, animals and agrotechnics.",
    imageUrl: SouthernIMG, // Use the imported image variable
    link: "https://aravard.org.il/"
  },
  {
    title: "Web Mapping Application Of Agricultural Plots",
    summary: "This map shows the mapping of agricultural plots in the State of Israel. The map allows the identification of an agricultural plot according to its identification number.",
    imageUrl: MappingIMG, // Use the imported image variable
    link: "https://data1-moag.opendata.arcgis.com/apps/deb443ad1b1f44a2baa74a4880d0ec27/explore"
  }
];

const screenExplanations = [
  { screen: "Home", explanation: "The Home screen allows users to register and log in to the application." },
  { screen: "About Us", explanation: "The About Us screen provides background information about the project developers." },
  { screen: "Contact Us", explanation: "The Contact Us screen lets users reach out to the project developers." },
  { screen: "Water Calculator", explanation: "The Water Calculator screen helps users estimate the water needs for their plants based on various parameters." },
  { screen: "Forum", explanation: "The Forum screen allows users to ask questions and engage in discussions." }
];

const Guide = () => {
  const dict = useDictionary();
  return (
    <PageContainer>
      <Container sx={{ backgroundColor: ' var(--extra-white)', padding: '2rem' }}>
        <Typography variant="h3" gutterBottom align="center" color="var(--medium-green)">{dict.support}</Typography>

        {/* FAQ Section */}
        <Box mb={4}>
          <Typography variant="h4" gutterBottom>FAQ</Typography>
          {faqData.map((faq, index) => (
            <Accordion key={index}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>

         {/* Resources & Tools Section */}

         <Box mb={4}>
          <Typography variant="h4"  gutterBottom>Resources & Tools</Typography>
          <Grid container spacing={2}>
            {resources.map((resource, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
               
                <CustomCard
                style={CardStyle}
                title={resource.title}
                description={resource.summary}
                image={resource.imageUrl}
                 bottomIcons={BottomIcons(resource.link)}
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Screen Explanations Section */}
        <Box mb={4}>
          <Typography variant="h4" gutterBottom>Screen Explanations</Typography>
          <Grid container spacing={2}>
            {screenExplanations.map((screen, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                {/*<Card sx={{ height: 130 }}>
                  <CardContent>
                    <Typography variant="h5" component="div">{screen.screen}</Typography>
                    <Typography variant="body2" color="text.secondary">{screen.explanation}</Typography>
                  </CardContent>
                </Card> */}
                <CustomCard
                style={CardStyleExlain}
                title={screen.screen}
                description={screen.explanation}
                />

              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Video Section */}
        <Box mb={4}>
          <Typography variant="h4" gutterBottom>Water Calculator Demonstration</Typography>
          <Paper>
            <Box p={2}>
              <iframe width="100%" height="400" src="https://www.youtube.com/embed/your-video-id" title="Water Calculator Demonstration" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </Box>
          </Paper>
        </Box>
      </Container>
    </PageContainer>
  );
};

export default Guide;