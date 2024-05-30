/*
import {
  PayloadAction,
  SerializedError,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { Post, PostBody } from "@/types/Post";

type PostState = {
  [key: string]: any;
  category: string;
  title: string;
  body: string;
  loading: string;
  post: Post | null;
  postError: SerializedError | null;
};

const initialState: PostState = {
  category: "",
  title: "",
  body: "",
  loading: "",
  post: null,
  postError: null,
};

export const writePost = createAsyncThunk(
  "post/WRITE_POST",
  async ({ category, title, body }: PostBody) => {
    const response = await fetch("/nextApi/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ category: category, title: title, body: body }),
      cache: "no-store",
    });

    return response.json() as Promise<Post>;
  }
);

export const removePost = createAsyncThunk(
  "post/REMOVE_POST",
  async (id: number) => {
    await fetch(`/nextApi/post/${id}`, {
      method: "DELETE",
      cache: "no-store",
    });
  }
);

const post = createSlice({
  name: "post",
  initialState: initialState,
  reducers: {
    changeField: (
      state,
      action: PayloadAction<{ key: string; value: string }>
    ) => {
      state[action.payload.key] = action.payload.value;
    },
    initializeForm: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(writePost.pending, (state, action) => {
        state.loading = action.type;
        state.post = null;
        state.postError = null;
      })
      .addCase(writePost.fulfilled, (state, action) => {
        state.loading = action.type;
        state.post = action.payload;
      })
      .addCase(writePost.rejected, (state, action) => {
        state.loading = action.type;
        state.postError = action.error;
      })
      .addCase(removePost.pending, (state, action) => {
        state.loading = action.type;
        state.postError = null;
      })
      .addCase(removePost.fulfilled, (state, action) => {
        state.loading = action.type;
      })
      .addCase(removePost.rejected, (state, action) => {
        state.loading = action.type;
        state.postError = action.error;
      });
  },
});

export const { changeField, initializeForm } = post.actions;
export default post;
*/
