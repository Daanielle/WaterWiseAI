import PageContainer from "../components/PageContainer";
import React, { useContext, useState } from "react";
import { AuthContext } from "../AuthContext";
import CustomButton from "../components/CustomButton";
import ContainerBox from "../components/ContainerBox";
import InputField from "../components/inputs/InputField";
import useDictionary from "../resources/Dictionary/Dictionary";
import { patchUserDetails, updatePassword, checkEmailExists } from "../apiRequests";
import TitleButton from "../components/TitleButton";
import palm from "../resources/images/palmColorful.png";
import CustomSnackbar from "../components/CustomSnackbar";
import { isValidEmail, isValidPassword } from "../resources/validations";


function UserDetails() {
    const { user, updateUserDetails } = useContext(AuthContext);
    const [editedUser, setEditedUser] = useState(user);
    const [newPass, setNewPass] = useState("")
    const [snackbar, setSnackBar] = useState(false);
    const [msg, setMsg] = useState("")
    const dict = useDictionary();
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);

    // Handle state updates for first name, last name, email, and image
    const handleFirstNameChange = (value) => {
        setEditedUser(prevState => ({
            ...prevState,
            firstName: value
        }));
    };

    const handleLastNameChange = (value) => {
        setEditedUser(prevState => ({
            ...prevState,
            lastName: value
        }));
    };

    const handleEmailChange = (value) => {
        setEditedUser(prevState => ({
            ...prevState,
            email: value
        }));
    };

    const handlePasswordChange = (value) => {
        setNewPass(value);
    };

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];

        if (!file) {
            console.error('No file selected');
            return;
        }

        try {
            const compressedImageData = await compressImage(file);
            console.log('Compressed image data:', compressedImageData);
            setEditedUser({ ...editedUser, image: compressedImageData }); // Update image in editedUser state
        } catch (error) {
            console.error('Error compressing image:', error);
        }
    };

    const handleUserDetailsChange = async (e) => {
        e.preventDefault();
        if (!isEmailValid) {
            setMsg(dict.errorEmail)
            handleOpenSnackbar()
            return
        }
        const emailExists = await checkEmailExists(editedUser.email);
        if (emailExists.exists) {
            setMsg(dict.errorEmailExists)
            handleOpenSnackbar()
            return
        }

        try {
            const response = await patchUserDetails(editedUser)
            updateUserDetails(editedUser)
            if (response) {
                setMsg(dict.successSaveUser)
                handleOpenSnackbar()
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (!isPasswordValid) {
            setMsg(dict.errorPass)
            handleOpenSnackbar()
            return
        }
        try {
            const response = await updatePassword(editedUser, newPass)
            if (response) {
                setMsg(dict.successSavePass)
                handleOpenSnackbar()
                setNewPass("")
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleOpenSnackbar = () => {
        setSnackBar(true);
    };

    const handleCloseSnackbar = () => {
        setSnackBar(false);
    };

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

    const img = {
        position: 'absolute',
        bottom: '-1px', // Adjust as needed
        right: '10px', // Adjust as needed
        zIndex: -1, // Ensures the div is in the back
        width: '600px', // Explicit width
        height: '420px', // Explicit height
        backgroundImage: `url(${palm})`,
        backgroundSize: 'cover', // Cover the entire div
        backgroundPosition: 'center', // Center the image
    };

    return (
        <PageContainer>
            <div >
                <ContainerBox style={{ display: 'inline-block', width: 'calc(50% - 5px)', marginRight: '10px', verticalAlign: 'top' }}>
                {user && user.image &&<img src={user && user.image} style={{ maxWidth: '60%', objectFit: 'contain', borderRadius: '3%' }} alt="User" />}
                    <TitleButton>{dict.editDetails}</TitleButton>
                    <form onSubmit={handleUserDetailsChange}>
                        <InputField
                            label={dict.firstName}
                            value={editedUser.firstName}
                            onValueChange={handleFirstNameChange}
                            checkIfValid={() => true}
                            error=""
                        />
                        <InputField
                            label={dict.lastName}
                            value={editedUser.lastName}
                            onValueChange={handleLastNameChange}
                            checkIfValid={() => true}
                            error=""
                        />
                        <InputField
                            label={dict.email}
                            value={editedUser.email}
                            onValueChange={handleEmailChange}
                            checkIfValid={isValidEmail}
                            error={dict.errorEmail}
                            onValidChange={setIsEmailValid}
                        />
                        <InputField
                            label={dict.image}
                            onValueChange={handleImageUpload} // Handle image upload
                            checkIfValid={() => true}
                            error=""
                            type="file"
                            accept="image/*"
                            name="image"
                            id="imageInput"
                        />
                        <CustomButton type="submit" label={dict.save} style={{ width: '35%' }} />
                    </form>
                </ContainerBox>
                <ContainerBox style={{ display: 'inline-block', width: 'calc(50% - 5px)', verticalAlign: 'top', backgroundColor: 'var(--light-accent-gray)' }}>
                    <form onSubmit={handlePasswordSubmit}>
                        <TitleButton>{dict.editPassword}</TitleButton>
                        <InputField
                            label={dict.password}
                            value={newPass}
                            onValueChange={handlePasswordChange}
                            checkIfValid={isValidPassword}
                            error={dict.errorPass}
                            type="password"
                            onValidChange={setIsPasswordValid}
                        />
                        <CustomButton type="submit" label={dict.save} style={{ width: '35%' }} />
                    </form>
                </ContainerBox>
            </div>
            <div style={img} />
            <CustomSnackbar openSnackbar={snackbar} handleClose={handleCloseSnackbar} msg={msg} />

        </PageContainer>
    );
}

export default UserDetails;
