import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../utils/config";
const initialState = {
  allUsers: [],
  authUser: [],
  statusAuth: null,
  errorAuth: null,
  registerUser: [],
  statusRegister: null,
  errorRegister: null,
};

export const getUsersAsync = createAsyncThunk(
  "user/getUsersAsync",
  async () => {
    const response = await axios.get(`${BASE_URL}/app/users`);
    return response.data;
  }
);
export const chekAuthAsync = createAsyncThunk(
  "user/chekAuthAsync",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/app/sign-in`, _);
      if (!response.data.status) {
        throw new Error();
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const registerationUserAsync = createAsyncThunk(
  "user/registerationUserAsync",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/app/registration`, _);
      console.log(response, "te");
      if (!response.data.status) {
        throw new Error();
      }
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const counterSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getUsersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUsersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.allUsers = [...action.payload];
      })
      .addCase(getUsersAsync.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(chekAuthAsync.fulfilled, (state, action) => {
        state.statusAuth = true;
        state.authUser = [action.payload];
        localStorage.setItem("auth", JSON.stringify(state.authUser));
      })
      .addCase(chekAuthAsync.rejected, (state, action) => {
        state.statusAuth = "User doesn't Sign-uped";
        state.errorAuth = "Server  and Validation error";
      })
      .addCase(registerationUserAsync.pending, (state, action) => {
        state.statusRegister = "loadng";
      })
      .addCase(registerationUserAsync.fulfilled, (state, action) => {
        state.statusRegister = true;
        state.registerUser = [action.payload];
        console.log(state.statusRegister, "state.statusRegister full");
      })
      .addCase(registerationUserAsync.rejected, (state, action) => {
        state.statusRegister = false;
        state.errorRegister = action.payload.response.data;
      });
  },
});

export const selectAllUsers = (state) => state.user.allUsers;
export const selectAuthUser = (state) => state.user.authUser;
export const selectUserStatus = (state) => state.user.statusAuth;
export const selectUserErrors = (state) => state.user.errorAuth;
export const selectRegisterUser = (state) => state.user.registerUser;
export const selectStatusRegister = (state) => state.user.statusRegister;
export const selectErrorRegister = (state) => state.user.errorRegister;

export default counterSlice.reducer;
