import { test, expect } from '@playwright/test';

test.describe('API and Frontend Integration Tests', () => {
  let apiResponse: any;

  test.beforeAll(async ({ request }) => {
    // Pre-test API setup
    const healthResponse = await request.get('http://localhost:8000/health');
    expect(healthResponse.status()).toBe(200);
    
    const dataResponse = await request.get('http://localhost:8000/api/data');
    expect(dataResponse.status()).toBe(200);
    apiResponse = await dataResponse.json();
  });

  test('should have API running and accessible', async ({ request }) => {
    const response = await request.get('http://localhost:8000/health');
    expect(response.status()).toBe(200);
    
    const healthData = await response.json();
    expect(healthData.status).toBe('healthy');
  });

  test('should demonstrate full API functionality', async ({ request }) => {
    // Test multiple API endpoints
    const endpoints = [
      { url: '/health', method: 'GET' },
      { url: '/api/data', method: 'GET' }
    ];

    for (const endpoint of endpoints) {
      const response = await request.get(`http://localhost:8000${endpoint.url}`);
      expect(response.status()).toBe(200);
      
      const data = await response.json();
      console.log(`${endpoint.method} ${endpoint.url}:`, data);
    }
  });

  test('should load and interact with frontend components', async ({ page }) => {
    await page.goto('/');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Check if basic page elements are present
    const body = page.locator('body');
    await expect(body).toBeVisible();
    
    // Look for common Next.js/React indicators
    const reactRoot = page.locator('#__next, [data-testid="app"], main');
    await expect(reactRoot.first()).toBeVisible();
    
    // Take a screenshot for debugging
    await page.screenshot({ path: 'frontend-loaded.png' });
  });

  test('should handle frontend-backend data flow', async ({ page }) => {
    // This test would be more meaningful once you have actual API endpoints
    // that the frontend calls to display data
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Simulate checking if frontend can access API data
    // This would be enhanced once you have real API calls in the frontend
    const canAccessApi = await page.evaluate(async () => {
      try {
        const response = await fetch('http://localhost:8000/api/data');
        const data = await response.json();
        return {
          success: true,
          data: data
        };
      } catch (error) {
        return {
          success: false,
          error: (error as Error).message
        };
      }
    });
    
    console.log('API Access Test Result:', canAccessApi);
    expect(canAccessApi.success).toBe(true);
  });
});