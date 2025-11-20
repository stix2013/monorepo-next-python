'use client';

import { useState } from 'react';

interface Forecast {
  symbol: string;
  predicted_price: number;
  currency: string;
  confidence_interval: {
    lower: number;
    upper: number;
  };
  prediction_date: string;
}

export function ForecastWidget({ symbol }: { symbol: string }) {
  const [forecast, setForecast] = useState<Forecast | null>(null);
  const [loading, setLoading] = useState(false);

  const getForecast = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8000/api/stock/${symbol}/forecast`);
      const data = await res.json() as Forecast | null;
      setForecast(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-purple-900/20 backdrop-blur-md border border-purple-300/30 rounded-2xl p-6 mt-8">
      <h3 className="text-2xl font-bold text-purple-200 mb-4">🔮 Tomorrow's Forecast</h3>
      
      <button 
        onClick={getForecast}
        disabled={loading}
        className="mb-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
      >
        {loading ? 'Training Model...' : 'Generate Forecast'}
      </button>

      {forecast && (
        <div className="space-y-3">
          <div className="text-white">
            <span className="text-purple-200">Predicted Price:</span>
            <span className="text-3xl font-bold ml-2">${forecast.predicted_price.toFixed(2)}</span>
            <span className="text-sm text-purple-200 ml-1">{forecast.currency}</span>
          </div>
          
          <div className="text-sm text-purple-200">
            <p>Date: {forecast.prediction_date}</p>
            <p>Confidence Interval: ${forecast.confidence_interval.lower.toFixed(2)} - ${forecast.confidence_interval.upper.toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
  );
}
