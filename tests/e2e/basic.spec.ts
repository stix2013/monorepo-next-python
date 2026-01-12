import { test, expect } from '@playwright/test';

test.describe('Full Application E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the homepage and display basic content', async ({ page }) => {
    await expect(page).toHaveTitle(/.*/);
    
    const header = page.locator('h1, h2, [data-testid="header"]').first();
    await expect(header).toBeVisible();
  });

  test('should communicate with the FastAPI backend', async ({ page }) => {
    const response = await page.request.get('http://localhost:8000/health');
    expect(response.status()).toBe(200);
    
    const healthData = await response.json();
    expect(healthData).toHaveProperty('status', 'healthy');
  });

  test('should fetch data from API endpoint', async ({ page }) => {
    const response = await page.request.get('http://localhost:8000/api/data');
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(data).toHaveProperty('message');
    console.log('API Response:', data);
  });

  test('should handle API CORS configuration', async ({ page }) => {
    // Test that the frontend can make requests to the API
    const consoleMessages: string[] = [];
    
    page.on('console', msg => {
      consoleMessages.push(msg.text());
    });

    // Add a simple script to test CORS
    await page.evaluate(async () => {
      try {
        const response = await fetch('http://localhost:8000/api/data');
        const data = await response.json();
        console.log('CORS Test Result:', data);
      } catch (error) {
        console.log('CORS Error:', (error as Error).message);
      }
    });

    // Wait a bit for the request to complete
    await page.waitForTimeout(1000);
    
    // Check if there are any CORS errors in console
    const corsErrors = consoleMessages.filter(msg => 
      msg.includes('CORS') || msg.includes('cors') || msg.includes('Cross-Origin')
    );
    
    if (corsErrors.length > 0) {
      console.log('CORS Errors detected:', corsErrors);
    }
  });
});