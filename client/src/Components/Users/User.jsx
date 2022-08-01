import LogoutIcon from "@mui/icons-material/Logout";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function User() {
  const navigate = useNavigate();
  let authUser = localStorage.getItem("auth");
  const logOut = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };
  return (
    <List
      className="user-block"
      sx={{
        width: "100%",
        margin: "5% auto",
        maxWidth: 360,
        bgcolor: "teal",
      }}
    >
      <Button className="logout">
        <LogoutIcon onClick={logOut} />
      </Button>
      {JSON.parse(authUser).map((user, index) => {
        return (
          <ListItem alignItems="flex-start" key={index}>
            <ListItemText
              className="user-name"
              primary={user.name}
              secondary={
                <React.Fragment>
                  <Typography
                    className="user-email"
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {user.email}
                  </Typography>
                  <Typography className="user-surname">
                    {user.surname}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
        );
      })}
      <Box className="all-users">
        <Link to={"/users"}>All My Created Users</Link>
      </Box>
    </List>
  );
}
