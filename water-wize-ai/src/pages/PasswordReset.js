import React, { useState, useContext } from "react";
import { AuthContext } from '../AuthContext';
import { useNavigate } from "react-router-dom";
import InputField from "../components/inputs/InputField";
import PageContainer from "../components/PageContainer";
import ContainerBox from '../components/ContainerBox';
import CustomButton from "../components/CustomButton";
import useDictionary from "../resources/Dictionary/Dictionary";
import TitleButton from "../components/TitleButton"
import { useParams } from 'react-router-dom';

const titleButton = {
  fontStyle: "italic",
  color: "var(--medium-green)",
};

function ForgetPass() {
    // const [email, setEmail] = useState('');
    const [newPass, setPass] = useState('');
    const [ConfirmPass, setConfirmPass] = useState('');
    const dict = useDictionary();
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { token } = useParams();



    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!newPass || !ConfirmPass){
          setError(dict.errorFields)
          return
        }

        try {
          const loginResponse = await fetch(`/users/password-reset/${token}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              "password": newPass,
            }),
          });
          if (!loginResponse.ok) {
            console.log("ggggg");
            const errorData = await loginResponse.json();
            throw new Error(errorData.message || 'Login failed!');
          }
          const data = await loginResponse.json(); // Parse the JSON response
          console.log(data);
        //   const token = data.emailToken;
        //   if (token) {
            // Navigate to the password reset page with the token
            // window.location.href =`/password-reset/${token}`;
            navigate(`/LogIn`); 
        // } 
        // else {
        //     throw new Error('Token not found in the response');
        //   }
    
        } catch (err) {
          switch(err.message){
            case 'email':
              setError(dict.errorEmailNotExists);
              break;
            default:
              setError(dict.errorTryAgain);
          }
        }





      }
    
  return (
    <PageContainer>
            <form onSubmit={handleSubmit}>
        <ContainerBox sx={{ width: "700px", border: "2px solid var(--medium-green)", }} >
          {/* <TitleButton style={titleButton}>{dict.LogIn}</TitleButton> */}
          <InputField label="new password" value={newPass} onValueChange={setPass} checkIfValid={() => true} error="" />
          <InputField label="confirm password" value={ConfirmPass} onValueChange={setConfirmPass} checkIfValid={() => true} error="" />
          {/* <InputField label={dict.email} value={email} onValueChange={setEmail} checkIfValid={() => true} error="" /> */}
          <CustomButton type="Submit" label="Send New Password" />
          {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
        </ContainerBox>
      </form>

    </PageContainer>
  );
}

export default ForgetPass;
{/* <CustomButton type="button" label={dict.forgetpassword} to="/password-reset/:token" style={{ width: '35%' }} secondary /> */}
