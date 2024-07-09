import PageContainer from "../components/PageContainer";
import CustomButton from "../components/CustomButton";
import ContainerBox from "../components/ContainerBox";
import InputField from "../components/inputs/InputField";
import React, { useState } from "react";
import TitleButton from "../components/TitleButton";
import useDictionary from "../resources/Dictionary/Dictionary";
import { isValidEmail, isValidPassword } from "../resources/validations";
import { registerUser, checkEmailExists } from "../apiRequests";
import CustomSnackbar from "../components/CustomSnackbar";

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
  const [image, setImage] = useState('');
  const [snackbar, setSnackBar] = useState(false);
  const [msg, setMsg] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(firstName, lastName, email, password, image);
  }

  const handleOpenSnackbar = () => {
    setSnackBar(true);
  };

  const handleCloseSnackbar = () => {
    setSnackBar(false);
  };

  async function handleImageUpload(event) {
    const file = event.target.files[0];

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

          const maxWidth = 1024;
          const maxHeight = 1024;
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

          ctx.drawImage(img, 0, 0, width, height);

          const compressedImageData = canvas.toDataURL('image/jpeg', 0.7);

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

  const register = async (firstName, lastName, email, password, image) => {
    if (!(email && firstName && lastName && password)) {
      setMsg(dict.errorFields)
      handleOpenSnackbar()
      return;
    }
    if (!isEmailValid) {
      setMsg(dict.errorEmail)
      handleOpenSnackbar()
      return;
    }
    if (!isPasswordValid) {
      setMsg(dict.errorPass)
      handleOpenSnackbar()
      return;
    }
    const emailExists = await checkEmailExists(email);
    if (emailExists.exists) {
      setMsg(dict.errorEmailExists)
      handleOpenSnackbar()
      return;
    }

    try {
      const response = await registerUser(firstName, lastName, email, password, image)
      if (response) {
        setMsg(dict.successSaveUser)
        handleOpenSnackbar()
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <PageContainer>
      <form onSubmit={handleSubmit}>
        <ContainerBox sx={{ width: "700px", border: "2px solid var(--medium-green)", }}>
          <TitleButton style={titleButton}>{dict.Register}</TitleButton>
          <InputField label={dict.firstName} value={firstName} onValueChange={setFirstName} checkIfValid={() => true} error="" />
          <InputField label={dict.lastName} value={lastName} onValueChange={setLastName} checkIfValid={() => true} error="" />
          <InputField label={dict.email} value={email} onValueChange={setEmail} checkIfValid={isValidEmail} error={dict.errorEmail} onValidChange={setIsEmailValid} />
          <InputField label={dict.password} value={password} onValueChange={setPassword} checkIfValid={isValidPassword} error={dict.errorPass} type="password" onValidChange={setIsPasswordValid} />
          <InputField label={dict.image} onValueChange={handleImageUpload} checkIfValid={() => true} error="" type="file" accept="image/*" name="image" id="imageInput" />
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '10%' }}>
            <CustomButton type="submit" label={dict.Register} style={{ width: '35%' }} />
            <CustomButton type="button" label={dict.alreadyhaveanaccount} to="/LogIn" style={{ width: '35%' }} secondary />
          </div>
        </ContainerBox>
      </form>
      <CustomSnackbar openSnackbar={snackbar} handleClose={handleCloseSnackbar} msg={msg} />
    </PageContainer>
  );
}

export default Register;



/* ************************************************************************************************************************ */
// import PageContainer from "../components/PageContainer";
// import CustomButton from "../components/CustomButton";
// import ContainerBox from "../components/ContainerBox";
// import InputField from "../components/inputs/InputField";
// import React, { useState } from "react";
// import TitleButton from "../components/TitleButton";
// import useDictionary from "../resources/Dictionary/Dictionary";
// import { isValidEmail, isValidPassword } from "../resources/validations";
// import { registerUser, checkEmailExists } from "../apiRequests";
// import CustomSnackbar from "../components/CustomSnackbar";


// const titleButton = {
//   fontStyle: "italic",
//   color: "var(--medium-green)"

// };

// function Register() {
//   const dict = useDictionary();

//   const [password, setPassword] = useState('');
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [email, setEmail] = useState('');
//   const [image, setImage] = useState('');
//   const [snackbar, setSnackBar] = useState(false);
//   const [msg, setMsg] = useState("")
//   const [isEmailValid, setIsEmailValid] = useState(true);
//   const [isPasswordValid, setIsPasswordValid] = useState(true);


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await register(firstName, lastName, email, password, image);
//   }

//   const handleOpenSnackbar = () => {
//     setSnackBar(true);
//   };

//   const handleCloseSnackbar = () => {
//     setSnackBar(false);
//   };




//   const register = async (firstName, lastName, email, password, image) => {
//     if (!(email)) {
//       setMsg(dict.errorFields)
//       handleOpenSnackbar()
//       return
//     }
//     if (!isEmailValid) {
//       setMsg(dict.errorEmail)
//       handleOpenSnackbar()
//       return
//     }
//     // if (!isPasswordValid) {
//     //   setMsg(dict.errorPass)
//     //   handleOpenSnackbar()
//     //   return
//     // }
//     const emailExists = await checkEmailExists(email);
//     if (emailExists.exists) {
//       setMsg(dict.errorEmailExists)
//       handleOpenSnackbar()
//       return
//     }

//     try {
//       const response = await registerUser(firstName, lastName, email, password, image)
//       if (response) {
//         setMsg(dict.successSaveUser)
//         handleOpenSnackbar()
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   }

//   //TODO: to="/Login" from register

//   return (
//     <PageContainer>
//       <form onSubmit={handleSubmit}>
//         <ContainerBox sx={{ width: "700px", border: "2px solid var(--medium-green)", }}>
//           <TitleButton style={titleButton}>{dict.Register}</TitleButton>
//           <InputField label={dict.email} value={email} onValueChange={setEmail} checkIfValid={isValidEmail} error={dict.errorEmail} onValidChange={setIsEmailValid} />
//           <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '10%' }}>
//             <CustomButton type="submit" label={dict.Register} style={{ width: '35%' }} />
//             <CustomButton type="button" label={dict.alreadyhaveanaccount} to="/LogIn" style={{ width: '35%' }} secondary />
//           </div>
//         </ContainerBox>
//       </form>
//       <CustomSnackbar openSnackbar={snackbar} handleClose={handleCloseSnackbar} msg={msg} />

//     </PageContainer>
//   );
// }

// export default Register;