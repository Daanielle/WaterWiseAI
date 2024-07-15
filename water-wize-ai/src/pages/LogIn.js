import React, { useState, useContext } from "react";
import { AuthContext } from '../AuthContext';
import { useNavigate } from "react-router-dom";
import InputField from "../components/inputs/InputField";
import PageContainer from "../components/PageContainer";
import ContainerBox from '../components/ContainerBox';
import CustomButton from "../components/CustomButton";
import useDictionary from "../resources/Dictionary/Dictionary";
import TitleButton from "../components/TitleButton"

const titleButton = {
  fontStyle: "italic",
  color: "var(--medium-green)",
};

function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const dict = useDictionary();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!email || !password){
      setError(dict.errorFields)
      return
    }
    try {
      const loginResponse = await fetch('/users/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "email": email,
          "password": password
        }),
      });
      if (!loginResponse.ok) {
        const errorData = await loginResponse.json();
        throw new Error(errorData.message || 'Login failed!');
      }
      const data = await loginResponse.json(); // Parse the JSON response
      login(data);
      navigate("/");
    } catch (err) {
      switch(err.message){
        case 'email':
          setError(dict.errorEmailNotExists);
          break;
        case 'password':
          setError(dict.errorWrongPass);
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
          <TitleButton style={titleButton}>{dict.LogIn}</TitleButton>
          <InputField label={dict.email} value={email} onValueChange={setEmail} checkIfValid={() => true} error="" />
          <InputField label={dict.password} value={password} type="password" onValueChange={setPassword} checkIfValid={() => true} error="" />
          <CustomButton type="Submit" label={dict.Login} />
          {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '10%' }}>
            {/* <CustomButton type="button" label={dict.forgetpassword} to="/Register" style={{ width: '35%' }} secondary /> */}
            <CustomButton type="button" label={dict.forgetpassword} to="/ForgetPass" style={{ width: '35%' }} secondary />
            <CustomButton type="button" label={dict.Register} to="/Register" style={{ width: '35%' }} secondary />
          </div>
        </ContainerBox>
      </form>
    </PageContainer>
  );
}

export default LogIn;
