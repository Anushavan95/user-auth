import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { selectAllUsers } from "../../features/userSlice";
import Back from "../Back";
export default function Users() {
  const users = useSelector(selectAllUsers);
  return (
    <List
      className="all-users-table"
      sx={{
        width: "100%",
        margin: "0 auto",
        maxWidth: 500,
        bgcolor: "background.paper",
      }}
    >
      <Back />
      <List className="list-users-title">
        <ListItem>Name, Surname</ListItem>
        <ListItem>Email</ListItem>
      </List>
      {users.map((item, index) => {
        return (
          <ListItem key={index} className="list-user">
            <Typography className="idx-users" variant="span">
              {index + 1}
            </Typography>{" "}
            <ListItemAvatar>
              <Avatar>
                <AccountCircleIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={item.name} secondary={item.surname} />
            <>{item.email}</>
          </ListItem>
        );
      })}
    </List>
  );
}
