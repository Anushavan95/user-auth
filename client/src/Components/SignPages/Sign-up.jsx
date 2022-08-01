import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "../../App.scss";
import {
  registerationUserAsync,
  selectErrorRegister,
  selectRegisterUser,
  selectStatusRegister,
} from "../../features/userSlice";
import Back from "../Back";
import Header from "../Header";
export default function SignUp() {
  const dispatch = useDispatch();

  const userRegister = useSelector(selectRegisterUser);

  const errorsRegister = useSelector(selectErrorRegister);
  const statusRegister = useSelector(selectStatusRegister);
  const navigate = useNavigate();

  const [userLogin, setUserLogin] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });
  function handleChange(evt) {
    const value = evt.currentTarget.value;
    setUserLogin({
      ...userLogin,
      [evt.currentTarget.name]: value,
    });
  }

  const registerUser = async () => {
    await dispatch(
      registerationUserAsync({
        name: userLogin.name,
        surname: userLogin.surname,
        email: userLogin.email,
        password: userLogin.password,
      })
    );
  };

  return (
    <Box className="sign-page">
      <Header title="Sign Up" />
      {statusRegister ? (
        <Alert severity="success">
          <Link to={"/"} className="account-sign-link">
            {" "}
            Account Created Please Route Sign Page
          </Link>
        </Alert>
      ) : null}
      <Back />
      {!statusRegister && errorsRegister?.message ? (
        <>
          {errorsRegister?.errors && (
            <Alert severity="error">
              {" "}
              {errorsRegister?.errors?.map((err) => {
                return (
                  <Typography>
                    {err.msg} {err.param}
                  </Typography>
                );
              })}
            </Alert>
          )}
          {statusRegister ? null : (
            <Alert severity="error">{errorsRegister?.message}</Alert>
          )}
        </>
      ) : null}
      <Box className="name-surname-box">
        <TextField
          onChange={handleChange}
          id="outlined-basic"
          label="Name"
          value={userLogin.name}
          variant="outlined"
          type="text"
          name="name"
        />
        <TextField
          onChange={handleChange}
          value={userLogin.surname}
          id="outlined-basic"
          label="Surname"
          variant="outlined"
          type="text"
          name="surname"
        />
      </Box>
      <Box className="sign-up-inputs">
        <TextField
          onChange={handleChange}
          id="outlined-basic"
          value={userLogin.email}
          label="Email"
          variant="outlined"
          type="email"
          name="email"
          fullWidth
        />
        <TextField
          onChange={handleChange}
          value={userLogin.password}
          id="outlined-basic"
          label="Password"
          variant="outlined"
          type="passsword"
          name="password"
          fullWidth
        />
      </Box>
      <Button fullWidth variant="contained" onClick={() => registerUser()}>
        Sign Up
      </Button>
    </Box>
  );
}
