'use client';

import { useSSE } from '../../hooks/use-sse';
import { StockCard } from '@stocks/ui';

interface StockData {
  symbol: string;
  price: number;
  change: number;
  timestamp: string;
}

export default function RealtimePage() {
  const { data, error, isConnected } = useSSE<StockData[]>('http://localhost:8000/api/sse/stocks');

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-950 via-blue-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white text-center md:text-left drop-shadow-lg">
            ⚡ Real-time Market Data
          </h1>

          <div className="mt-4 md:mt-0 flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-lg">
            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-400 animate-pulse' : 'bg-red-500'}`} />
            <span className="text-blue-100 font-medium text-sm">
              {isConnected ? 'Live Connection' : 'Disconnected'}
            </span>
            {error && (
              <span className="text-red-300 text-xs ml-2 font-bold">
                ! Error
              </span>
            )}
          </div>
        </div>

        {/* Grid Section */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 shadow-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data ? (
              data.map((stock) => (
                <div key={stock.symbol} className="transform hover:scale-105 transition duration-300">
                  <StockCard
                    symbol={stock.symbol}
                    price={stock.price}
                    change={stock.change}
                  />
                </div>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-20 text-blue-200/60">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mb-4"></div>
                <p className="text-lg">Waiting for market stream...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
