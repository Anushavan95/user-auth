import { Box } from "@mui/system";
import Lock from "../assets/Lock";

export default function Header({ title }) {
  return (
    <Box className="sign-header">
      <Box className="lock-icon">
        <Lock />
      </Box>
      <h1>{title}</h1>
    </Box>
  );
}
