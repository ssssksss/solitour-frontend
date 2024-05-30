/*
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserBody } from "@/types/User";

type AuthState = {
  [form: string]: any;
  register: {
    username: string;
    password: string;
    passwordConfirm: string;
  };
  login: {
    username: string;
    password: string;
  };
  loading: string;
  auth: {} | null;
  authError: number | null;
};

const initialState: AuthState = {
  register: {
    username: "",
    password: "",
    passwordConfirm: "",
  },
  login: {
    username: "",
    password: "",
  },
  loading: "",
  auth: null,
  authError: null,
};

export const register = createAsyncThunk(
  "auth/REGISTER",
  async ({ username, password }: UserBody) => {
    const response = await fetch("/nextApi/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    return response.json();
  }
);

export const login = createAsyncThunk(
  "auth/LOGIN",
  async ({ username, password }: UserBody) => {
    const response = await fetch("/nextApi/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    return response.json();
  }
);

const auth = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    changeField: (
      state: any,
      action: PayloadAction<{ form: string; key: string; value: string }>
    ) => {
      state[action.payload.form][action.payload.key] = action.payload.value;
    },
    initializeForm: (state, action: PayloadAction<string>) => initialState,
  },
  // Fetching 대기 상태인 pending
  // Fetching 완료 상태인 fulfilled
  // Fetching 오류 상태인 rejected
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state, action) => {
        state.loading = action.type;
        state.auth = null;
        state.authError = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = action.type;
        state.auth = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = action.type;
        state.authError = Number(action.error.message);
      })
      .addCase(login.pending, (state, action) => {
        state.loading = action.type;
        state.auth = null;
        state.authError = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = action.type;
        state.auth = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = action.type;
        state.authError = Number(action.error.message);
      });
  },
});

export const { changeField, initializeForm } = auth.actions;
export default auth;
*/
