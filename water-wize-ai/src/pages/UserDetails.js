import PageContainer from "../components/PageContainer";
import React, { useContext, useState } from "react";
import { AuthContext } from "../AuthContext";
import CustomButton from "../components/CustomButton";
import ContainerBox from "../components/ContainerBox";
import InputField from "../components/inputs/InputField";
import useDictionary from "../resources/Dictionary/Dictionary";
import {patchUserDetails} from "../apiRequests"


function UserDetails() {
    const { user, updateUserDetails } = useContext(AuthContext);
    const [editedUser, setEditedUser] = useState(user);
    const dict = useDictionary();

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
        try {
            const response = await patchUserDetails(editedUser)
            updateUserDetails(editedUser)
            // console.log(response)
        } catch (error) {
            console.error("Error:", error);
        }
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

    return (
        <PageContainer>
            <ContainerBox sx={{ width: "700px", border: "2px solid var(--medium-green)" }}>
                <img src={user && user.image} style={{ maxWidth: '60%', objectFit: 'contain', borderRadius: '3%' }} alt="User" />
                <form onSubmit={handleUserDetailsChange}>
                    <InputField
                        label={dict.firstName}
                        value={editedUser.firstName} // Use editedUser state for controlled input
                        onValueChange={handleFirstNameChange} // Handle first name change
                        checkIfValid={() => true}
                        error=""
                    />
                    <InputField
                        label={dict.lastName}
                        value={editedUser.lastName} // Use editedUser state for controlled input
                        onValueChange={handleLastNameChange} // Handle last name change
                        checkIfValid={() => true}
                        error=""
                    />
                    <InputField
                        label={dict.email}
                        value={editedUser.email} // Use editedUser state for controlled input
                        onValueChange={handleEmailChange} // Handle email change
                        checkIfValid={() => true}
                        error=""
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
                    <CustomButton type="submit" label={dict.Register} style={{ width: '35%' }} />
                </form>
            </ContainerBox>
        </PageContainer>
    );
}

export default UserDetails;
