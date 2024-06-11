import React, { useState, useContext } from "react";
import { AuthContext } from '../AuthContext';

const LogIn = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginResponse = await fetch("/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "username": username,
          "password": password
        }),
      });
      if (!loginResponse.ok) {
        const errorData = await loginResponse.json();
        throw new Error(errorData.message || 'Login failed!');
      }
      const data = await loginResponse.json(); // Parse the JSON response
      login(data);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="register_and_login">
      <form className="Login_Form" onSubmit={handleSubmit}>
        <h1 className="my_h1">LogIn</h1>
        <div>
          <input className="my_input" value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username" id="username" name="username" required></input>
        </div>
        <div>
          <input className="my_input" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" id="password" name="password" required></input>
        </div>
        <div className="Forgot_link">
          <a href="#">Forgot password?</a>
        </div>
        <div>
          <button className="my_button" type="Submit">Log in</button>
        </div>
        <div>
          <p className="Register_link">Dont have an account? <a href="#" onClick={() => props.onFormSwitch('register')}> Register</a></p>
        </div>
      </form>
    </div>
  );
};

export default LogIn;
