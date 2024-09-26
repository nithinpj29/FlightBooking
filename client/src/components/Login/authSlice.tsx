import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface AuthInitialState {
    user: string|null;
    token: string|null;
    isLoading:Boolean
    error: any;
  };
  interface userDataType {
	username:string,
	password:string
  };
  
  const initialState: AuthInitialState={
    user:'',
    token: localStorage.getItem("userToken") ? localStorage.getItem("userToken") : null,
    isLoading: false,
    error: null,
  }
// API call action
export const loginUser = createAsyncThunk("auth/loginUser", async (userData:userDataType, { rejectWithValue }) => {
  try {
    console.log("ccc")
    const response = await axios.post("http://localhost:8080/api/user/login", userData);
    console.log("ccc2",response)
    return response.data;  // Token and user data returned
  } catch (err:any) {
    return rejectWithValue(err.response.data);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      localStorage.removeItem("userToken");
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
