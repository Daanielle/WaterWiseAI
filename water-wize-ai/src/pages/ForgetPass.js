import React, { useState } from "react";
import InputField from "../components/inputs/InputField";
import PageContainer from "../components/PageContainer";
import ContainerBox from "../components/ContainerBox";
import CustomButton from "../components/CustomButton";
import useDictionary from "../resources/Dictionary/Dictionary";
import emailjs from "@emailjs/browser";
import CustomSnackbar from "../components/CustomSnackbar";
import sendEmail from "../resources/images/SendEmail.png";


const containerStyleLeft = {
  position: 'absolute',
  bottom: '-110px', // Adjust as needed
  left: '-100px', // Adjust as needed
  zIndex: 10, // Ensures the div is in the front
  width: '700px', // Adjust as needed
  height: '700px', // Adjust as needed
  backgroundImage: `url(${sendEmail})`,
  backgroundSize: 'cover', // Cover the entire div
  backgroundPosition: 'center', // Center the image
};

function ForgetPass() {
  const dict = useDictionary();
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [snackbar, setSnackBar] = useState(false);
  const [isValid, setIsValid] = useState({
    email: false,
  });

  const handleCloseSnackbar = () => {
    setSnackBar(false);
  };
  const handleValidationChange = (field, isValid) => {
    setIsValid((prev) => ({ ...prev, [field]: isValid }));
  };

  const isFormValid = () => {
    return Object.values(isValid).every((valid) => valid);
  };

  const handleOpenSnackbar = () => {
    setSnackBar(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const CheckEmailResponse = await fetch("/users/check-email-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });
      if (!CheckEmailResponse.ok) {
        const errorData = await CheckEmailResponse.json();
        throw new Error(errorData.message || "Email failed!");
      }
      const data = await CheckEmailResponse.json(); // Parse the JSON response
      const token = data.emailToken;

      if (token) {
        const templateParams = {
          user_email: email,
          reset_link: `http://localhost:3000/password-reset/${token}`,
        };

        emailjs
          .send(
            "service_9wpkekd",
            "template_4ae19uw",
            templateParams,
            "D5FWWX57AkcDUP2o8"
          )
          .then(
            (response) => {
              handleOpenSnackbar();
              handleValidationChange("email", false);
              setMsg(dict.successSentEmailChangePass);
            },
            (error) => {
              console.log("FAILED...", error);
            }
          );
      } else {
        throw new Error("Token not found in the response");
      }
    } catch (err) {
      switch (err.message) {
        case "email":
          setError(dict.errorEmailNotExists);
          break;
        default:
          setError(dict.errorTryAgain);
      }
    }
  };

  return (
    <PageContainer>
            <div style={containerStyleLeft} />

      <form onSubmit={handleSubmit}>
        <ContainerBox
          sx={{ width: "700px", border: "2px solid var(--medium-green)" }}
        >
          <InputField
            label={dict.email}
            value={email}
            onValueChange={setEmail}
            checkIfValid={(value) => /\S+@\S+\.\S+/.test(value)}
            error={dict.errorEmail}
            onValidChange={(isValid) =>
              handleValidationChange("email", isValid)
            }
          />
          <CustomButton
            type="Submit"
            label={dict.CheckEmail}
            disabled={!isFormValid()}
          />
          {error && (
            <div style={{ color: "red", marginTop: "10px" }}>{error}</div>
          )}
        </ContainerBox>
      </form>
      <CustomSnackbar
        openSnackbar={snackbar}
        handleClose={handleCloseSnackbar}
        msg={msg}
      />
    </PageContainer>
  );
}

export default ForgetPass;
