# 🎨 Black Theme Design & MetaMask Integration Guide

## 🌟 Design Updates

### Color Scheme
Your HowTo app now features a sleek, modern black theme:

- **Primary Background**: Pure Black (#0a0a0a, #000000)
- **Secondary Background**: Dark Gray (#1a1a1a, #111827)
- **Card Background**: Gray-900 (#111827)
- **Accent Colors**: 
  - Orange (#f97316) - Primary actions
  - Pink (#ec4899) - Secondary accents
  - Gradient: Orange to Pink for CTAs
- **Text Colors**:
  - Primary: White (#ffffff)
  - Secondary: Gray-300 (#d1d5db)
  - Muted: Gray-400 (#9ca3af)
- **Borders**: Gray-800 (#1f2937), Gray-700 (#374151)

### Updated Components

#### 1. **Navbar**
- Black background with border-bottom
- Sticky positioning with backdrop blur
- Gradient buttons for wallet connection
- Smooth hover effects with color transitions

#### 2. **Login & Register Pages**
- Centered card layout with dark background
- Gradient backgrounds (black to gray-900)
- Rounded corners with border styling
- Gradient submit buttons
- Enhanced input fields with focus states

#### 3. **Product Cards**
- Dark card backgrounds with hover effects
- Border color changes on hover (orange)
- Image zoom effect on hover
- Gradient "Add to Cart" buttons
- Orange accent for category tags and prices

#### 4. **Cart Page**
- Dark table layout with borders
- Rounded containers
- Enhanced quantity controls
- Gradient checkout section
- Improved visual hierarchy

#### 5. **Slider/Hero Section**
- Dark overlay on images for better text readability
- Gradient buttons with smooth transitions
- Enhanced navigation buttons with backdrop blur

#### 6. **Footer**
- Black background with top border
- Minimalist design
- Brand colors maintained

### Custom Scrollbar
- Dark theme scrollbar with gradient thumb
- Orange to pink gradient on scroll thumb
- Smooth hover effects

---

## 🦊 MetaMask Integration

### Features Implemented

#### 1. **Wallet Connection**
- One-click MetaMask connection
- Beautiful gradient button in navbar
- Loading states during connection
- Error handling with toast notifications

#### 2. **Wallet Display**
- Shows shortened wallet address (0x1234...5678)
- Ethereum icon indicator
- Gradient styling for connected state
- Click to disconnect functionality

#### 3. **Auto-Reconnection**
- Automatically detects if wallet was previously connected
- Restores connection on page reload
- Maintains wallet state in Redux

#### 4. **Event Listeners**
- **Account Changes**: Detects when user switches accounts
- **Chain Changes**: Detects network switches (with page reload)
- **Disconnect Events**: Handles wallet disconnection

#### 5. **Multi-Network Support**
- Ethereum Mainnet
- Goerli Testnet
- Sepolia Testnet
- Polygon Mainnet & Mumbai
- BSC Mainnet & Testnet

### Files Created

1. **`src/features/wallet/walletSlice.js`**
   - Redux slice for wallet state management
   - Actions: connectWallet, disconnectWallet
   - State: account, chainId, isConnected, isLoading, error

2. **`src/utils/metamask.js`**
   - Utility functions for MetaMask
   - Event listener setup
   - Connection checking
   - Chain name mapping

### How to Use MetaMask

#### For Users:
1. Install MetaMask browser extension
2. Create or import a wallet
3. Visit your HowTo app
4. Click "Connect Wallet" button in navbar
5. Approve connection in MetaMask popup
6. Your wallet address will appear in navbar

#### For Developers:

**Check if MetaMask is installed:**
```javascript
if (window.ethereum) {
  // MetaMask is installed
}
```

**Connect Wallet:**
```javascript
import { connectWallet } from '../features/wallet/walletSlice';

const handleConnect = async () => {
  try {
    await dispatch(connectWallet()).unwrap();
    toast.success("Wallet connected!");
  } catch (error) {
    toast.error(error);
  }
};
```

**Access Wallet State:**
```javascript
const { account, isConnected, chainId } = useSelector((state) => state.wallet);
```

**Disconnect Wallet:**
```javascript
dispatch(disconnectWallet());
```

### Redux Store Structure

```javascript
wallet: {
  account: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
  chainId: "0x1",
  isConnected: true,
  isLoading: false,
  error: null
}
```

---

## 🚀 Getting Started

### Installation

1. **Install Dependencies** (if not already done):
```bash
cd client
npm install
cd server
npm install
```

2. **Start the Client**:
```bash
cd client
npm start
```

3. **Start the Server**:
```bash
cd server
npm start
```

### Testing MetaMask

1. Install MetaMask extension from [metamask.io](https://metamask.io)
2. Create a test wallet
3. Switch to a testnet (Sepolia or Goerli)
4. Get test ETH from a faucet
5. Connect to your app

### Test Faucets:
- **Sepolia**: https://sepoliafaucet.com/
- **Goerli**: https://goerlifaucet.com/
- **Mumbai**: https://mumbaifaucet.com/

---

## 🎯 Key Features

### Design Features:
✅ Sleek black theme throughout
✅ Gradient accent colors (orange to pink)
✅ Smooth transitions and hover effects
✅ Custom scrollbar styling
✅ Responsive design maintained
✅ Enhanced visual hierarchy
✅ Modern card designs with borders
✅ Backdrop blur effects
✅ Dark mode toast notifications

### MetaMask Features:
✅ One-click wallet connection
✅ Auto-reconnection on page load
✅ Account change detection
✅ Network change detection
✅ Disconnect functionality
✅ Shortened address display
✅ Loading states
✅ Error handling
✅ Multi-network support
✅ Redux state management

---

## 🔧 Customization

### Change Accent Colors

Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#f97316', // Your primary color
      secondary: '#ec4899', // Your secondary color
    }
  }
}
```

### Modify Gradient

In components, change:
```javascript
className="bg-gradient-to-r from-orange-500 to-pink-500"
```

To your preferred gradient colors.

---

## 📱 Browser Compatibility

- ✅ Chrome (with MetaMask)
- ✅ Firefox (with MetaMask)
- ✅ Brave (built-in wallet)
- ✅ Edge (with MetaMask)
- ⚠️ Safari (limited MetaMask support)

---

## 🐛 Troubleshooting

### MetaMask Not Detected
- Ensure MetaMask extension is installed
- Refresh the page
- Check browser console for errors

### Connection Failed
- Check if MetaMask is unlocked
- Ensure you're on a supported network
- Try disconnecting and reconnecting

### Styling Issues
- Clear browser cache
- Check if Tailwind CSS is properly configured
- Verify all CSS files are imported

---

## 📚 Resources

- [MetaMask Documentation](https://docs.metamask.io/)
- [Ethereum JSON-RPC API](https://ethereum.org/en/developers/docs/apis/json-rpc/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)

---

## 🎉 What's New

### Design:
- Complete black theme redesign
- Modern gradient buttons
- Enhanced card designs
- Custom scrollbar
- Improved visual hierarchy
- Dark mode toast notifications

### Functionality:
- MetaMask wallet integration
- Auto-reconnection feature
- Account/network change detection
- Wallet state management
- Multi-network support

---

**Enjoy your new sleek, modern HowTo app with Web3 capabilities! 🚀**
