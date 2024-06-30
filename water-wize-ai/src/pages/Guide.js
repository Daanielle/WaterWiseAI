import React from 'react';
import "../styles/Guide.css"; // Import the CSS file for styling
import { Container, Typography, Grid, Paper, Box, Accordion, AccordionSummary, AccordionDetails, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PageContainer from '../components/PageContainer'
import useDictionary from "../resources/Dictionary/Dictionary";

// Import image files
import MOPCenterImg from '../resources/images/MOPCenter.png';
import KarkaIMG from '../resources/images/Karka.jpg';
import imsLogoImg from '../resources/images/IMS.jpg';
import govmapIMG from "../resources/images/govmapIMG.jpeg";
import SouthernIMG from "../resources/images/SouthernArava.png";
import MappingIMG from "../resources/images/MappingSite.png"
import CustomCard from '../components/CustomCard';


const Guide = () => {
  const dict = useDictionary();
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
{dict.GuideReadMore}
</Button>
)
  const screenExplanations = [
    { screen: dict.GuideHomeTitle, explanation: dict.GuideHomeExplanation },
    { screen: dict.GuideAboutUs, explanation: dict.GuideAboutUsExplanation },
    { screen: dict.GuideContactUs, explanation: dict.GuideContactExplanation },
    { screen: dict.GuideWaterCalculator, explanation: dict.GuideWCExplanation },
    { screen: dict.GuideForum, explanation: dict.GuideForumExplanation }
  ];
  const faqData = [
    {
      question: dict.GuideFaq1Title,
      answer: dict.GuideFaq1Ans
    },
    {
      question: dict.GuideFaq2Title,
      answer: dict.GuideFaq2Ans
    }
  ];
  
  const resources = [
    {
      title: dict.GuideAravaCenter,
      summary: dict.GuideCenterAravaDesc,
      imageUrl: MOPCenterImg, // Use the imported image variable
      link: "http://agri.arava.co.il/"
    },
    {
      title: dict.GuideResearch,
      summary: dict.GuideResearchDesc,
      imageUrl: KarkaIMG, // Use the imported image variable
      link: "https://aravard.org.il/%D7%9E%D7%97%D7%A7%D7%A8%D7%99%D7%9D/"
    },
    {
      title: dict.GuideIMS,
      summary: dict.GuideIMSDesc,
      imageUrl: imsLogoImg, // Use the imported image variable
      link: "https://ims.gov.il/en"
    },
    {
      title: dict.GuideGovMap,
      summary: dict.GuideGovDesc,
      imageUrl: govmapIMG, // Use the imported image variable
      link: "https://www.govmap.gov.il/?c=176414.17,648081.48&z=0"
    },
    {
      title: dict.GuideSouthernArava,
      summary: dict.GuideSouthernAravaDesc,
      imageUrl: SouthernIMG, // Use the imported image variable
      link: "https://aravard.org.il/"
    },
    {
      title: dict.GuideWebMap,
      summary: dict.GuideWebDesc,
      imageUrl: MappingIMG, // Use the imported image variable
      link: "https://data1-moag.opendata.arcgis.com/apps/deb443ad1b1f44a2baa74a4880d0ec27/explore"
    }
  ];  
  return (
    <PageContainer>
      <Container sx={{ backgroundColor: ' var(--extra-white)', padding: '2rem' }}>
        <Typography variant="h3" gutterBottom align="center" color="var(--medium-green)">{dict.support}</Typography>

        {/* FAQ Section */}
        <Box mb={4}>
          <Typography variant="h4" gutterBottom>{dict.GuideFAQ}</Typography>
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
          <Typography variant="h4"  gutterBottom>{dict.GuideResourcesAndTools}</Typography>
          <Grid container spacing={2}>
            {resources.map((resource, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
               
                <CustomCard sx={{width:370,height: 400,minHeight: 180,image:{height: 140}}}
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
          <Typography variant="h4" gutterBottom>{dict.GuideScreenExplanations}</Typography>
          <Grid container spacing={2}>
            {screenExplanations.map((screen, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <CustomCard
                sx={{width:300, height: 130,image:{height: 140}}}
                title={screen.screen}
                description={screen.explanation}
                />

              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Video Section */}
        <Box mb={4}>
          <Typography variant="h4" gutterBottom>{dict.GuideDemonstration}</Typography>
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