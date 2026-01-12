# Change Log

## Version 0.4.0

### New Features

- **Navigation Bar**: Implemented comprehensive navigation system across all pages.
  - Fixed navigation bar with backdrop blur and transparency effects.
  - Brand logo with StockTracker name and chart emoji.
  - Navigation links to all pages: Home, Stocks, Real-Time, About.
  - Active state highlighting for current page.
  - Mobile-responsive hamburger menu with smooth transitions.
  - Accessibility features with screen reader support.

### Improvements

- **Navigation Integration**: Added navigation component to root layout for consistent experience across all pages.
- **Page Layout Updates**: Adjusted spacing on all pages to accommodate fixed navigation bar.
- **Code Quality**: Fixed all linting issues and improved TypeScript type safety.
- **Testing Coverage**: Added comprehensive test suite for navigation functionality with 15+ test cases.

### Documentation

- **Development Guidelines**: Created comprehensive AGENTS.md file with build commands, code style guidelines, and development workflows.
- **File Standardization**: Renamed CHANGE.LOG to CHANGELOG.md following standard conventions.

### Technical Changes

#### `apps/web`
- Created `components/Navigation.tsx` with mobile-responsive navigation
- Updated `app/layout.tsx` to include navigation component
- Modified page spacing in: `home/page.tsx`, `stocks/page.tsx`, `realtime/page.tsx`, `about/page.tsx`
- Added `__tests__/Navigation.test.tsx` with comprehensive test coverage
- Fixed linting issues in `about/page.tsx` and `stocks/[symbol]/page.tsx`
- Removed unused imports and replaced `any` types with proper TypeScript interfaces

#### Root
- Created `AGENTS.md` with development guidelines for AI agents
- Renamed `CHANGE.LOG` to `CHANGELOG.md` for standard conventions

## Version 0.3.1

### Improvements

- **Unified Styling**: Updated `/realtime` and `/stocks` pages to match the modern branding of the `/home` page.
  - Implemented a consistent dark theme and glassmorphism UI.
  - Added a shared `Footer` component across all pages.
  - Standardized specific UI elements (Submit Button on Stocks page) to match the primary design language.

### Detailed Changes

#### `apps/web`
- Refactored `app/realtime/page.tsx` and `app/stocks/page.tsx` with updated layout and typography.
- Created `components/Footer.tsx` and integrated it into all main pages.
- Replaced native buttons with the shared `Button` component from `@stocks/ui`.

## Version 0.3.0

### New Features

- **Marketing Landing Page**: Implemented a modern, high-performance landing page.
  - Accessible at `/home` (root `/` redirects here).
  - Features Hero, Value Prop, Features, How It Works, Testimonials, and CTA sections.
  - Fully responsive mobile-first design.

### Detailed Changes

#### `apps/web`
- Created `app/home/page.tsx` with all landing page sections.
- Updated `app/globals.css` with new animations (`fade-in`, `slide-up`, `pulse`) and smooth scrolling.
- Updated `app/page.tsx` to redirect to `/home`.
- Improved metadata in `app/layout.tsx`.

#### `packages/ui`
- Added reusable components:
  - `Button`: Primary, secondary, and ghost variants.
  - `FeatureCard`: Glassmorphism card for feature display.
  - `Section`: Layout wrapper with background options.

## Version 0.2.1

### Improvements

- **Real-time Data Migration**: Replaced `Stockstir` with `YFinance` for the `/api/sse/stocks` endpoint.
  - Improved data update frequency from 5 minutes to **5 seconds**.
  - Implemented non-blocking I/O for `yfinance` calls to prevent SSE connection drops.
  - Added "jitter" to stock prices to simulate activity during off-market hours.

### Detailed Changes

#### `apps/api`
- Updated `pyproject.toml` to replace `stockstir` with `yfinance`.
- Refactored `main.py`:
  - `stock_generator` now runs in a separate thread using `asyncio.to_thread`.
  - Added fallback logic for data fetching.
  - Implemented jitter for static data.

## Version 0.2.0

### New Features

- **Stock Price Forecasting**: Implemented a new feature to forecast future stock prices using a machine learning model.
  - A new API endpoint `/api/forecast/{symbol}` provides the forecast data.
  - The frontend now includes a `ForecastWidget` on the stock details page to visualize the forecast.

### Detailed Changes

#### `apps/api`
- Added new machine learning dependencies including `tensorflow`, `scikit-learn`, and `keras`.
- Implemented the `/forecast/{symbol}` endpoint in `main.py`.
- Added a new package `packages/ml-forecast` to house the machine learning model and forecasting service.

#### `apps/web`
- Added a new `ForecastWidget` to the stock details page to display the forecast data.

#### `packages/ui`
- Created a reusable `Forecast` component.
- Exported the `ForecastWidget` for use in the web app.

#### `packages/py-finance`
- Added logging to `stock_service.py` for easier debugging.

