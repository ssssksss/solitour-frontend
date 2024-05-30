/*
import { Reply, ReplyBody } from "@/types/Reply";
import {
  SerializedError,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

type ReplyState = {
  replies: { [comment_id: number]: Reply[] };
  loading: string;
  reply: Reply | null;
  replyError: SerializedError | null;
};

const initialState: ReplyState = {
  replies: {},
  loading: "",
  reply: null,
  replyError: null,
};

export const writeReply = createAsyncThunk(
  "reply/WRITE_REPLY",
  async ({ body, comment_id }: ReplyBody) => {
    const response = await fetch("/nextApi/reply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ body: body, comment_id: comment_id }),
      cache: "no-store",
    });

    return response.json() as Promise<Reply>;
  }
);

export const removeReply = createAsyncThunk(
  "reply/REMOVE_REPLY",
  async (reply_id: number) => {
    await fetch(`/nextApi/reply/${reply_id}`, {
      method: "DELETE",
      cache: "no-store",
    });
  }
);

export const loadReplies = createAsyncThunk(
  "reply/LOAD_REPLIES",
  async (comment_id: number) => {
    const response = await fetch(`/nextApi/reply?commentId=${comment_id}`, {
      method: "GET",
      cache: "no-store",
    });

    return {
      comment_id: comment_id,
      replies: (await response.json()) as Reply[],
    };
  }
);

const reply = createSlice({
  name: "reply",
  initialState: initialState,
  reducers: {
    initializeForm: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(writeReply.pending, (state, action) => {
        state.loading = action.type;
        state.reply = null;
        state.replyError = null;
      })
      .addCase(writeReply.fulfilled, (state, action) => {
        state.loading = action.type;
        state.reply = action.payload;
      })
      .addCase(writeReply.rejected, (state, action) => {
        state.loading = action.type;
        state.replyError = action.error;
      })
      .addCase(removeReply.pending, (state, action) => {
        state.loading = action.type;
        state.replyError = null;
      })
      .addCase(removeReply.fulfilled, (state, action) => {
        state.loading = action.type;
      })
      .addCase(removeReply.rejected, (state, action) => {
        state.loading = action.type;
        state.replyError = action.error;
      })
      .addCase(loadReplies.pending, (state, action) => {
        state.loading = action.type;
        state.replyError = null;
      })
      .addCase(loadReplies.fulfilled, (state, action) => {
        state.replies[action.payload.comment_id] = action.payload.replies;
        state.loading = action.type;
      })
      .addCase(loadReplies.rejected, (state, action) => {
        state.loading = action.type;
        state.replyError = action.error;
      });
  },
});

export const { initializeForm } = reply.actions;
export default reply;
*/
