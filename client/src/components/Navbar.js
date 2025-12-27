import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { BsCart3 } from "react-icons/bs";
import { SiEthereum } from "react-icons/si";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { connectWallet, disconnectWallet, setAccount, setChainId } from "../features/wallet/walletSlice";
import { setupMetaMaskListeners, checkIfWalletIsConnected } from "../utils/metamask";
import { toast } from "react-toastify";
import brand from "./brand.png";

const Navbar = ({ isNavActiveStyles }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { account, isConnected, isLoading } = useSelector((state) => state.wallet);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if wallet is already connected on mount
    const checkConnection = async () => {
      const { connected, account: connectedAccount, chainId } = await checkIfWalletIsConnected();
      if (connected) {
        dispatch(setAccount(connectedAccount));
        dispatch(setChainId(chainId));
      }
    };
    checkConnection();

    // Setup MetaMask event listeners
    setupMetaMaskListeners(dispatch, setAccount, setChainId);
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    toast.success("Logged out successfully");
  };

  const handleWalletConnect = async () => {
    try {
      await dispatch(connectWallet()).unwrap();
      toast.success("Wallet connected successfully!");
    } catch (error) {
      toast.error(error);
    }
  };

  const handleWalletDisconnect = () => {
    dispatch(disconnectWallet());
    toast.info("Wallet disconnected");
  };

  const formatAddress = (address) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <div className="navbar-bg bg-black border-b border-gray-800 text-white h-20 flex justify-center items-center sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <div className="navbar container mx-auto flex justify-between items-center px-4">
        <div className="left">
          {/* <Link to="/" className="text-2xl font-bold space-font"> */}
               <img src={brand} alt="Brand Logo"  />
          {/* </Link> */}
        </div>
        <div className="right flex items-center gap-6">
          <NavLink to="/" className="nav-link text-gray-300 hover:text-white transition-colors" style={isNavActiveStyles}>
            Home
          </NavLink>
          <NavLink to="/products" className="nav-link text-gray-300 hover:text-white transition-colors" style={isNavActiveStyles}>
            Products
          </NavLink>
          <NavLink to="/nft-marketplace" className="nav-link text-gray-300 hover:text-white transition-colors" style={isNavActiveStyles}>
            NFT Analytics
          </NavLink>
          <Link to="/cart">
            <span className="cart-icons relative text-gray-300 hover:text-white transition-colors">
              <BsCart3 size={22} />
              <span className="cart-counter absolute -top-3 -right-3 text-xs bg-orange-500 h-5 w-5 rounded-full flex items-center justify-center font-medium">
                {cartItems.length}
              </span>
            </span>
          </Link>

          {/* MetaMask Wallet Button */}
          {isConnected ? (
            <button
              onClick={handleWalletDisconnect}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition-all"
            >
              <SiEthereum size={18} />
              {formatAddress(account)}
            </button>
          ) : (
            <button
              onClick={handleWalletConnect}
              disabled={isLoading}
              className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 px-4 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-50"
            >
              <SiEthereum size={18} />
              {isLoading ? "Connecting..." : "Connect Wallet"}
            </button>
          )}

          {user ? (
            <>
              <span className="text-sm text-gray-300">Hi, {user.data?.user?.name}</span>
              <button
                onClick={handleLogout}
                className="bg-gray-800 hover:bg-gray-700 border border-gray-700 px-4 py-2 rounded-lg text-sm transition-all"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="nav-link text-gray-300 hover:text-white transition-colors" style={isNavActiveStyles}>
                Login
              </NavLink>
              <NavLink to="/register" className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg text-sm font-medium transition-all">
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;