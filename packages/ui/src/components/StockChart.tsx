'use client';

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import type { StockHistory } from '@stocks/shared';

interface StockChartProps {
  data: StockHistory;
}

export function StockChart({ data }: StockChartProps) {
  console.log('Rendering StockChart with data:', data);
  if (!data?.data?.length) {
    return <div className="text-center text-white/50 py-8">No data to display</div>;
  }

  const chartData = data.data.map(point => ({
    date: point.date,
    close: point.close,
  }));

  return (
    <div className="w-full h-full min-h-[300px]">
      <ResponsiveContainer width="100%" aspect={1.618} maxHeight={400}>
        <LineChart 
          data={chartData}
          margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(59, 130, 246, 0.2)" />
          <XAxis 
            dataKey="date" 
            stroke="#93c5fd"
            tick={{ fill: '#93c5fd', fontSize: 11 }}
            interval="preserveStartEnd"
          />
          <YAxis 
            stroke="#93c5fd"
            tick={{ fill: '#93c5fd', fontSize: 11 }}
            width={80}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'rgba(30, 41, 59, 0.95)',
              border: '1px solid rgba(59, 130, 246, 0.4)',
              borderRadius: '8px',
            }}
            labelStyle={{ color: '#93c5fd', fontWeight: 'bold' }}
            itemStyle={{ color: '#e2e8f0' }}
            formatter={(value: number) => [`${value.toFixed(2)}`, `Close Price`]}
          />
          <Legend 
            wrapperStyle={{ color: '#e2e8f0', fontSize: '14px' }}
            verticalAlign="top"
          />
          <Line 
            type="monotone" 
            dataKey="close" 
            stroke="#06b6d4"
            strokeWidth={1}
            dot={{ fill: '#06b6d4', r: 2, strokeWidth: 0 }}
            activeDot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#0f172a' }}
            name={`Close Price (${data.target_currency || data.native_currency})`}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}