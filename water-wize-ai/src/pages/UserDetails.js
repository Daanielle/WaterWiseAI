import PageContainer from "../components/PageContainer";
import React, { useContext } from "react";
import { AuthContext } from "../AuthContext";

function UserDetails() {
    const { user } = useContext(AuthContext);

    return (

        <PageContainer>
            <img src={user && user.image}></img>
            <div>username: {user && user.name}</div>
            <div>email: {user && user.email}</div>
        </PageContainer>
    );
}

export default UserDetails;