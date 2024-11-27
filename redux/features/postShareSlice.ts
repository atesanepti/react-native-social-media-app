import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  post: {},
};

const postShareSlice = createSlice({
  name: "postShare",
  initialState,
  reducers: {
    setSharePost: (state, action) => {
      const post = action.payload;
      state.post = post;
    },
    removeSharePost: (state, action) => {
      state.post = {};
    },
  },
});
export default postShareSlice.reducer;
export const { setSharePost, removeSharePost } = postShareSlice.actions;
