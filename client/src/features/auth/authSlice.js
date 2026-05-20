import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// API configuration from environment variables
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';
const API_TIMEOUT = parseInt(process.env.REACT_APP_API_TIMEOUT || '10000');
const ENABLE_BACKEND_CHECK = process.env.REACT_APP_ENABLE_BACKEND_CHECK !== 'false';
const AUTH_API_URL = `${API_URL}/api/auth`;

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: user ? user : null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
  backendAvailable: true,
  backendError: null
};

// Check backend health before making API calls
async function checkBackendHealth() {
  if (!ENABLE_BACKEND_CHECK) return true;
  
  try {
    const response = await axios.get(`${API_URL}/health`, {
      timeout: 5000, // Shorter timeout for health check
    });
    return response.data.status === 'ok';
  } catch (error) {
    console.error('Backend health check failed:', error.message);
    return false;
  }
}

// Register user
export const register = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    // Check if backend is available
    const isBackendHealthy = await checkBackendHealth();
    if (!isBackendHealthy) {
      return thunkAPI.rejectWithValue('Backend server is not available. Please make sure the server is running on port 4000.');
    }

    try {
      const response = await axios.post(`${AUTH_API_URL}/register`, userData, {
        timeout: API_TIMEOUT
      });
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        return thunkAPI.rejectWithValue(`Backend request timed out after ${API_TIMEOUT}ms. The server might be down or slow.`);
      } else if (error.code === 'ERR_NETWORK') {
        return thunkAPI.rejectWithValue('Cannot connect to backend server. Please make sure the server is running on port 4000.');
      }
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login user
export const login = createAsyncThunk(
  'auth/login',
  async (userData, thunkAPI) => {
    // Check if backend is available
    const isBackendHealthy = await checkBackendHealth();
    if (!isBackendHealthy) {
      return thunkAPI.rejectWithValue('Backend server is not available. Please make sure the server is running on port 4000.');
    }

    try {
      const response = await axios.post(`${AUTH_API_URL}/login`, userData, {
        timeout: API_TIMEOUT
      });
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        return thunkAPI.rejectWithValue(`Backend request timed out after ${API_TIMEOUT}ms. The server might be down or slow.`);
      } else if (error.code === 'ERR_NETWORK') {
        return thunkAPI.rejectWithValue('Cannot connect to backend server. Please make sure the server is running on port 4000.');
      }
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Logout user
export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('user');
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
