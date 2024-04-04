import React, { useState } from "react";
import classes from "../styles/Register_and_Login.css";

const Register = (props) => {
  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e)=>{
    // e.preventDefault();
    console.log("l");
  }

  return (
    <div className="register_and_login">
      <form className="Register_Form" onSubmit={handleSubmit}>
        <h1 className="my_h1">Register</h1>
        <div>
            <input className="my_input" value={name} onChange={(e)=>setName(e.target.value)} type="text" placeholder="name" id="name" name="name"></input>
        </div>
        <div>
            <input className="my_input" value={email} onChange={(e)=>setEmail(e.target.value)} type="text" placeholder="youremail@gmail.com" id="email" name="email"></input>
        </div>
        <div>
            <input className="my_input" value={username} onChange={(e)=>setUsername(e.target.value)} type="text" placeholder="username" id="username" name="username"></input>
        </div>
        <div>
            <input className="my_input" value={pass} onChange={(e)=>setPass(e.target.value)} type="password" placeholder="password" id="password" name="password"></input>
        </div>

        <div>
            <button className="my_button" type="Submit">Register</button>
        </div>
        <div >
            <p className="login_link">Already have an account? <a href="#" onClick={()=>props.onFormSwitch('login')}> Login here.</a></p>
        </div>
      </form>
    </div>
  );
};

export default Register;