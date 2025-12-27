// MetaMask utility functions and event listeners

export const setupMetaMaskListeners = (dispatch, setAccount, setChainId) => {
  if (!window.ethereum) return;

  // Listen for account changes
  window.ethereum.on('accountsChanged', (accounts) => {
    if (accounts.length === 0) {
      // User disconnected their wallet
      dispatch(setAccount(null));
    } else {
      // User switched accounts
      dispatch(setAccount(accounts[0]));
    }
  });

  // Listen for chain changes
  window.ethereum.on('chainChanged', (chainId) => {
    dispatch(setChainId(chainId));
    // Reload the page as recommended by MetaMask
    window.location.reload();
  });

  // Listen for disconnect
  window.ethereum.on('disconnect', () => {
    dispatch(setAccount(null));
  });
};

export const checkIfWalletIsConnected = async () => {
  if (!window.ethereum) {
    return { connected: false, account: null };
  }

  try {
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    if (accounts.length > 0) {
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      return {
        connected: true,
        account: accounts[0],
        chainId
      };
    }
    return { connected: false, account: null };
  } catch (error) {
    console.error('Error checking wallet connection:', error);
    return { connected: false, account: null };
  }
};

export const getChainName = (chainId) => {
  const chains = {
    '0x1': 'Ethereum Mainnet',
    '0x5': 'Goerli Testnet',
    '0xaa36a7': 'Sepolia Testnet',
    '0x89': 'Polygon Mainnet',
    '0x13881': 'Mumbai Testnet',
    '0x38': 'BSC Mainnet',
    '0x61': 'BSC Testnet'
  };
  return chains[chainId] || 'Unknown Network';
};
