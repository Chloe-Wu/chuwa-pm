import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signIn, signUp } from '../services/auth'
import { addError, removeError } from './errorSlice';


export const authUser = createAsyncThunk(
  'currentUser/authUser',
  async (data, thunkAPI) => {
    try {
      const user = await signIn(data);
      console.log('User data after signin:', user);
      localStorage.setItem('token', user.token);
      console.log('Token has been saved to localStorage');
      thunkAPI.dispatch(removeError());
      return user;
    } catch (error) {
      const { message } = error;
      thunkAPI.dispatch(addError(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const signUpUser = createAsyncThunk(
  'currentUser/signUpUser',
  async (data, thunkAPI) => {
    try {
      const user = await signUp(data);
      console.log('User data after signup:', user);
      thunkAPI.dispatch(removeError());
      return user;
    } catch (error) {
      const { message } = error;
      thunkAPI.dispatch(addError(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
    isAuthenticated: false,
    id: null,
    info: null,
    status:'idle',
    token: null,
}

const currentUserSlice = createSlice({
    name : 'currentuser',
    initialState,
    reducers:{
        setCurrentUser: (state, action)=>{
            // state.isAuthenticated = !!Object.keys(action.payload).length;
            state.isAuthenticated = true;
            state.id = action.payload;
            state.status = 'succeeded';
        },
        setCurrentToken: (state, action)=>{
          // state.isAuthenticated = !!Object.keys(action.payload).length;
          state.token = action.payload;
        },
        logOutUser:(state, action) =>{
            state.isAuthenticated = false;
            state.id = null;
            state.status = 'idle';
            localStorage.removeItem('token');
            state.token = null;
        }
    },
    extraReducers: builder => {
        builder.addCase(authUser.fulfilled, (state, action) => {
          // state.isAuthenticated = !!Object.keys(action.payload).length;
          // state.isAuthenticated = true;
          state.info = action.payload;
          state.status = 'succeeded';
        });
        builder.addCase(authUser.rejected, (state, action) => {
          // state.isAuthenticated = false;
          state.info = null;
          state.status = 'failed';
        });
        builder.addCase(authUser.pending, (state, action) => {
          state.status = 'pending';
        });
        builder.addCase(signUpUser.fulfilled, (state, action) => {
          state.status = 'succeeded';
        });
        builder.addCase(signUpUser.rejected, (state, action) => {
          state.status = 'failed';
        });
        builder.addCase(signUpUser.pending, (state, action) => {
          state.status = 'pending';
        });
      }
    });

    export const { setCurrentUser, setCurrentToken, logOutUser } = currentUserSlice.actions;

    export default currentUserSlice.reducer;