import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/inputs/InputField";
import PageContainer from "../components/PageContainer";
import ContainerBox from "../components/ContainerBox";
import CustomButton from "../components/CustomButton";
import useDictionary from "../resources/Dictionary/Dictionary";
import { useParams } from "react-router-dom";
import CustomSnackbar from "../components/CustomSnackbar";
import { isValidPassword } from "../resources/validations";
import TitleButton from "../components/TitleButton";
import sendEmail from "../resources/images/SendEmail.png";

const titleButton = {
  fontStyle: "italic",
  color: "var(--medium-green)",
};



function ForgetPass() {
  const dict = useDictionary();
  const navigate = useNavigate();
  const [newPass, setPass] = useState("");
  const [ConfirmPass, setConfirmPass] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const { token } = useParams();
  const [snackbar, setSnackBar] = useState(false);
  const [isValid, setIsValid] = useState({
    pass: false,
    confirmPass: false,
    equals: false,
  });

  const handlePasswordChange = (value) => {
    setPass(value);
  };

  const handleConfirmPasswordChange = (value) => {
    if (newPass === ConfirmPass) {
      handleValidationChange("equals", isValid);
    }
    return newPass === ConfirmPass;
  };

  const handleCloseSnackbar = () => {
    setSnackBar(false);
  };

  const handleValidationChange = (field, isValid) => {
    setIsValid((prev) => ({ ...prev, [field]: isValid }));
  };

  const isFormValid = () => {
    return Object.values(isValid).every((valid) => valid);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPass || !ConfirmPass) {
      setError(dict.errorFields);
      return;
    }

    try {
      const UpdatePassResponse = await fetch(`/users/password-reset/${token}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: newPass,
        }),
      });
      if (!UpdatePassResponse.ok) {
        const errorData = await UpdatePassResponse.json();
        throw new Error(errorData.message || "Updating Password failed!");
      }
      navigate(`/LogIn`);
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
      <form onSubmit={handleSubmit}>
        <ContainerBox
          sx={{ width: "700px", border: "2px solid var(--medium-green)" }}
        >
          <TitleButton style={titleButton}>{dict.ResetPass}</TitleButton>
          <InputField
            label={dict.newPass}
            value={newPass}
            onValueChange={handlePasswordChange}
            checkIfValid={isValidPassword}
            error={dict.errorPass}
            type="password"
            onValidChange={(isValid) => handleValidationChange("pass", isValid)}
          />
          <InputField
            label={dict.confirmPass}
            value={ConfirmPass}
            onValueChange={setConfirmPass}
            checkIfValid={handleConfirmPasswordChange}
            error=""
            onValidChange={(isValid) =>
              handleValidationChange("confirmPass", isValid)
            }
          />
          <CustomButton
            type="Submit"
            label={dict.ResetPass}
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
