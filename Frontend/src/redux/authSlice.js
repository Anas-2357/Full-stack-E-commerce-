import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance';

// Define initial state
const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  status: 'idle',
  error: null,
};

// Thunks for async actions
export const registerUser = createAsyncThunk('auth/registerUser', async (userData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post('/user/register', userData);
    return response.data; // Assuming the response contains { user, accessToken, refreshToken }
  } catch (error) {
    return rejectWithValue(error.response.data); // Return the error response
  }
});

export const loginUser = createAsyncThunk('auth/loginUser', async (userData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post('/user/login', userData);
    return response.data; // Assuming the response contains { user, accessToken, refreshToken, message, statusCode }
  } catch (error) {
    return rejectWithValue(error.response.data); // Return the error response
  }
});

export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, { rejectWithValue }) => {
  try {
    await axiosInstance.post('/user/logout');
  } catch (error) {
    return rejectWithValue(error.response.data); // Return the error response
  }
});

export const fetchUserProfile = createAsyncThunk('auth/fetchUserProfile', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get('/user/view-profile');
    return response.data; // Assuming the response contains { user }
  } catch (error) {
    return rejectWithValue(error.response.data); // Return the error response
  }
});

// Create slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload; // Display error message
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.data; // Updated to match the structure of your response
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload; // Display error message
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload; // Display error message
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
