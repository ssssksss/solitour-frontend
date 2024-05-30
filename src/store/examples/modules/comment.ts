/*
import { Comment, CommentBody } from "@/types/Comment";
import {
  PayloadAction,
  SerializedError,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

type CommentState = {
  body: string;
  loading: string;
  comment: Comment | null;
  commentError: SerializedError | null;
};

const initialState: CommentState = {
  body: "",
  loading: "",
  comment: null,
  commentError: null,
};

export const writeComment = createAsyncThunk(
  "comment/WRITE_COMMENT",
  async ({ body, post_id }: CommentBody) => {
    const response = await fetch("/nextApi/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ body: body, post_id: post_id }),
      cache: "no-store",
    });

    return response.json() as Promise<Comment>;
  }
);

export const removeComment = createAsyncThunk(
  "comment/REMOVE_COMMENT",
  async (comment_id: number) => {
    await fetch(`/nextApi/comment/${comment_id}`, {
      method: "DELETE",
      cache: "no-store",
    });
  }
);

const comment = createSlice({
  name: "comment",
  initialState: initialState,
  reducers: {
    changeBody: (state, action: PayloadAction<string>) => {
      state.body = action.payload;
    },
    initializeForm: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(writeComment.pending, (state, action) => {
        state.loading = action.type;
        state.comment = null;
        state.commentError = null;
      })
      .addCase(writeComment.fulfilled, (state, action) => {
        state.loading = action.type;
        state.comment = action.payload;
      })
      .addCase(writeComment.rejected, (state, action) => {
        state.loading = action.type;
        state.commentError = action.error;
      })
      .addCase(removeComment.pending, (state, action) => {
        state.loading = action.type;
        state.commentError = null;
      })
      .addCase(removeComment.fulfilled, (state, action) => {
        state.loading = action.type;
      })
      .addCase(removeComment.rejected, (state, action) => {
        state.loading = action.type;
        state.commentError = action.error;
      });
  },
});

export const { changeBody, initializeForm } = comment.actions;
export default comment;
*/
