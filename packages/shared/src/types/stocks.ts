// packages/shared/src/types/stocks.ts
export interface StockPricePoint {
  date: string;
  close: number;
}

export interface StockHistory {
  symbol: string;
  native_currency: string;
  target_currency?: string;
  exchange_rate?: number;
  period: string;
  data: StockPricePoint[];
}
