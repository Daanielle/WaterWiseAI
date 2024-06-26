import PageContainer from "../components/PageContainer";
import CustomButton from "../components/CustomButton";
import ContainerBox from "../components/ContainerBox";
import InputField from "../components/inputs/InputField";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import TitleButton from "../components/TitleButton";
import useDictionary from "../resources/Dictionary/Dictionary";

const titleButton = {
  fontStyle: "italic",
  color: "var(--medium-green)"

};

function Register() {
  const dict = useDictionary();

  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
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
    await registerUser(firstName, lastName, email, password, image);
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

  const registerUser = async (firstName, lastName, email, password, image) => {
    try {
      const registerResponse = await fetch("/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "firstName": firstName,
          "lastName": lastName,
          // "username": username,
          "email": email,
          "password": password,
          "image": image,
        }),
      });

      console.log(registerResponse)
    } catch (error) {
      console.error("Error:", error);
    }
    console.log('Registering user:', firstName, lastName, email, password);
  }

  return (
    <PageContainer>
      <form onSubmit={handleSubmit}>
        <ContainerBox sx={{width:"700px", border:"2px solid var(--medium-green)",}}>
          <TitleButton style={titleButton}>{dict.Register}</TitleButton>
          <InputField label={dict.firstName} value={firstName} onValueChange={setFirstName} checkIfValid={() => true} error="" />
          <InputField label={dict.lastName} value={lastName} onValueChange={setLastName} checkIfValid={() => true} error="" />
          <InputField label={dict.email} value={email} onValueChange={setEmail} checkIfValid={() => true} error="" />
          <InputField label={dict.password} value={password} onValueChange={setPassword} checkIfValid={() => true} error="" type="password" />
          <InputField label={dict.image} onValueChange={handleImageChange} checkIfValid={() => true} error="" type="file" accept="image/*" name="image" id="imageInput" />
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '10%' }}>
            <CustomButton type="submit" label={dict.Register} style={{ width: '35%' }} />
            <CustomButton type="button" label={dict.alreadyhaveanaccount} to="/LogIn" style={{ width: '35%' }} secondary />
          </div>
        </ContainerBox>
      </form>
    </PageContainer>
  );
}

export default Register;