import PageContainer from "../components/PageContainer";
import React, { useContext, useState } from "react";
import { AuthContext } from "../AuthContext";
import CustomButton from "../components/CustomButton"

function UserDetails() {
    const { user, updateUserDetails } = useContext(AuthContext);
    const [editedUser, setEditedUser] = useState(user);

    const handleUserDetailsChange = (e) => {
        const { name, value } = e.target;
        setEditedUser({ ...editedUser, [name]: value });
    };

    const handleuserDetailsChange = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/users/"+user._id, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(editedUser),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'update failed!');
            }
            const data = await response.json(); // Parse the JSON response
            updateUserDetails(editedUser);
        } catch (error) {
            console.error("Error:", error);
        }
    }

    return (
        <PageContainer>
            <img src={user && user.image}></img>
            <form onSubmit={handleuserDetailsChange}>
                <div>
                    <input
                        name="name"
                        value={editedUser && editedUser.name}
                        onChange={handleUserDetailsChange}
                    />
                </div>
                <div>
                    <input
                        name="id"
                        value={editedUser && editedUser._id}
                        onChange={handleUserDetailsChange}
                    />
                </div>
                <div>
                    <input
                        name="email"
                        value={editedUser && editedUser.email}
                        onChange={handleUserDetailsChange}
                    />
                </div>
                <div>
                    <button type="submit">Save</button>
                </div>
            </form>
        </PageContainer>
    );
}

export default UserDetails;