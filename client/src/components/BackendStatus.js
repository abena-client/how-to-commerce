import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setBackendAvailable, clearBackendError } from '../features/products/productSlice';
import { toast } from 'react-toastify';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';
const ENABLE_BACKEND_CHECK = process.env.REACT_APP_ENABLE_BACKEND_CHECK !== 'false';

const BackendStatus = () => {
  const dispatch = useDispatch();
  const { backendAvailable, backendError } = useSelector((state) => state.products);
  const [isChecking, setIsChecking] = useState(false);
  const [lastCheckTime, setLastCheckTime] = useState(null);

  const checkBackendHealth = async () => {
    if (!ENABLE_BACKEND_CHECK) return true;
    
    setIsChecking(true);
    try {
      const response = await fetch(`${API_URL}/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(5000),
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.status === 'ok') {
          dispatch(setBackendAvailable(true));
          dispatch(clearBackendError());
          setLastCheckTime(new Date());
          return true;
        }
      }
      throw new Error('Backend health check failed');
    } catch (error) {
      console.error('Backend health check failed:', error.message);
      dispatch(setBackendAvailable(false));
      dispatch(clearBackendError());
      
      if (error.name === 'TimeoutError' || error.code === 'ECONNABORTED') {
        toast.error('Backend server is not responding. Please make sure the server is running on port 4000.', {
          position: 'top-right',
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
      } else if (error.code === 'ERR_NETWORK') {
        toast.error('Cannot connect to backend server. Please start the server first.', {
          position: 'top-right',
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
      }
      return false;
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    // Initial check
    checkBackendHealth();
    
    // Set up periodic checks every 30 seconds
    const intervalId = setInterval(() => {
      if (!backendAvailable) {
        checkBackendHealth();
      }
    }, 30000);
    
    return () => clearInterval(intervalId);
  }, [backendAvailable]);

  if (backendAvailable) {
    return null; // Don't show anything when backend is available
  }

  return (
    <div className="backend-status fixed top-4 right-4 z-50 bg-red-600 text-white p-4 rounded-lg shadow-lg max-w-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <svg 
            className="w-6 h-6 mr-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
          <div>
            <h3 className="font-bold">Backend Server Unavailable</h3>
            <p className="text-sm opacity-90">
              The application requires the backend server to be running.
            </p>
            {backendError && (
              <p className="text-sm mt-1 opacity-75">{backendError}</p>
            )}
          </div>
        </div>
        <button
          onClick={checkBackendHealth}
          disabled={isChecking}
          className="ml-4 px-3 py-1 bg-white text-red-600 rounded text-sm font-medium hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isChecking ? 'Checking...' : 'Retry'}
        </button>
      </div>
      <div className="mt-2 text-xs opacity-75">
        <p>Make sure the backend server is running on port 4000.</p>
        <p className="mt-1">
          Run: <code className="bg-black bg-opacity-30 px-1 py-0.5 rounded">npm start</code> from the project root
        </p>
      </div>
    </div>
  );
};

export default BackendStatus;