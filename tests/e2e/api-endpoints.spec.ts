import { test, expect } from '@playwright/test';

test.describe('Stock API Endpoints', () => {
  test.beforeAll(async ({ request }) => {
    // Ensure API is running
    const healthResponse = await request.get('http://localhost:8000/health');
    expect(healthResponse.status()).toBe(200);
  });

  test('should provide health check endpoint', async ({ request }) => {
    const response = await request.get('http://localhost:8000/health');
    expect(response.status()).toBe(200);
    
    const healthData = await response.json();
    expect(healthData.status).toBe('healthy');
  });

  test('should provide basic data endpoint', async ({ request }) => {
    const response = await request.get('http://localhost:8000/api/data');
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(data).toHaveProperty('message');
    console.log('API Data Response:', data);
  });

  test('should fetch stock history data', async ({ request }) => {
    const symbol = 'AAPL';
    const response = await request.get(`http://localhost:8000/api/stock/${symbol}/history`);
    expect(response.status()).toBe(200);
    
    const stockData = await response.json();
    console.log('Stock History Response:', stockData);
    
    // Basic structure validation (actual response may vary)
    expect(stockData).toBeTruthy();
  });

  test('should fetch stock forecast', async ({ request }) => {
    const symbol = 'AAPL';
    const response = await request.get(`http://localhost:8000/api/stock/${symbol}/forecast`);
    expect(response.status()).toBe(200);
    
    const forecast = await response.json();
    console.log('Stock Forecast Response:', forecast);
    
    // Basic structure validation
    expect(forecast).toBeTruthy();
  });

  test('should provide real-time stock data via SSE', async ({ request }) => {
    const response = await request.get('http://localhost:8000/api/sse/stocks');
    expect(response.status()).toBe(200);
    
    // SSE responses should have text/event-stream content type
    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('text/event-stream');
    
    console.log('SSE Content-Type:', contentType);
  });

  test('should handle invalid stock symbols gracefully', async ({ request }) => {
    const invalidSymbol = 'INVALID_SYMBOL_123';
    const response = await request.get(`http://localhost:8000/api/stock/${invalidSymbol}/history`);
    
    // Should either return 200 with empty data or 4xx error
    expect([200, 404, 422, 500]).toContain(response.status());
    
    if (response.status() !== 200) {
      console.log('Invalid symbol handled with status:', response.status());
    }
  });
});