import React, { useState } from "react";
import axios from "axios";
import { FaCreditCard, FaSpinner, FaLock } from "react-icons/fa";

const PayButton = ({ data }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCheckout = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.post(`http://localhost:4000/api/stripe/create-checkout-session`, {
        data,
        userId: 3,
      });
      
      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (err) {
      setError("Payment failed. Please try again.");
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full space-y-3">
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg text-sm">
          {error}
        </div>
      )}
      
      <button
        onClick={handleCheckout}
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-4 px-6 rounded-xl transition-all transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg hover:shadow-orange-500/25"
      >
        {isLoading ? (
          <>
            <FaSpinner className="animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <FaCreditCard />
            Secure Checkout
          </>
        )}
      </button>
      
      <div className="flex items-center justify-center gap-2 text-gray-400 text-xs">
        <FaLock />
        <span>Secured by Stripe • SSL Encrypted</span>
      </div>
    </div>
  );
};

export default PayButton;
