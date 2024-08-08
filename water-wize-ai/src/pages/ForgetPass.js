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
import emailjs from "@emailjs/browser";

const titleButton = {
  fontStyle: "italic",
  color: "var(--medium-green)",
};

function ForgetPass() {
    const [email, setEmail] = useState('');
    const dict = useDictionary();
    const [error, setError] = useState('');
    const navigate = useNavigate();



    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!email){
          setError(dict.errorFields)
          return
        }

        try {
          const loginResponse = await fetch('/users/check-email-token', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              "email": email,
            }),
          });
          if (!loginResponse.ok) {
            const errorData = await loginResponse.json();
            throw new Error(errorData.message || 'Login failed!');
          }
          const data = await loginResponse.json(); // Parse the JSON response
          console.log(data.emailToken);
          const token = data.emailToken;

          if (token) {
            
            const templateParams = {
                user_email: email,
                reset_link: `https://waterwizeai.cs.bgu.ac.il/password-reset/${token}`,  // Your reset link
              };
        
              const dataaa =await emailjs.send('service_9wpkekd', 'template_4ae19uw', templateParams, 'D5FWWX57AkcDUP2o8');
              console.log(dataaa);
    
        } else {
            throw new Error('Token not found in the response');
          }
    
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
          <InputField label={dict.email} value={email} onValueChange={setEmail} checkIfValid={() => true} error="" />
          <CustomButton type="Submit" label={dict.ResetPass} />
          {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
        </ContainerBox>
      </form>

    </PageContainer>
  );
}

export default ForgetPass;
