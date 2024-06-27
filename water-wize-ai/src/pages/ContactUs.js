import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import PageContainer from "../components/PageContainer";
import "../ContactUs.css"; // Import the CSS file
import CustomButton from "../components/CustomButton";
import TitleButton from "../components/TitleButton";
import ContainerBox from '../components/ContainerBox';
import { Box } from "@mui/material";
import useDictionary from "../resources/Dictionary/Dictionary";



 const ContactUs = () => {
  const dict = useDictionary();
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_9wpkekd', 'template_bem1owy', form.current, {
        publicKey: 'D5FWWX57AkcDUP2o8',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
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
          <label>{dict.name}</label>
          <input type="text" name="user_name"  />
          <label>{dict.email}</label>
          <input type="text" name="user_email"/>
          <label>{dict.message}</label>
          <textarea name="message" maxLength={500} />
          <CustomButton label={dict.sendMessage} type="submit" value="Send" />
        </form>
      </div>
      </ContainerBox>
</Box>
    }

   >

    </PageContainer>
  );


};

export default ContactUs;
