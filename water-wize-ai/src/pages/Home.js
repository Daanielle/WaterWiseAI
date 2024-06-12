import PageContainer from "../components/PageContainer";
import CustomButton from "../components/CustomButton";
import React, { useState } from "react";
import RegisterForm from "../components/RegisterForm";
// import classes from "../styles/Register_and_Login.css";
import classes from "../styles/Home.module.css";

function Home() {
  return (
    <PageContainer>
      <h1>Home</h1>
      {/* <div className={classes.home_style}>
        {currentForm === "login" ? (
          <LogInForm onFormSwitch={toggleForm} />
        ) : (
          <RegisterForm onFormSwitch={toggleForm} />
        )}
      </div> */}
    </PageContainer>
  );
}

export default Home;
