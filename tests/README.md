# E2E Tests for NextJS + FastAPI Monorepo

This directory contains end-to-end tests for the full-stack NextJS + FastAPI application using Playwright.

## Prerequisites

- **bun**: Used for JavaScript package management and scripts
- **uv**: Used for Python package management and FastAPI backend
- **Playwright**: Already installed as a development dependency

## Setup

The tests are pre-configured with the necessary dependencies:

1. Playwright browser binaries are installed via `bunx playwright install chromium`
2. Test scripts are added to the root `package.json`

## Running Tests

### Development Mode
Start both servers and run tests in parallel:

```bash
# Start both servers and run e2e tests
bun run test:e2e
```

### UI Mode
Run tests with Playwright's interactive UI:

```bash
bun run test:e2e:ui
```

### Headed Mode
Run tests with browser visible:

```bash
bun run test:e2e:headed
```

### Watch Mode
Run tests in watch mode:

```bash
npx playwright test --watch
```

## Test Structure

### Test Files

1. **`basic.spec.ts`** - Basic connectivity and CORS tests
2. **`integration.spec.ts`** - Frontend-backend integration tests
3. **`api-endpoints.spec.ts`** - Direct API endpoint testing
4. **`frontend-homepage.spec.ts`** - Frontend UI component tests
5. **`fixtures.ts`** - Shared test fixtures and utilities

### Test Configuration

- **`playwright.config.ts`** - Playwright configuration
  - Auto-starts both FastAPI server (port 8000) and NextJS server (port 3000)
  - Configured for Chromium browser
  - HTML reporter with screenshots and videos on failure
  - Proper timeout handling for development vs CI environments

### API Endpoints Tested

- `GET /health` - Health check
- `GET /api/data` - Basic data endpoint
- `GET /api/stock/{symbol}/history` - Stock history data
- `GET /api/stock/{symbol}/forecast` - Stock forecast
- `GET /api/sse/stocks` - Server-sent events for real-time data

### Frontend Pages Tested

- `/home` - Main homepage with hero section, features, testimonials
- Button interactions and responsive design
- Footer and navigation elements

## Features

### Automated Server Management
- Tests automatically start both servers if not already running
- FastAPI server starts on port 8000 with uvicorn
- NextJS server starts on port 3000 with bun dev
- Servers are reused across test runs to speed up development

### Rich Test Reports
- HTML test reports with step-by-step screenshots
- Video recordings of test failures
- Automatic screenshot capture on test failures
- Console error logging

### Cross-Origin Testing
- Tests CORS configuration between frontend and backend
- Verifies API accessibility from browser context
- Error handling for network issues

### Development-Friendly
- Parallel test execution
- Fast test iterations with server reuse
- Detailed console output for debugging
- TypeScript support with proper type definitions

## Continuous Integration

The configuration supports CI environments:
- Configured retries and parallelization
- Proper timeout handling
- Server reuse in CI to avoid restart overhead

## Extending Tests

### Adding New Test Files
Create new `.spec.ts` files in `tests/e2e/` directory. They will be automatically discovered by Playwright.

### Adding New API Endpoints
1. Add tests in `api-endpoints.spec.ts`
2. Follow the pattern: `test('should test endpoint', async ({ request }) => { ... })`

### Adding New Frontend Pages
1. Add tests in `frontend-{page-name}.spec.ts`
2. Use page object model for complex interactions
3. Follow the existing patterns for element selection

### Custom Fixtures
Add new fixtures in `fixtures.ts` following the pattern:

```typescript
const test = base.extend<TestFixtures>({
  fixtureName: async ({ fixture1, fixture2 }, use) => {
    // Setup
    await use(fixtureValue);
    // Cleanup
  },
});
```

## Troubleshooting

### Port Conflicts
If ports 3000 or 8000 are already in use:
1. Stop any running servers
2. Kill processes using those ports: `lsof -ti:3000 | xargs kill`
3. Run tests again

### Server Startup Issues
- Check that `uv` is properly installed and configured
- Verify Python dependencies in `apps/api/pyproject.toml`
- Check NextJS dependencies in `apps/web/package.json`

### Browser Issues
- Reinstall Playwright browsers: `bunx playwright install chromium`
- Clear Playwright cache: `rm -rf ~/.cache/ms-playwright`

### Network Issues
- Verify CORS configuration in `apps/api/src/main.py`
- Check firewall settings for localhost access
- Ensure both servers are running before starting tests

## Development Workflow

1. Start development servers: `bun run dev`
2. Run e2e tests: `bun run test:e2e`
3. Fix failing tests
4. Add new features with corresponding e2e tests
5. Run tests before committing changes