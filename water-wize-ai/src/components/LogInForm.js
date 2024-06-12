import React, { useState, useContext } from "react";
import { AuthContext } from '../AuthContext';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CustomButton from "../components/CustomButton";
import TitleButton from "../components/TitleButton";
import useDictionary from "../resources/Dictionary/Dictionary";


const LogInButton = {
  color: "#4c784f",
  width: "70%",
  height: "45px",
  background: "#bef5dc",
  border: "none",
  outline: "none",
  borderRradius: "40px",
  boxShadow: "0 0 10px #4c784f",
  cursor: "pointer",
  fontSize: '16px',
  fontWeight: "700",
};

const titleButton={
  fontStyle: "italic",
  /* font-size: larger; */
  color:"#bef5dc"
 
};

const LogIn = (props) => {
  const dict = useDictionary();
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
    <div className="register_and_login">
      <form className="Login_Form" onSubmit={handleSubmit}>
      <TitleButton label={dict.LogIn} style={titleButton}></TitleButton>
        <div>
          <input className={dict.stylePage} value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="youremail@gmail.com" id="email" name="email" required></input>
        </div>
        <div>
          <input className={dict.stylePage} value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder={dict.password} id="password" name="password" required></input>
        </div>
        <div className="Forgot_link">
          <a href="#">{dict.forgetpassword}</a>
        </div>
        <div>
          {/* <button className="my_button" type="Submit">Log in</button> */}
          <CustomButton label={dict.Login} type="Submit" style={LogInButton}/>
        </div>
        <div>
          <Link to="/Register">
            <p className="Register_link">{dict.Donthaveanaccount} <a href="#"> {dict.Register}</a></p>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LogIn;
