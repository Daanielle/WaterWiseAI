import PageContainer from "../components/PageContainer";
import CustomButton from "../components/CustomButton";
import React, { useState } from "react";
import RegisterForm from "../components/RegisterForm";
// import classes from "../styles/Register_and_Login.css";

function LogIn() {
  return (
    <PageContainer>       
          <RegisterForm/>
    </PageContainer>
  );
}

export default LogIn;