import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '.';

export type UserState = {
  id?: number,
  username?: string,
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
      //console.log('Error', e.response.data);
      //thunkAPI.rejectWithValue(e.response.data);
    }
  }
)

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
    }
});

export const { clearState } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const userSelector = (state: RootState) => state.user

export default userSlice.reducer

/* export const signupUser = createAsyncThunk(
  'users/signupUser',
  async ({ name, username, password }, thunkAPI) => {
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
            firstname: name,
            username,
            password,
          }),
        }
      );
      let data = await response.json();
      console.log('data', data);

      if (response.status === 200) {
        localStorage.setItem('id', data.id);
        localStorage.setItem('token', data.token);
        return { ...data, name: name, username: username };
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log('Error', e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  'users/login',
  async ({ username, password }, thunkAPI) => {
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
            username,
            password,
          }),
        }
      );
      let data = await response.json();
      console.log('response', data);
      if (response.status === 200) {
        localStorage.setItem('id', data.id);
        localStorage.setItem('token', data.token);
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log('Error', e.response.data);
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const fetchUserBytoken = createAsyncThunk(
  'users/fetchUserByToken',
  async ({ token }, thunkAPI) => {
    try {
      const response = await fetch(
        'https://dummyjson.com/users/',
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: token,
            'Content-Type': 'application/json',
          },
        }
      );
      let data = await response.json();
      console.log('data', data, response.status);

      if (response.status === 200) {
        return { ...data };
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log('Error', e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const fetchUserByID = createAsyncThunk(
  'users/fetchUserByID',
  async ({ userId }, thunkAPI) => {
    try {
      const response = await fetch(
        'https://dummyjson.com/users/' + userId,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
      let data = await response.json();
      console.log('data', data, response.status);

      if (response.status === 200) {
        return { ...data };
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log('Error', e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

const initialState = {
    id: 0,
    username: '',
    email: '',
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: ''
};

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
      .addCase(signupUser.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.isError = true;
        state.errorMessage = payload.message;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.id = payload.id;
        state.email = payload.email;
        state.username = payload.username;
        state.isFetching = false;
        state.isSuccess = true;
        return state;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        console.log('payload', payload);
        state.isFetching = false;
        state.isError = true;
        state.errorMessage = payload.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchUserBytoken.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchUserBytoken.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.isSuccess = true;
        state.id = payload.id;
        state.email = payload.email;
        state.username = payload.username;
      })
      .addCase(fetchUserBytoken.rejected, (state, { payload }) => {
        console.log('fetchUserBytoken');
        state.isFetching = false;
        state.isError = true;
      })
      .addCase(fetchUserByID.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchUserByID.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.isSuccess = true;
        state.id = payload.id;
        state.email = payload.email;
        state.username = payload.username;
      })
      .addCase(fetchUserByID.rejected, (state, { payload }) => {
        console.log('fetchUserByID');
        state.isFetching = false;
        state.isError = true;
      })
    }
}); */

//export const { clearState } = userSlice.actions;

//export const userSelector = (state) => state.user;

/* interface UserState {
  posts: string[]
}

const initialState: UserState = {
  posts: []
};

export function userReducer(state: UserState = initialState): UserState {
  return state;
};
 */