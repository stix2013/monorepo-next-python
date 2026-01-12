import { test as base, type Page } from '@playwright/test';

export interface TestFixtures {
  apiHealth: boolean;
}

const test = base.extend<TestFixtures>({
  apiHealth: async ({ request }, use) => {
    // Pre-test: Check API health
    const healthResponse = await request.get('http://localhost:8000/health');
    const isHealthy = healthResponse.status() === 200;
    
    if (!isHealthy) {
      console.warn('⚠️ API health check failed. Some tests may not work correctly.');
    }
    
    await use(isHealthy);
  },
});

export { test };
export type { Page };