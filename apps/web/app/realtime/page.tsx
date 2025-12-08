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
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <h1 className="text-4xl font-bold text-white text-center md:text-left">
            ⚡ Real-time Market Data
          </h1>

          <div className="mt-4 md:mt-0 flex items-center gap-3 bg-slate-800 px-5 py-2.5 rounded-lg border border-slate-700">
            <div className={`w-2.5 h-2.5 rounded-full ${isConnected ? 'bg-green-400 animate-pulse' : 'bg-red-500'}`} />
            <span className="text-slate-200 font-medium text-sm">
              {isConnected ? 'Live Connection' : 'Disconnected'}
            </span>
            {error && (
              <span className="text-red-400 text-xs ml-2 font-bold">
                ! Error
              </span>
            )}
          </div>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {data ? (
            data.map((stock) => (
              <StockCard
                key={stock.symbol}
                symbol={stock.symbol}
                price={stock.price}
                change={stock.change}
              />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-24 text-slate-400">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-500 mb-4"></div>
              <p className="text-lg">Waiting for market stream...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
