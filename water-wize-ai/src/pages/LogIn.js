import React, { useState, useContext } from "react";
import { AuthContext } from '../AuthContext';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import FieldInput from "../components/imputs/FieldInput";
import PageContainer from "../components/PageContainer";
import ContainerBox from '../components/ContainerBox';

import CustomButton from "../components/CustomButton";

function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginResponse = await fetch("/users/login", {
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
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <PageContainer>
      <ContainerBox >
        <form onSubmit={handleSubmit}>
          <h1>LogIn</h1>
          <FieldInput label="Email" value={email} onValueChange={(e) => setEmail(e.target.value)} checkIfValid={() => true} error="" />
          <div>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="email" id="email" name="email" required></input>
          </div>
          <div>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" id="password" name="password" required></input>
          </div>
          <div>
            <a href="#">Forgot password?</a>
          </div>
          <div>
            <button type="Submit">Log in</button>
          </div>
          <div>
            <Link to="/Register">
              <p>Dont have an account? <a href="#"> Register</a></p>
            </Link>
          </div>
        </form>
      </ContainerBox>
    </PageContainer>
  );
}

export default LogIn;
