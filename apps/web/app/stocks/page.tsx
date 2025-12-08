'use client';

import { useState } from 'react';
import { StockHistory } from '@stocks/shared';
import { StockChart } from '@stocks/ui';
import { JSX } from 'react/jsx-runtime';
import { Footer } from '../../components/Footer';

export default function StockHistoryPage(): JSX.Element {
  const [symbol, setSymbol] = useState('');
  const [period, setPeriod] = useState('1y');
  const [targetCurrency, setTargetCurrency] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState<StockHistory | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const params = new URLSearchParams();
      params.append('period', period);
      if (targetCurrency) params.append('target_currency', targetCurrency);

      const response = await fetch(`http://localhost:8000/api/stock/${symbol}/history?${params.toString()}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8 text-center drop-shadow-lg">
            📈 Stock History Dashboard
          </h1>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 mb-8 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-blue-200 mb-2">Stock Symbol</label>
                <input
                  type="text"
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                  placeholder="e.g., AAPL"
                  className="w-full px-4 py-3 bg-slate-800/70 border border-blue-300/30 rounded-lg text-white placeholder-blue-300/60 focus:outline-none focus:ring-2 focus:ring-cyan-400 font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-blue-200 mb-2">Period</label>
                <select
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800/70 border border-blue-300/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                >
                  <option value="1mo" className="bg-slate-800">1 Month</option>
                  <option value="3mo" className="bg-slate-800">3 Months</option>
                  <option value="6mo" className="bg-slate-800">6 Months</option>
                  <option value="1y" className="bg-slate-800">1 Year</option>
                  <option value="2y" className="bg-slate-800">2 Years</option>
                  <option value="5y" className="bg-slate-800">5 Years</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-blue-200 mb-2">Target Currency (Optional)</label>
                <input
                  type="text"
                  value={targetCurrency}
                  onChange={(e) => setTargetCurrency(e.target.value.toUpperCase())}
                  placeholder="e.g., EUR"
                  className="w-full px-4 py-3 bg-slate-800/70 border border-blue-300/30 rounded-lg text-white placeholder-blue-300/60 focus:outline-none focus:ring-2 focus:ring-cyan-400 font-medium"
                />
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full mt-6 px-6 py-3 bg-linear-to-r from-cyan-400 to-blue-600 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-cyan-400 transform hover:scale-105 transition disabled:opacity-50 disabled:transform-none">
              {loading ? '⏳ Loading...' : '🚀 Get Stock Data'}
            </button>
          </form>

          {/* Error & Loading */}
          {error && <div className="bg-red-100/20 border border-red-400/30 text-red-100 px-6 py-4 rounded-xl mb-8">❌ {error}</div>}
          {loading && <div className="text-center text-cyan-300 text-xl mb-8">⏳ Loading...</div>}

          {/* Chart Section */}
          {data && (
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-4">📊 Price Chart</h3>

              {/* FIXED: Explicit dimensions, no aspect ratio */}
              <div className="w-full h-80 md:h-96 overflow-hidden">
                <StockChart data={data} />
              </div>
            </div>
          )}

          {/* Table */}
          {data && (
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 mt-8">
              <h2 className="text-2xl font-bold text-white mb-4">{data.symbol}</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-blue-300/20">
                  <thead className="bg-cyan-500/20">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-cyan-200">Date</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-cyan-200">Close Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.data.slice(0, 20).map((point) => (
                      <tr key={point.date} className="hover:bg-white/5">
                        <td className="px-6 py-4 text-sm text-blue-100">{point.date}</td>
                        <td className="px-6 py-4 text-sm font-semibold text-green-300">
                          {point.close.toFixed(2)} {data.target_currency || data.native_currency}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Forecast Widget */}
          {/* {data && <ForecastWidget symbol={data.symbol} />} */}
        </div>
      </div>
      <Footer />
    </div>
  );
}