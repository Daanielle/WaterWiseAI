import React, { useState } from "react";
import classes from "../styles/Register_and_Login.css";

const LogIn = (props) => {
  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');

  const handleSubmit = (e)=>{
    // e.preventDefault();
    console.log("l");
  }
    //newraw
  return (
    <div className="register_and_login">
      <form className="Login_Form" onSubmit={handleSubmit}>
        <h1 className="my_h1">LogIn</h1>
        <div>
            <input className="my_input" value={username} onChange={(e)=>setUsername(e.target.value)} type="text" placeholder="Username" id="username" name="username" required></input>
        </div>
        <div>
            <input className="my_input" value={pass} onChange={(e)=>setPass(e.target.value)} type="password" placeholder="Password" id="password" name="password" required></input>
        </div>
        <div className="Forgot_link">
            <a href="#">Forgot password?</a>
        </div>
        <div>
            <button className="my_button" type="Submit">Log in</button>
        </div>
        <div>
            <p className="Register_link">Dont have an account? <a href="#" onClick={()=>props.onFormSwitch('register')}> Register</a></p>
        </div>
      </form>
    </div>
  );
};

export default LogIn;
