import PageContainer from "../components/PageContainer";
import CustomButton from "../components/CustomButton";
import ContainerBox from "../components/ContainerBox";
import InputField from "../components/inputs/InputField";
import React, { useState } from "react";
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

    // Check if email already exists (you need to implement th is logic)
    const emailExists = await checkEmailExists(email); //TODO: add real call from BE
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
  }

  // Mock function to simulate checking if email exists
  const checkEmailExists = async (email) => {
    return false; // Replace this with your actual logic
  }

  async function handleImageUpload(event) {
    const file = event.target.files[0];;

    if (!file) {
      console.error('No file selected');
      return;
    }

    try {
      const compressedImageData = await compressImage(file);
      console.log('Compressed image data:', compressedImageData);
      setImage(compressedImageData);
    } catch (error) {
      console.error('Error compressing image:', error);
    }
  }

  function compressImage(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = function (event) {
        const img = new Image();
        img.onload = function () {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          // Set canvas dimensions based on the image size
          const maxWidth = 1024; // Example: max width for compressed image
          const maxHeight = 1024; // Example: max height for compressed image
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;

          // Draw image on canvas with new dimensions
          ctx.drawImage(img, 0, 0, width, height);

          // Get compressed image data as base64 encoded string
          const compressedImageData = canvas.toDataURL('image/jpeg', 0.7); // Adjust quality as needed (0.7 = 70% quality)

          resolve(compressedImageData);
        };

        img.onerror = function (error) {
          reject(error);
        };

        img.src = event.target.result;
      };

      reader.onerror = function (error) {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  }

  const registerUser = async (firstName, lastName, email, password, image) => {
    if(error){
      console.log(error) //TODO: snackbar
    }
    try {
      const registerResponse = await fetch("/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "firstName": firstName,
          "lastName": lastName,
          "email": email,
          "password": password,
          "image": image,
        }),
      });

      console.log(registerResponse)
    } catch (e) {
      console.error("Error:", e);
    }
    console.log('Registering user:', firstName, lastName, email, password);
  }

  return (
    <PageContainer>
      <form onSubmit={handleSubmit}>
        <ContainerBox sx={{ width: "700px", border: "2px solid var(--medium-green)", }}>
          <TitleButton style={titleButton}>{dict.Register}</TitleButton>
          <InputField label={dict.firstName} value={firstName} onValueChange={setFirstName} checkIfValid={() => true} error="" />
          <InputField label={dict.lastName} value={lastName} onValueChange={setLastName} checkIfValid={() => true} error="" />
          <InputField label={dict.email} value={email} onValueChange={setEmail} checkIfValid={() => true} error="" />
          <InputField label={dict.password} value={password} onValueChange={setPassword} checkIfValid={() => true} error="" type="password" />
          <InputField label={dict.image} onValueChange={handleImageUpload} checkIfValid={() => true} error="" type="file" accept="image/*" name="image" id="imageInput" />
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '10%' }}>
            <CustomButton type="submit" label={dict.Register} style={{ width: '35%' }} to="/Login"/>
            <CustomButton type="button" label={dict.alreadyhaveanaccount} to="/LogIn" style={{ width: '35%' }} secondary />
          </div>
        </ContainerBox>
      </form>
    </PageContainer>
  );
}

export default Register;