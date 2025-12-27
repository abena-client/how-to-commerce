import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  account: null,
  chainId: null,
  isConnected: false,
  isLoading: false,
  error: null
};

// Connect to MetaMask
export const connectWallet = createAsyncThunk(
  'wallet/connect',
  async (_, thunkAPI) => {
    try {
      if (!window.ethereum) {
        throw new Error('MetaMask is not installed. Please install MetaMask to continue.');
      }

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      const chainId = await window.ethereum.request({
        method: 'eth_chainId'
      });

      return {
        account: accounts[0],
        chainId
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Disconnect wallet
export const disconnectWallet = createAsyncThunk(
  'wallet/disconnect',
  async () => {
    return null;
  }
);

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setAccount: (state, action) => {
      state.account = action.payload;
      state.isConnected = !!action.payload;
    },
    setChainId: (state, action) => {
      state.chainId = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(connectWallet.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(connectWallet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.account = action.payload.account;
        state.chainId = action.payload.chainId;
        state.isConnected = true;
        state.error = null;
      })
      .addCase(connectWallet.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isConnected = false;
      })
      .addCase(disconnectWallet.fulfilled, (state) => {
        state.account = null;
        state.chainId = null;
        state.isConnected = false;
      });
  }
});

export const { setAccount, setChainId, clearError } = walletSlice.actions;
export default walletSlice.reducer;
