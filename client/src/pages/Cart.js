import {useEffect, useState} from "react"
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom"
import { currencyFormatter } from "../utlities/currencyFormatter";
import { BsArrowLeft } from "react-icons/bs";
import { FaTrash, FaMinus, FaPlus, FaShoppingCart, FaWallet } from "react-icons/fa";
// import { SiMetamask } from "react-icons/si";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart,clearCart ,decreaseCart,addToCart,getSubtotal} from "../features/products/cartSlice.js";
import { connectWallet } from "../features/wallet/walletSlice.js";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems: data ,cartTotalAmount:subtotal} = useSelector((state) => state.cart);
  const { account, isConnected, isLoading, error } = useSelector((state) => state.wallet);
  const [paymentMethod, setPaymentMethod] = useState('metamask');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const productCard = () => {
    navigate("/products");
  };

  const handleRemove = (product) => {
    dispatch(removeFromCart(product));
  };

  const handleDecrease=(product)=>{
    dispatch(decreaseCart(product))
  }

  const handleIncrease=(product)=>{
    dispatch(addToCart(product))
  }

  // Calculate additional costs
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  // Convert USD to ETH (mock conversion rate - in real app, fetch from API)
  const ethPrice = 2000; // $2000 per ETH (mock rate)
  const totalInEth = (total / ethPrice).toFixed(6);

  const handleConnectWallet = async () => {
    try {
      await dispatch(connectWallet()).unwrap();
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  const handleMetaMaskPayment = async () => {
    if (!isConnected) {
      await handleConnectWallet();
      return;
    }

    setIsProcessing(true);
    try {
      // Convert total to Wei (1 ETH = 10^18 Wei)
      const totalWei = (parseFloat(totalInEth) * Math.pow(10, 18)).toString(16);
      
      const transactionParameters = {
        to: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6', // Your wallet address
        from: account,
        value: '0x' + totalWei,
        gas: '0x5208', // 21000 gas limit for simple transfer
      };

      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      });

      // Clear cart after successful payment
      dispatch(clearCart());
      
      alert(`Payment successful! Transaction hash: ${txHash}`);
      navigate('/');
      
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    dispatch(getSubtotal())
  }, [data,dispatch])
  

  
  return (
    <div className="cart-section min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-10 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold space-font mb-4">
            <FaShoppingCart className="inline-block mr-4 text-orange-500" />
            Shopping <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">Cart</span>
          </h1>
          <p className="text-gray-400 text-lg">
            {data.length > 0 ? `You have ${data.length} item${data.length > 1 ? "s" : ""} in your cart` : "Your cart is empty"}
          </p>
        </div>

        {/* Empty Cart */}
        {data.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-12 max-w-md mx-auto">
              <FaShoppingCart className="text-6xl text-gray-600 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Your cart is empty</h3>
              <p className="text-gray-400 mb-8">Looks like you haven't added any items to your cart yet.</p>
              <Link 
                to="/products" 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold py-3 px-8 rounded-xl transition-all transform hover:scale-105"
              >
                Start Shopping
              </Link>
            </div>
          </div>
        )}

        {/* Cart with Items */}
        {data.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 border-b border-gray-700">
                  <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-400 uppercase tracking-wider">
                    <div className="col-span-6">Product</div>
                    <div className="col-span-2 text-center">Price</div>
                    <div className="col-span-2 text-center">Quantity</div>
                    <div className="col-span-2 text-center">Total</div>
                  </div>
                </div>

                {/* Cart Items */}
                <div className="divide-y divide-gray-800">
                  {data?.map((product) => (
                    <div key={product._id} className="p-6 hover:bg-gray-800/50 transition-colors">
                      <div className="grid grid-cols-12 gap-4 items-center">
                        {/* Product Info */}
                        <div className="col-span-6 flex items-center gap-4">
                          <div className="relative group">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-20 h-20 object-cover rounded-lg border border-gray-700 group-hover:border-orange-500 transition-colors"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-white font-medium text-lg mb-1 truncate">{product.name}</h3>
                            <p className="text-gray-400 text-sm mb-2">{product.brand}</p>
                            <button
                              onClick={() => handleRemove(product)}
                              className="flex items-center gap-1 text-red-400 hover:text-red-300 text-sm transition-colors"
                            >
                              <FaTrash className="text-xs" />
                              Remove
                            </button>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="col-span-2 text-center">
                          <span className="text-orange-500 font-semibold text-lg">
                            {currencyFormatter(product.price)}
                          </span>
                        </div>

                        {/* Quantity */}
                        <div className="col-span-2 flex justify-center">
                          <div className="flex items-center border border-gray-700 rounded-lg overflow-hidden">
                            <button 
                              onClick={() => handleDecrease(product)}
                              className="p-2 bg-gray-800 hover:bg-orange-500 text-white transition-colors"
                            >
                              <FaMinus className="text-xs" />
                            </button>
                            <span className="px-4 py-2 bg-gray-800 text-white font-medium min-w-[3rem] text-center">
                              {product.cartQuantity}
                            </span>
                            <button 
                              onClick={() => handleIncrease(product)}
                              className="p-2 bg-gray-800 hover:bg-orange-500 text-white transition-colors"
                            >
                              <FaPlus className="text-xs" />
                            </button>
                          </div>
                        </div>

                        {/* Total */}
                        <div className="col-span-2 text-center">
                          <span className="text-white font-bold text-lg">
                            {currencyFormatter(product.price * product.cartQuantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Clear Cart */}
                <div className="p-6 border-t border-gray-800">
                  <button
                    onClick={() => dispatch(clearCart())}
                    className="flex items-center gap-2 text-red-400 hover:text-red-300 font-medium transition-colors"
                  >
                    <FaTrash />
                    Clear All Items
                  </button>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sticky top-6">
                <h3 className="text-2xl font-bold text-white mb-6">Order Summary</h3>
                
                {/* Cost Breakdown */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal ({data.length} items)</span>
                    <span>{currencyFormatter(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? "text-green-400" : ""}>
                      {shipping === 0 ? "FREE" : currencyFormatter(shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Tax</span>
                    <span>{currencyFormatter(tax)}</span>
                  </div>
                  <div className="border-t border-gray-700 pt-4">
                    <div className="flex justify-between text-xl font-bold text-white">
                      <span>Total</span>
                      <span className="text-orange-500">{currencyFormatter(total)}</span>
                    </div>
                  </div>
                </div>

                {/* Free Shipping Notice */}
                {shipping > 0 && (
                  <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3 mb-6">
                    <p className="text-orange-400 text-sm">
                      Add {currencyFormatter(100 - subtotal)} more for FREE shipping!
                    </p>
                  </div>
                )}

                {/* Payment Methods */}
                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-3">Payment Method</h4>
                  <div className="space-y-3">
                    <button
                      onClick={() => setPaymentMethod('metamask')}
                      className={`w-full p-4 border rounded-xl transition-all flex items-center justify-between ${
                        paymentMethod === 'metamask' 
                          ? 'border-orange-500 bg-orange-500/10 text-orange-400' 
                          : 'border-gray-700 text-gray-400 hover:border-gray-600'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <FaWallet className="text-2xl text-orange-500" />
                        <div className="text-left">
                          <div className="font-semibold">MetaMask</div>
                          <div className="text-xs opacity-75">Pay with Ethereum</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{totalInEth} ETH</div>
                        <div className="text-xs opacity-75">≈ {currencyFormatter(total)}</div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Wallet Status */}
                {!isConnected && (
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 mb-4">
                    <p className="text-blue-400 text-sm flex items-center gap-2">
                      <FaWallet />
                      Connect your MetaMask wallet to proceed
                    </p>
                  </div>
                )}

                {isConnected && (
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 mb-4">
                    <p className="text-green-400 text-sm flex items-center gap-2">
                      <FaWallet />
                      Wallet Connected: {account?.slice(0, 6)}...{account?.slice(-4)}
                    </p>
                  </div>
                )}

                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-4">
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                )}

                {/* Checkout Button */}
                <button
                  onClick={handleMetaMaskPayment}
                  disabled={isLoading || isProcessing}
                  className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-4 px-6 rounded-xl transition-all transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg hover:shadow-orange-500/25"
                >
                  {isLoading || isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      {isConnected ? 'Processing...' : 'Connecting...'}
                    </>
                  ) : (
                    <>
                      <FaWallet />
                      {isConnected ? 'Pay with MetaMask' : 'Connect MetaMask'}
                    </>
                  )}
                </button>

                {/* Continue Shopping */}
                <button
                  className="w-full mt-4 flex items-center justify-center gap-2 text-orange-500 hover:text-orange-400 font-medium transition-colors"
                  onClick={productCard}
                >
                  <BsArrowLeft />
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
