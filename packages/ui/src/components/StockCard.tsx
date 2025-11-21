import React from 'react';

interface StockCardProps {
  symbol: string;
  price: number;
  change: number;
}

export function StockCard({ symbol, price, change }: StockCardProps) {
  const isPositive = change >= 0;
  const changeColor = isPositive ? 'text-green-600' : 'text-red-600';
  const arrow = isPositive ? '↑' : '↓';

  return (
    <div className="p-6 border rounded-lg shadow-md bg-white dark:bg-gray-800">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white">{symbol}</h3>
      <div className="mt-2 flex items-end justify-between">
        <span className="text-2xl font-semibold text-gray-900 dark:text-white">
          ${price.toFixed(2)}
        </span>
        <div className="flex items-center gap-1">
          <span className={`text-sm font-medium ${changeColor}`}>
            {arrow}
          </span>
          <span className={`text-sm font-medium ${changeColor}`}>
            {Math.abs(change).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
