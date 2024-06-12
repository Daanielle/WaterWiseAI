import React, { useState } from "react";
import classes from "../styles/Register_and_Login.css";
import { Link } from "react-router-dom";
import TitleButton from "../components/TitleButton";
import useDictionary from "../resources/Dictionary/Dictionary";

const titleButton={
  fontStyle: "italic",
  /* font-size: larger; */
  color:"#bef5dc"
 
};

const Register = (props) => {
  const dict = useDictionary();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [image, setImage] = useState('');

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
    if (!passRegex.test(password)) {
      setError('Password must contain at least 8 characters including upper and lower case letters and numbers');
      return;
    }

    // Register the user (you need to implement this logic)
    await registerUser(name, email, username, password, image);
    setError('Registration successful');
    // Optionally, you can redirect the user to another page after successful registration
  }

  // Mock function to simulate checking if email exists
  const checkEmailExists = async (email) => {
    // You need to implement the logic to check if the email exists in your backend or database
    return false; // Replace this with your actual logic
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // You can use FileReader to read the file as data URL
      const reader = new FileReader();
      reader.onload = () => {
        // Here, reader.result will contain the data URL of the image
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const registerUser = async (name, email, username, password, image) => {
    try {
      const registerResponse = await fetch("/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "name": name,
          "email": email,
          "password": password,
          "image": image,
        }),
      });

      console.log(registerResponse)
      //const recommendationData = await calculationResponse.json();
      //setWaterRecommendation(recommendationData.recommendation);
      //setDetailedData(recommendationData);

    } catch (error) {
      console.error("Error:", error);
    }
    console.log('Registering user:', name, email, username, password);
  }

  return (
    <div className="register_and_login">
      <form className="Register_Form" onSubmit={handleSubmit}>
      <TitleButton label={dict.Register} style={titleButton}></TitleButton>
        {error && <div className="error">{error}</div>}
        <div>
          <input className={dict.stylePage} value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder={dict.nameR} id="name" name="name" required></input>
        </div>
        <div>
          <input className={dict.stylePage} value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" required></input>
        </div>
        <div>
          <input className={dict.stylePage} value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder={dict.username} id="username" name="username" required></input>
        </div>
        <div>
          <input className={dict.stylePage} value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder={dict.password} id="password" name="password" required></input>
        </div>
        <input className={dict.stylePage} type="file"
          onChange={(e) => handleImageChange(e)}
          accept="image/*" name="image" id="imageInput" />
        <div>
          <button className="my_button" type="submit">{dict.Register}</button>
        </div>
        <div >
          <Link to="/LogIn">
            <p className="login_link">{dict.alreadyhaveanaccount} <a href="#" > {dict.loginhere}</a></p>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
