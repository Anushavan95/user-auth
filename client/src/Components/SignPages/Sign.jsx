import { Alert, Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  chekAuthAsync,
  selectUserErrors,
  selectUserStatus,
} from "../../features/userSlice";
import { createHeader } from "../../utils/config";
import Header from "../Header";
export default function Sign({ setUserSign, userSign }) {
  const [errorSign, setErrorSign] = useState("");
  const errors = useSelector(selectUserErrors);
  const status = useSelector(selectUserStatus);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleChange(evt) {
    const value = evt.currentTarget.value;
    setUserSign({
      ...userSign,
      [evt.currentTarget.name]: value,
    });
  }

  const signUser = async () => {
    if (userSign.password.length >= 6) {
      await dispatch(
        chekAuthAsync({
          email: userSign.email,
          password: userSign.password,
        }),
        createHeader()
      );
    } else {
      setErrorSign("Password Min length 6 symbol");
    }
    if (status) {
      await navigate("user", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  };
  useEffect(() => {
    if (userSign.password.length >= 6) {
      setErrorSign("");
    } else {
      setErrorSign("Password Min length 6 symbol");
    }
  }, [userSign.password]);

  return (
    <Box className="sign-page">
      <Header title="Sign in" />
      {errors && status ? (
        <Alert severity="error">{`${errors}  ${status}`}</Alert>
      ) : null}

      <TextField
        type="email"
        id="full-width-text-field"
        label="Email Address*"
        variant="outlined"
        name="email"
        value={userSign.email}
        fullWidth
        onChange={handleChange}
      />
      <TextField
        id="full-width-text-field"
        type="password"
        label="Password*"
        variant="outlined"
        name="password"
        onChange={handleChange}
        value={userSign.password}
        fullWidth
      />
      <span className="errors-pas">{errorSign}</span>

      <Button fullWidth variant="contained" onClick={signUser}>
        Sign in
      </Button>
      <Link to={"/sign-up"}> Don't have an account? Sign Up</Link>
    </Box>
  );
}
