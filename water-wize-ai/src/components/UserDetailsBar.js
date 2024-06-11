import React, { useState, useEffect, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import palmImage from "../resources/images/palm.jpg";
import Typography from "@mui/material/Typography";
import useDictionary from "../resources/Dictionary/Dictionary";
import CustomButton from "../components/CustomButton";
import { AuthContext } from "../AuthContext";


function UserDetailsBar() {
  const dict = useDictionary();
  const { user, logout } = useContext(AuthContext);

  const handleLogOut = () => {
    console.log('log out')
    logout()
  }

  const buttonsStyleRight = {
    fontSize: "12px",
    height: "30px",
    width: "70px",
    marginLeft: "10px"
  };

  const buttonsStyleLeft = {
    fontSize: "12px",
    height: "30px",
    width: "70px",
  };

  return (
    <div
      style={{
        height: "75px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
        paddingRight: "8px",
      }}
    >
      <Avatar src={palmImage} sx={{ width: 56, height: 56 }} />
      <div>
        <Typography color="text.secondary">
          {dict.goodMorning}, {user ? user.name : 'Guest'}
        </Typography>
        <div style={{ display: "flex" }}>
          <CustomButton label="log out" type="button" onClick={handleLogOut} style={buttonsStyleLeft} />
          <CustomButton label="test2" type="button" style={buttonsStyleRight} />
        </div>
      </div>
    </div>
  );
}

export default UserDetailsBar;
