import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import PageContainer from "../components/PageContainer";
import "../ContactUs.css"; // Import the CSS file
import CustomButton from "../components/CustomButton";
import TitleButton from "../components/TitleButton";
import ContainerBox from '../components/ContainerBox';
import { Box } from "@mui/material";
import useDictionary from "../resources/Dictionary/Dictionary";
import InputField from '../components/inputs/InputField';
import  { useState } from "react";


 const ContactUs = () => {
  const dict = useDictionary();
  // const form = useRef();
  const [selectedName, setSelectedName] = useState('');
  const [selectedEmail, setSelectedEmail] = useState('');
  const [selectedMessage, setSelectedMessage] = useState('');
  const form = useRef();
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    message: ''
  });

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleNameChange = (newValue) => {
    setSelectedName(newValue);
  };

  const handleEmailChange = (newValue) => {
    setSelectedEmail(newValue);

  };

  const handleMessageChange = (newValue) => {
    setSelectedMessage(newValue);
  };


  const sendEmail = (e) => {
    e.preventDefault();

    const templateParams = {
      user_name: selectedName,
      user_email: selectedEmail,
      message: selectedMessage,
    };


    console.log('Sending email with params:', templateParams);
    emailjs
      .sendForm('service_9wpkekd', 'template_bem1owy',form.current,{
        publicKey: 'D5FWWX57AkcDUP2o8',
      })
      .then(
        (response) => {
          console.log('SUCCESS!', response);
        },
        (error) => {
          console.log('FAILED...', error);
        },
      );
  };

 

  return (
    <PageContainer
    children={
      <Box
       sx={{
        width: '200vw',
        display: 'flex',
        justifyContent: 'center',
       
      }}
  >
    <div />
     <ContainerBox sx={{border: "2px solid var(--primary-color)",}}>
     <TitleButton >{dict.contuctUs}</TitleButton>
      <div className="contact-form">
        <form ref={form} onSubmit={sendEmail}>
          {/* <InputField label={dict.name} type="text" value={selectedName} onValueChange={handleNameChange} name="user_name"  />
          <InputField label={dict.email} type="text" value={selectedEmail} onValueChange={handleEmailChange} name="user_email"  />
          <InputField label={dict.message} type="text" value={selectedMessage} onValueChange={handleMessageChange} name="message" multiline  rows={4}/> */}
                <label>Name</label>
      <input type="text" name="user_name" />
      <label>Email</label>
      <input type="email" name="user_email" />
      <label>Message</label>
      <textarea name="message" />

          <CustomButton label={dict.sendMessage} type="submit" value="Send" />
        </form>

{/* <form ref={form} onSubmit={sendEmail}>
      <InputField
        name="user_name"
        label="Name"
        value={formData.user_name}
        onValueChange={(value) => handleInputChange('user_name', value)}
        type="text"
      />
      <InputField
        name="user_email"
        label="Email"
        value={formData.user_email}
        onValueChange={(value) => handleInputChange('user_email', value)}
        type="email"
      />
      <InputField
        name="message"
        label="Message"
        value={formData.message}
        onValueChange={(value) => handleInputChange('message', value)}
        multiline
        rows={4}
      />
      <input type="submit" value="Send" />
    </form>
 */}
      </div>
      </ContainerBox>
</Box>
    }

   >

    </PageContainer>
  );


};

export default ContactUs;
