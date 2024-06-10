import React, { useState } from 'react';
import "../styles/Guide.css"; // Import the CSS file for styling
import { Container, Typography, Grid, Paper, Box, Accordion, AccordionSummary, AccordionDetails, Card, CardContent, CardMedia, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
    title: "Understanding Your Plant's Water Needs", 
    summary: "A comprehensive guide to understanding the water requirements of different plants.", 
    imageUrl: "https://via.placeholder.com/150", 
    link: "https://example.com/article1"
  },
  { 
    title: "Efficient Watering Techniques", 
    summary: "Learn about efficient watering techniques to save water and promote plant health.", 
    imageUrl: "https://via.placeholder.com/150", 
    link: "https://example.com/article2"
  },
  { 
    title: "Israel Meteorological Service (IMS)", 
    summary: "A unit of the Israeli Ministry of Transportation responsible for forecasting weather, meteorological data, and climate research in Israel.", 
    imageUrl: "../resources/images/IMS.jpg", // Adjust the image path as necessary
    link: "https://ims.gov.il/en"
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
  return (
    <Container sx={{ backgroundColor: '#e8f5e9', padding: '2rem' }}>
      <Typography variant="h3" gutterBottom align="center" color="primary">Support and Guidance</Typography>
      
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
        <Typography variant="h4" gutterBottom>Resources & Tools</Typography>
        <Grid container spacing={2}>
          {resources.map((resource, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={resource.imageUrl}
                  alt={resource.title}
                />
                <CardContent>
                  <Typography variant="h5" component="div">{resource.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{resource.summary}</Typography>
                </CardContent>
                <Button size="small" color="primary" href={resource.link}>
                  Read More
                </Button>
              </Card>
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
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">{screen.screen}</Typography>
                  <Typography variant="body2" color="text.secondary">{screen.explanation}</Typography>
                </CardContent>
              </Card>
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
  );
};

export default Guide;
