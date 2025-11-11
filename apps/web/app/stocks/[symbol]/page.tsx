// apps/web/src/app/stocks/[symbol]/page.tsx
interface StockHistory {
  symbol: string;
  native_currency: string;
  target_currency?: string;
  exchange_rate?: number;
  period: string;
  data: Array<{
    date: string;
    close: number;
  }>;
}

export default async function StockPage({
  params,
  searchParams,
}: {
  params: { symbol: string };
  searchParams: { currency?: string };
}) {
  const currency = searchParams.currency || 'USD';
  const history = await fetch(
    `http://localhost:8000/api/stock/${params.symbol}/history?target_currency=${currency}`
  ).then(r => r.json());
  
  return (
    <div>
      <h1>{history.symbol} - {history.period}</h1>
      <p>
        Currency: {history.native_currency}
        {history.target_currency && ` → ${history.target_currency}`}
        {history.exchange_rate && ` (Rate: ${history.exchange_rate.toFixed(4)})`}
      </p>
      <pre>{JSON.stringify(history.data.slice(0, 5), null, 2)}</pre>
    </div>
  );
}