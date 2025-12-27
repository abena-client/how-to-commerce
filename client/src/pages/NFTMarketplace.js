import { useState, useEffect } from 'react';
import { FaEthereum, FaChartLine, FaUsers, FaFire, FaTrophy, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { BiTrendingUp, BiTrendingDown } from 'react-icons/bi';

const NFTMarketplace = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock NFT marketplace data
  const marketplaceData = [
    {
      id: 1,
      name: 'OpenSea',
      logo: '🌊',
      volume24h: 45678.5,
      volume7d: 312456.8,
      traders24h: 12543,
      traders7d: 78234,
      collections: 2345678,
      avgPrice: 0.85,
      change24h: 12.5,
      marketShare: 42.3,
      topCollection: 'Bored Ape Yacht Club',
    },
    {
      id: 2,
      name: 'Blur',
      logo: '💨',
      volume24h: 38234.2,
      volume7d: 267890.4,
      traders24h: 9876,
      traders7d: 65432,
      collections: 1234567,
      avgPrice: 1.23,
      change24h: -5.2,
      marketShare: 35.4,
      topCollection: 'Azuki',
    },
    {
      id: 3,
      name: 'Magic Eden',
      logo: '✨',
      volume24h: 12456.7,
      volume7d: 89234.5,
      traders24h: 5432,
      traders7d: 34567,
      collections: 567890,
      avgPrice: 0.45,
      change24h: 8.7,
      marketShare: 11.5,
      topCollection: 'DeGods',
    },
    {
      id: 4,
      name: 'LooksRare',
      logo: '👀',
      volume24h: 8765.3,
      volume7d: 56789.2,
      traders24h: 3456,
      traders7d: 23456,
      collections: 345678,
      avgPrice: 0.67,
      change24h: -2.3,
      marketShare: 8.1,
      topCollection: 'Moonbirds',
    },
    {
      id: 5,
      name: 'X2Y2',
      logo: '⚡',
      volume24h: 3456.8,
      volume7d: 23456.7,
      traders24h: 1234,
      traders7d: 8765,
      collections: 123456,
      avgPrice: 0.34,
      change24h: 15.6,
      marketShare: 3.2,
      topCollection: 'Doodles',
    },
  ];

  const topCollections = [
    { name: 'Bored Ape Yacht Club', volume: 15234.5, floor: 45.2, change: 5.3, sales: 234 },
    { name: 'CryptoPunks', volume: 12456.8, floor: 67.8, change: -2.1, sales: 189 },
    { name: 'Azuki', volume: 9876.3, floor: 12.4, change: 8.7, sales: 456 },
    { name: 'Mutant Ape Yacht Club', volume: 8765.2, floor: 8.9, change: 3.2, sales: 567 },
    { name: 'DeGods', volume: 7654.1, floor: 15.6, change: -4.5, sales: 345 },
    { name: 'Moonbirds', volume: 6543.9, floor: 6.7, change: 12.3, sales: 432 },
  ];

  const globalStats = {
    totalVolume24h: 108591.5,
    totalTraders24h: 32541,
    totalSales24h: 45678,
    avgSalePrice: 0.78,
    totalMarketCap: 15678234.5,
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(2)}K`;
    return num.toFixed(2);
  };

  const formatETH = (num) => {
    return `${num.toFixed(2)} ETH`;
  };

  return (
    <div className="nft-marketplace min-h-screen bg-black text-white py-10 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold space-font mb-4">
            NFT <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">Marketplace</span> Analytics
          </h1>
          <p className="text-gray-400 text-lg">
            Real-time rankings, trading volumes, and key metrics across top NFT marketplaces
          </p>
        </div>

        {/* Global Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 hover:border-orange-500 transition-all">
            <div className="flex items-center justify-between mb-2">
              <FaChartLine className="text-orange-500 text-2xl" />
              <span className="text-green-400 text-sm flex items-center gap-1">
                <FaArrowUp /> 12.5%
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-1">24h Volume</p>
            <p className="text-2xl font-bold">{formatETH(globalStats.totalVolume24h)}</p>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 hover:border-pink-500 transition-all">
            <div className="flex items-center justify-between mb-2">
              <FaUsers className="text-pink-500 text-2xl" />
              <span className="text-green-400 text-sm flex items-center gap-1">
                <FaArrowUp /> 8.3%
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-1">Active Traders</p>
            <p className="text-2xl font-bold">{formatNumber(globalStats.totalTraders24h)}</p>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 hover:border-purple-500 transition-all">
            <div className="flex items-center justify-between mb-2">
              <FaFire className="text-purple-500 text-2xl" />
              <span className="text-green-400 text-sm flex items-center gap-1">
                <FaArrowUp /> 15.7%
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-1">Total Sales</p>
            <p className="text-2xl font-bold">{formatNumber(globalStats.totalSales24h)}</p>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 hover:border-blue-500 transition-all">
            <div className="flex items-center justify-between mb-2">
              <FaEthereum className="text-blue-500 text-2xl" />
              <span className="text-red-400 text-sm flex items-center gap-1">
                <FaArrowDown /> 3.2%
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-1">Avg Sale Price</p>
            <p className="text-2xl font-bold">{formatETH(globalStats.avgSalePrice)}</p>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 hover:border-green-500 transition-all">
            <div className="flex items-center justify-between mb-2">
              <FaTrophy className="text-green-500 text-2xl" />
              <span className="text-green-400 text-sm flex items-center gap-1">
                <FaArrowUp /> 5.8%
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-1">Market Cap</p>
            <p className="text-2xl font-bold">{formatNumber(globalStats.totalMarketCap)}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex gap-2">
            <span className="text-gray-400 self-center">Timeframe:</span>
            {['24h', '7d', '30d', 'All'].map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTimeframe(time)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedTimeframe === time
                    ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        {/* Marketplace Rankings */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <FaTrophy className="text-orange-500" />
            Marketplace Rankings
          </h2>

          <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 p-4 bg-gray-800 border-b border-gray-700 font-semibold text-sm text-gray-400">
              <div className="col-span-1">#</div>
              <div className="col-span-3">Marketplace</div>
              <div className="col-span-2">24h Volume</div>
              <div className="col-span-2">Traders</div>
              <div className="col-span-2">Collections</div>
              <div className="col-span-1">Change</div>
              <div className="col-span-1">Share</div>
            </div>

            {/* Table Body */}
            {marketplaceData.map((marketplace, index) => (
              <div
                key={marketplace.id}
                className="grid grid-cols-12 gap-4 p-4 border-b border-gray-800 hover:bg-gray-800 transition-all items-center"
              >
                <div className="col-span-1">
                  <span className="text-2xl font-bold text-gray-600">#{index + 1}</span>
                </div>

                <div className="col-span-3 flex items-center gap-3">
                  <div className="text-4xl">{marketplace.logo}</div>
                  <div>
                    <p className="font-semibold text-white">{marketplace.name}</p>
                    <p className="text-xs text-gray-400">{marketplace.topCollection}</p>
                  </div>
                </div>

                <div className="col-span-2">
                  <p className="font-semibold text-white">{formatETH(marketplace.volume24h)}</p>
                  <p className="text-xs text-gray-400">{formatETH(marketplace.volume7d)} (7d)</p>
                </div>

                <div className="col-span-2">
                  <p className="font-semibold text-white">{formatNumber(marketplace.traders24h)}</p>
                  <p className="text-xs text-gray-400">{formatNumber(marketplace.traders7d)} (7d)</p>
                </div>

                <div className="col-span-2">
                  <p className="font-semibold text-white">{formatNumber(marketplace.collections)}</p>
                  <p className="text-xs text-gray-400">Avg: {formatETH(marketplace.avgPrice)}</p>
                </div>

                <div className="col-span-1">
                  <span
                    className={`flex items-center gap-1 font-semibold ${
                      marketplace.change24h > 0 ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {marketplace.change24h > 0 ? <BiTrendingUp /> : <BiTrendingDown />}
                    {Math.abs(marketplace.change24h)}%
                  </span>
                </div>

                <div className="col-span-1">
                  <div className="relative w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="absolute top-0 left-0 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full"
                      style={{ width: `${marketplace.marketShare}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{marketplace.marketShare}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Collections */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <FaFire className="text-pink-500" />
            Trending Collections
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topCollections.map((collection, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 hover:border-orange-500 hover:shadow-2xl hover:shadow-orange-500/20 transition-all transform hover:-translate-y-2"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-gray-600">#{index + 1}</span>
                    <div>
                      <h3 className="font-semibold text-white">{collection.name}</h3>
                      <p className="text-xs text-gray-400">{collection.sales} sales</p>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 ${
                      collection.change > 0
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {collection.change > 0 ? <FaArrowUp /> : <FaArrowDown />}
                    {Math.abs(collection.change)}%
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Volume</span>
                    <span className="font-semibold text-white">{formatETH(collection.volume)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Floor Price</span>
                    <span className="font-semibold text-orange-500">{formatETH(collection.floor)}</span>
                  </div>
                </div>

                <button className="w-full mt-4 py-2 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 rounded-lg font-medium transition-all transform hover:scale-105">
                  View Collection
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Market Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FaChartLine className="text-orange-500" />
              Market Insights
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                <div>
                  <p className="text-white font-medium">Trading volume up 12.5% in 24h</p>
                  <p className="text-gray-400 text-sm">Increased activity across all major marketplaces</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                <div>
                  <p className="text-white font-medium">OpenSea maintains market leadership</p>
                  <p className="text-gray-400 text-sm">42.3% market share with strong trader growth</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-pink-400 rounded-full mt-2"></div>
                <div>
                  <p className="text-white font-medium">Blue-chip NFTs showing resilience</p>
                  <p className="text-gray-400 text-sm">BAYC and CryptoPunks lead volume rankings</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FaUsers className="text-pink-500" />
              Trader Activity
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                <span className="text-gray-400">New Traders (24h)</span>
                <span className="text-white font-semibold">+2,345</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                <span className="text-gray-400">Active Wallets</span>
                <span className="text-white font-semibold">32,541</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                <span className="text-gray-400">Avg Trades/Trader</span>
                <span className="text-white font-semibold">1.4</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTMarketplace;
