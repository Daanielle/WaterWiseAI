import React, { useState, useEffect, useContext } from "react";
import Avatar from "@mui/material/Avatar";
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
        <CustomButton label={dict.logOut} type="button" onClick={logout} style={buttonsStyleLeft} />
      </Link>
      <Link to="/UserDetails">
        <CustomButton label={dict.userPage} type="button" style={buttonsStyleRight} />
      </Link>
    </div>
  )

  const GuestBtns = (
    <div style={{ display: "flex" }}>
      <Link to="/LogIn">
        <CustomButton label={dict.Login} type="button" style={buttonsStyleLeft} />
      </Link>
      <Link to="/Register">
        <CustomButton label={dict.Register} type="button" style={buttonsStyleRight} />
      </Link>
    </div>
  )

  if (dict.stylePage === "left") {
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
            {dict.goodMorning} {user ? user.firstName : 'Guest'}
          </Typography>
          {user ? LoggedInBtns : GuestBtns}
        </div>
      </div>
    );

  }
  else {
    return (
      <div
        style={{
          height: "75px",
          display: "flex",
          alignItems: "right",
          justifyContent: "right",
          gap: "20px",
          paddingRight: "25px",
          // right:0,
        }}
      >
        <div>
          <Typography color="text.secondary">
            {user ? user.firstName : 'Guest'} {dict.goodMorning}
          </Typography>
          {user ? LoggedInBtns : GuestBtns}
        </div>

        <Avatar src={user ? user.image : null} sx={{ width: 56, height: 56 }} />
      </div>
    );

  }
}

export default UserDetailsBar;
