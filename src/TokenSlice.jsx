import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
    token: null,
    id: null
};

const tokenSlice = createSlice({
  name: "token_manage",
  initialState,
  reducers: {
    addToken: (state, action) => {
      state.token = action.payload;
    },
    removeToken: (state) => {
      state.token = null;
    },
    addId: (state, action) => {
      state.id = action.payload;
    },
    removeId: (state) => {
      state.id = null;
    }
  },
});

export const { addToken, removeToken, addId, removeId } = tokenSlice.actions;
export default tokenSlice.reducer;