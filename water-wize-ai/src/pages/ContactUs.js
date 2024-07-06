import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import PageContainer from "../components/PageContainer";
import "../ContactUs.css"; // Import the CSS file
import CustomButton from "../components/CustomButton";
import TitleButton from "../components/TitleButton";
import ContainerBox from "../components/ContainerBox";
import { Box } from "@mui/material";
import useDictionary from "../resources/Dictionary/Dictionary";
import InputField from "../components/inputs/InputField";
import CustomSnackbar from "../components/CustomSnackbar";

const ContactUs = () => {
  const dict = useDictionary();
  const form = useRef();
  const [snackbar, setSnackBar] = useState(false);
  const [msg, setMsg] = useState("")
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isValid, setIsValid] = useState({
    userName: false,
    userEmail: false,
    message: false,
  });

  const sendEmail = (e) => {
    e.preventDefault();

    // Collect form data
    const FromContent = {
      user_name: userName,
      user_email: userEmail,
      message: message,
    };

    emailjs
      .send("service_9wpkekd", "template_bem1owy", FromContent, "D5FWWX57AkcDUP2o8")
      .then(
        (response) => {
          console.log("SUCCESS!", response);
          setMsg(dict.successSentMessage)
          handleOpenSnackbar()
          setUserName("")
          setUserEmail("")
          setMessage("")
          handleValidationChange("userName", false)
          handleValidationChange("userEmail", false)
          handleValidationChange("message", false)

  
        },
        (error) => {
          console.log("FAILED...", error);
        }
      );
  };

  const handleValidationChange = (field, isValid) => {
    setIsValid((prev) => ({ ...prev, [field]: isValid }));
  };

  const isFormValid = () => {
    return Object.values(isValid).every((valid) => valid);
  };

  const handleCloseSnackbar = () => {
    setSnackBar(false);
  };

  const handleOpenSnackbar = () => {
    setSnackBar(true);
  };

  return (
    <PageContainer>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ContainerBox sx={{ border: "2px solid var(--primary-color)" }}>
          <TitleButton>{dict.contuctUs}</TitleButton>
            <form ref={form} onSubmit={sendEmail}>
              <InputField
                name="user_name"
                label={dict.name}
                value={userName}
                onValueChange={setUserName}
                checkIfValid={(value) => value.length > 0}
                error={dict.nameError}
                onValidChange={(isValid) => handleValidationChange("userName", isValid)}
              />
              <InputField
                name="user_email"
                label={dict.email}
                value={userEmail}
                onValueChange={setUserEmail}
                checkIfValid={(value) => /\S+@\S+\.\S+/.test(value)}
                error={dict.errorEmail}
                onValidChange={(isValid) => handleValidationChange("userEmail", isValid)}
              />
              <InputField
                name="message"
                label={dict.message}
                value={message}
                onValueChange={setMessage}
                checkIfValid={(value) => value.length > 0}
                error={dict.errorMessage}
                multiline
                rows={4}
                onValidChange={(isValid) => handleValidationChange("message", isValid)}
              />
              <CustomButton
                label={dict.sendMessage}
                type="submit"
                value="Send"
                disabled={!isFormValid()}
              />
            </form>
        </ContainerBox>
      </Box>
      <CustomSnackbar openSnackbar={snackbar} handleClose={handleCloseSnackbar} msg={msg} />

    </PageContainer>
  );
};

export default ContactUs;