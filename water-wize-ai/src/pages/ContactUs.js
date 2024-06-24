import React, { useState } from 'react';
import PageContainer from "../components/PageContainer";
import "../ContactUs.css"; // Import the CSS file
import CustomButton from "../components/CustomButton";
import TitleButton from "../components/TitleButton";
import useDictionary from "../resources/Dictionary/Dictionary";
import ContainerBox from '../components/ContainerBox';
import contacuUsLogoImg from '../resources/images/ContactUs.jpg';
import { Box } from "@mui/material";


function ContactUs() {
  const dict = useDictionary();
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        // Message sent successfully
        console.log('Message sent successfully');
      } else {
        // Error handling
        console.error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <PageContainer
    children={
      <Box
       sx={{
      //   backgroundImage: `url(${contacuUsLogoImg})`,
      //   backgroundSize: 'cover',
      //   backgroundPosition: 'center',
        // height: '100vh',
        width: '100vw',
        display: 'flex',
      //   alignItems: 'center',
        justifyContent: 'center',
      //   marginTop:"-88px",
      //   marginBottom:"-88px"
      }}
  >
     <ContainerBox>
     <TitleButton >{dict.contuctUs}</TitleButton>
      <div className="contact-form">
      {/* <TitleButton >{dict.contuctUs}</TitleButton> */}
        <form onSubmit={handleSubmit}>
          <label>{dict.name}</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          <label>{dict.position}</label>
          <input type="text" name="position" value={formData.position} onChange={handleChange} required />
          <label>{dict.message}</label>
          <textarea name="message" value={formData.message} onChange={handleChange} required maxLength={500} />
          <CustomButton label={dict.sendMessage} type="submit" />
        </form>
      </div>
      </ContainerBox>
</Box>
    }

   >

    </PageContainer>
  );
}

export default ContactUs;
