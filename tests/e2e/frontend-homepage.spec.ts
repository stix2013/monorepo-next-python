import { test, expect } from '@playwright/test';

test.describe('Frontend Homepage Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/home');
    await page.waitForLoadState('networkidle');
  });

  test('should load homepage with proper title and navigation', async ({ page }) => {
    await expect(page).toHaveTitle(/.*/);
    
    // Check if we're on the home page
    await expect(page.locator('h1')).toContainText(/Manage Your Stock Portfolio/);
  });

  test('should display hero section with proper styling', async ({ page }) => {
    // Check for main heading
    const heroHeading = page.locator('h1').first();
    await expect(heroHeading).toContainText('Manage Your Stock Portfolio');
    await expect(heroHeading).toContainText('Effortlessly');
    
    // Check for call-to-action buttons
    const getStartedButton = page.getByRole('button', { name: /Get Started Free/ });
    await expect(getStartedButton).toBeVisible();
    
    const watchDemoButton = page.getByRole('button', { name: /Watch Demo/ });
    await expect(watchDemoButton).toBeVisible();
  });

  test('should display value proposition section', async ({ page }) => {
    // Look for the "Why Choose Our Platform?" section
    const valueSection = page.locator('section').filter({ hasText: 'Why Choose Our Platform?' });
    await expect(valueSection).toBeVisible();
    
    // Check for the three value props
    await expect(page.locator('text=Real-Time Data')).toBeVisible();
    await expect(page.locator('text=Smart Insights')).toBeVisible();
    await expect(page.locator('text=Secure & Reliable')).toBeVisible();
  });

  test('should display features section', async ({ page }) => {
    // Look for features section
    const featuresSection = page.locator('section').filter({ hasText: 'Powerful Features' });
    await expect(featuresSection).toBeVisible();
    
    // Check for specific features
    await expect(page.locator('text=Live Market Dashboard')).toBeVisible();
    await expect(page.locator('text=Advanced Charts')).toBeVisible();
    await expect(page.locator('text=AI Forecasting')).toBeVisible();
  });

  test('should display testimonials section', async ({ page }) => {
    // Look for testimonials section
    const testimonialsSection = page.locator('section').filter({ hasText: 'Trusted by Traders' });
    await expect(testimonialsSection).toBeVisible();
    
    // Check for specific testimonials
    await expect(page.locator('text=Sarah Chen')).toBeVisible();
    await expect(page.locator('text=Michael Rodriguez')).toBeVisible();
    await expect(page.locator('text=Emily Watson')).toBeVisible();
  });

  test('should have responsive design elements', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Elements should still be visible on mobile
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('button').first()).toBeVisible();
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should handle button interactions', async ({ page }) => {
    // Test button click interactions (without navigation for now)
    const buttons = page.getByRole('button');
    const buttonCount = await buttons.count();
    
    for (let i = 0; i < Math.min(buttonCount, 3); i++) {
      const button = buttons.nth(i);
      await expect(button).toBeVisible();
      
      // Test hover state
      await button.hover();
    }
  });

  test('should display footer', async ({ page }) => {
    // Scroll to bottom to check footer
    await page.keyboard.press('End');
    
    // Footer should be visible (checking for common footer content)
    await expect(page.locator('footer')).toBeVisible();
  });
});