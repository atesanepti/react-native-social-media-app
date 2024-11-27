import { ROUTES } from "@/constants/apis";
import { deleteToken, getToken, setToken } from "@/helpers/token";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUser = createAsyncThunk("auth/user", async (token) => {
  try {
    const response = await axios.get(
      `${ROUTES.BASE}/${ROUTES.AUTH}/protected/${token}`,
      {
        headers: {
          "Content-Type": "Application/json",
          Accept: "Application/json",
        },
      }
    );

    return { user: response.data.user, token };
  } catch (error: any) {
    if (error.response) {
      if (!error.response.data.ok) {
        throw new Error(error.response.data.error);
      }
    }
    throw new Error(error.message);
  }
});

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  isLogin: false,
  token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const payload = action.payload;
      state.error = null;
      state.user = payload.user;
      state.isLogin = true;
      state.token = payload.token;
    },
    logout: (state, action) => {
      state.user = null;
      state.isLogin = false;
      state.token = "";
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {

      const payload = action.payload;
      state.error = null;
      state.isLoading = false;
      state.user = payload.user;
      state.isLogin = true;
      state.token = payload.token;
    });

    builder.addCase(fetchUser.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(fetchUser.rejected, (state, action) => {
      state.isLoading = false;
      state.user = null;
      state.error = action.error.message;

    });
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
