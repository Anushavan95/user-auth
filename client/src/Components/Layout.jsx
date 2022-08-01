import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { getUsersAsync } from "../features/userSlice";

export default function Layout() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersAsync());
  }, []);
  return (
    <div>
      <Outlet />
    </div>
  );
}
