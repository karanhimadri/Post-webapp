import { createSlice } from "@reduxjs/toolkit";

const PostSlice = createSlice({
  name: "Posts",
  initialState: { postsData:[] },
  reducers: {
    updatePosts: (state, action) => {
      state.postsData = action.payload;
    },
  },
});

export const { updatePosts } = PostSlice.actions;
export default PostSlice;
