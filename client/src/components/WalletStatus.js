import { useSelector } from 'react-redux';
import { SiEthereum } from 'react-icons/si';
import { getChainName } from '../utils/metamask';

const WalletStatus = () => {
  const { account, chainId, isConnected } = useSelector((state) => state.wallet);

  if (!isConnected) return null;

  const formatAddress = (address) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <div className="wallet-status fixed bottom-6 right-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-xl shadow-2xl border border-purple-400 z-50">
      <div className="flex items-center gap-3">
        <div className="bg-white bg-opacity-20 p-2 rounded-lg">
          <SiEthereum size={24} />
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-gray-200">Connected Wallet</span>
          <span className="font-mono font-semibold">{formatAddress(account)}</span>
          <span className="text-xs text-gray-200 mt-1">{getChainName(chainId)}</span>
        </div>
      </div>
    </div>
  );
};

export default WalletStatus;
