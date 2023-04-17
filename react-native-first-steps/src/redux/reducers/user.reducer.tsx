import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '.';

export type UserState = {
  id?: number,
  username?: string,
  name? : string,
  email?: string,
  password?: string,
  isFetching: boolean,
  isSuccess: boolean,
  isError: boolean,
  errorMessage?: string
}

const initialState : UserState = {
  id: 0,
  username: '',
  name: '',
  email: '',
  password: '',
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: ''
}

export const loginUser = createAsyncThunk(
  'users/fetchById',
  async (user: UserState, thunkAPI) => {
    try {
      const response = await fetch(
        'https://dummyjson.com/auth/login',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: user.email,
            password: user.password,
          }),
        }
      );
      let data = await response.json();
      console.log('response', data);
      if (response.status === 200) {
        //localStorage.setItem('id', data.id);
        //localStorage.setItem('token', data.token);
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log('Error', e);
      thunkAPI.rejectWithValue(e);
    }
  }
)

export const signupUser = createAsyncThunk(
  'users/signupUser',
  async (user: UserState, thunkAPI) => {
    try {
      const response = await fetch(
        'https://dummyjson.com/users/add',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstname: user.name,
            username: user.username,
            password: user.password,
          }),
        }
      );
      let data = await response.json();
      console.log('data', data);

      if (response.status === 200) {
        //localStorage.setItem('id', data.id);
        //localStorage.setItem('token', data.token);
        return { ...data, name: user.name, username: user.username };
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log('Error', e);
      return thunkAPI.rejectWithValue(e);
    }
  }
);


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;

      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.id = payload.id;
        state.email = payload.email;
        state.username = payload.username;
        state.isFetching = false;
        state.isSuccess = true;
        return state;
      })
      .addCase<any>(loginUser.rejected, (state, { payload }) => {
        console.log('payload', payload);
        state.isFetching = false;
        state.isError = true;
        state.errorMessage = payload.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(signupUser.fulfilled, (state, { payload }) => {
        console.log('payload', payload);
        state.isFetching = false;
        //state.isSuccess = true;
        //state.id = payload.id;
        //state.email = payload.email;
        //state.username = payload.name;
        state.isError = true;
        state.errorMessage = 'This functionality is not working on this demo';
      })
      .addCase(signupUser.pending, (state) => {
        state.isFetching = true;
      })
      .addCase<any>(signupUser.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.isError = true;
        state.errorMessage = payload.message;
      })
    }
});

export const { clearState } = userSlice.actions;

export const userSelector = (state: RootState) => state.user

export default userSlice.reducer