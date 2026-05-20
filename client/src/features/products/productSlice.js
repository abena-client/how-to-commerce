import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  status: null,
  backendAvailable: true,
  backendError: null,
};

// API configuration from environment variables
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';
const API_TIMEOUT = parseInt(process.env.REACT_APP_API_TIMEOUT || '10000');
const ENABLE_BACKEND_CHECK = process.env.REACT_APP_ENABLE_BACKEND_CHECK !== 'false';

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

export const productsFetching = createAsyncThunk(
  "Products/productsFetching",
  async (_, { rejectWithValue }) => {
    // Check if backend is available
    const isBackendHealthy = await checkBackendHealth();
    if (!isBackendHealthy) {
      throw new Error('Backend server is not available. Please make sure the server is running on port 4000.');
    }

    try {
      const res = await axios.get(
        `${API_URL}/api/products`,
        { timeout: API_TIMEOUT }
      );
      return res.data;
    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        throw new Error(`Backend request timed out after ${API_TIMEOUT}ms. The server might be down or slow.`);
      } else if (error.code === 'ERR_NETWORK') {
        throw new Error('Cannot connect to backend server. Please make sure the server is running on port 4000.');
      }
      throw error;
    }
  }
);

export const productSlice = createSlice({
  name: "Products",
  initialState,
  reducers: {
    setBackendAvailable: (state, action) => {
      state.backendAvailable = action.payload;
    },
    setBackendError: (state, action) => {
      state.backendError = action.payload;
    },
    clearBackendError: (state) => {
      state.backendError = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(productsFetching.pending, (state, action) => {
      state.status = "Loading .......";
      state.backendError = null;
    });
    builder.addCase(productsFetching.fulfilled, (state, action) => {
      state.status = "";
      state.items = action.payload;
      state.backendAvailable = true;
      state.backendError = null;
    });
    builder.addCase(productsFetching.rejected, (state, action) => {
      state.status = "Backend Error";
      state.backendAvailable = false;
      state.backendError = action.error.message || "Something went wrong";
    });
  },
});

export const { setBackendAvailable, setBackendError, clearBackendError } = productSlice.actions;

export default productSlice.reducer;
