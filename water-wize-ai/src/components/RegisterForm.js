import React, { useState } from "react";
import classes from "../styles/Register_and_Login.css";

const Register = (props) => {
  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email format');
      return;
    }

    // Check if email already exists (you need to implement this logic)
    const emailExists = await checkEmailExists(email);
    if (emailExists) {
      setError('Email already exists');
      return;
    }

    // Validate password format
    const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (!passRegex.test(pass)) {
      setError('Password must contain at least 8 characters including upper and lower case letters and numbers');
      return;
    }

    // Register the user (you need to implement this logic)
    await registerUser(name, email, username, pass);
    setError('Registration successful');
    // Optionally, you can redirect the user to another page after successful registration
  }

  // Mock function to simulate checking if email exists
  const checkEmailExists = async (email) => {
    // You need to implement the logic to check if the email exists in your backend or database
    return false; // Replace this with your actual logic
  }

  // Mock function to simulate registering the user
  const registerUser = async (name, email, username, pass) => {
    // You need to implement the logic to register the user in your backend or database
    // This can involve making an API request to your server
    console.log('Registering user:', name, email, username, pass);
    // Simulating an API request delay
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  return (
    <div className="register_and_login">
      <form className="Register_Form" onSubmit={handleSubmit}>
        <h1 className="my_h1">Register</h1>
        {error && <div className="error">{error}</div>}
        <div>
            <input className="my_input" value={name} onChange={(e)=>setName(e.target.value)} type="text" placeholder="name" id="name" name="name" required></input>
        </div>
        <div>
            <input className="my_input" value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" required></input>
        </div>
        <div>
            <input className="my_input" value={username} onChange={(e)=>setUsername(e.target.value)} type="text" placeholder="username" id="username" name="username" required></input>
        </div>
        <div>
            <input className="my_input" value={pass} onChange={(e)=>setPass(e.target.value)} type="password" placeholder="password" id="password" name="password" required></input>
        </div>

        <div>
            <button className="my_button" type="submit">Register</button>
        </div>
        <div >
            <p className="login_link">Already have an account? <a href="#" onClick={()=>props.onFormSwitch('login')}> Login here.</a></p>
        </div>
      </form>
    </div>
  );
};

export default Register;