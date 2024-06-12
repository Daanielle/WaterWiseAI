import React, { useState, useEffect, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import palmImage from "../resources/images/palm.jpg";
import Typography from "@mui/material/Typography";
import useDictionary from "../resources/Dictionary/Dictionary";
import CustomButton from "../components/CustomButton";
import { AuthContext } from "../AuthContext";
import { Link } from "react-router-dom";


function UserDetailsBar() {
  const dict = useDictionary();
  const { user, logout } = useContext(AuthContext);

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

  const LoggedInBtns = (
    <div style={{ display: "flex" }}>
      <Link to="/">
        <CustomButton label="log out" type="button" onClick={logout} style={buttonsStyleLeft} />
      </Link>
      <Link to="/UserDetails">
        <CustomButton label="user" type="button" style={buttonsStyleRight} />
      </Link>
    </div>
  )

  const GuestBtns = (
    <div style={{ display: "flex" }}>
      <Link to="/LogIn">
        <CustomButton label="log in" type="button" style={buttonsStyleLeft} />
      </Link>
      <Link to="/Register">
        <CustomButton label="register" type="button" style={buttonsStyleRight} />
      </Link>
    </div>
  )

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
      <Avatar src={user ? user.image : null} sx={{ width: 56, height: 56 }} />
      <div>
        <Typography color="text.secondary">
          {dict.goodMorning}, {user ? user.name : 'Guest'}
        </Typography>
        {user ? LoggedInBtns : GuestBtns}
      </div>
    </div>
  );
}

export default UserDetailsBar;
