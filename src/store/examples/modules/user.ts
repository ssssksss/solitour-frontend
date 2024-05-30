/*
import {
  SerializedError,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

type UserState = {
  id: number;
  username: string | null;
  userError: SerializedError | null;
};

const initialState: UserState = {
  id: -1,
  username: "",
  userError: null,
};

export const check = createAsyncThunk("user/CHECK", async () => {
  const response = await fetch("/nextApi/auth/check", {
    method: "GET",
    cache: "no-store",
  });
  return response.json() as Promise<{ id: number; username: string }>;
});

export const logout = createAsyncThunk("user/LOGOUT", async () => {
  await fetch("/nextApi/auth/logout", {
    method: "POST",
    cache: "no-store",
  });
  localStorage.removeItem("user");
});

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    initialize: (state) => {
      state.id = -1;
      state.username = null;
      state.userError = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(check.pending, (state, action) => {
      state.userError = null;
    });
    builder
      .addCase(check.fulfilled, (state, action) => {
        state.id = action.payload.id;
        state.username = action.payload.username;
      })
      .addCase(check.rejected, (state, action) => {
        state.id = -1;
        state.username = null;
        state.userError = action.error;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.id = -1;
        state.username = null;
        state.userError = null;
      });
  },
});

export const { initialize } = user.actions;
export default user;
*/
