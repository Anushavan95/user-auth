import { Button } from "@mui/material";
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

export default function Back() {
  let navigate = useNavigate();
  return (
    <Button fullWidth variant="contained" onClick={() => navigate(-1)}>
      <ArrowBackIcon />
    </Button>
  );
}
