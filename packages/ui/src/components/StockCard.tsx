import React from 'react';

interface StockCardProps {
  symbol: string;
  price: number;
  change: number;
}

export function StockCard({ symbol, price, change }: StockCardProps) {
  const isPositive = change >= 0;
  const changeColor = isPositive ? 'text-green-500' : 'text-red-500';
  const changeBgColor = isPositive ? 'bg-green-500/10' : 'bg-red-500/10';
  const arrow = isPositive ? '↑' : '↓';

  return (
    <div className="group relative bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-lg hover:shadow-xl hover:border-slate-600 transition-all duration-300 ease-in-out hover:-translate-y-1">
      {/* Symbol */}
      <h3 className="text-base font-bold text-slate-100 mb-3 tracking-wide">{symbol}</h3>

      {/* Price and Change Container */}
      <div className="flex items-end justify-between gap-3">
        {/* Price */}
        <span className="text-3xl font-bold text-white transition-all duration-500 ease-out">
          ${price.toFixed(2)}
        </span>

        {/* Change Badge */}
        <div className={`flex items-center gap-1 px-2.5 py-1 rounded-md ${changeBgColor} transition-all duration-300`}>
          <span className={`text-base font-bold ${changeColor} transition-colors duration-300`}>
            {arrow}
          </span>
          <span className={`text-sm font-semibold ${changeColor} transition-colors duration-300`}>
            {Math.abs(change).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
