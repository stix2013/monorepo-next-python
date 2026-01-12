# AGENTS.md - Development Guidelines for AI Agents

## Overview
StockTracker is a modern full-stack stock market application built with Next.js 16, React 19, Python FastAPI, and TypeScript. This guide provides essential commands and code style guidelines for AI agents working in this repository.

## Project Structure
```
/home/stevan/projects/AI/stocks/
├── apps/
│   ├── web/          # Next.js frontend (React 19)
│   └── api/          # Python FastAPI backend
├── packages/
│   ├── ui/           # Shared UI components
│   └── shared/       # Shared utilities/types
└── package.json      # Root workspace configuration
```

## Essential Commands

### Development
```bash
# Start both web and API concurrently (recommended)
npm run dev

# Start only web app
npm run dev:web
cd apps/web && npm run dev

# Start only API
npm run dev:api
cd apps/api && uv run uvicorn src.main:app --reload --port 8000
```

### Building & Linting
```bash
# Lint entire project
npm run lint

# Lint web app only (recommended before commits)
npm run lint:web

# Lint API only
npm run lint:api

# Build web app
cd apps/web && npm run build
```

### Testing
```bash
# Run all tests
cd apps/web && npm test

# Run specific test file
npm test Navigation.test.tsx

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui

# Run E2E tests in headed mode
npm run test:e2e:headed
```

## Code Style Guidelines

### TypeScript Configuration
- **Strict mode enabled** (`"strict": true` in tsconfig.json)
- **Target ES2017** for compatibility
- **JSX React 19** (`"jsx": "react-jsx"`)
- **Module resolution**: `"bundler"` for Next.js

### Import Conventions

#### Workspace Packages
```typescript
// Use workspace aliases for internal packages
import { Button, FeatureCard } from '@stocks/ui';
import { StockHistory } from '@stocks/shared';
```

#### External Libraries
```typescript
// Next.js imports
import { Metadata } from 'next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// React imports
import { useState } from 'react';

// UI libraries
import { StockChart } from '@stocks/ui';
```

#### Internal Components
```typescript
// Use relative paths for app components
import { Navigation } from '../components/Navigation';
import { Footer } from '../../components/Footer';

// For pages, use relative imports
import { Button, FeatureCard, Section } from '@stocks/ui';
```

### File Naming Conventions
- **Pages**: Use kebab-case in app router structure
  - `app/home/page.tsx`
  - `app/stocks/page.tsx`
  - `app/about/page.tsx`
- **Components**: Use PascalCase
  - `components/Navigation.tsx`
  - `components/Footer.tsx`
- **Hooks**: Use camelCase with 'use' prefix
  - `hooks/use-sse.ts`

### TypeScript Guidelines

#### Interface Naming
```typescript
// Use PascalCase for interfaces
interface StockData {
  symbol: string;
  price: number;
  timestamp: string;
}

// Use descriptive names
interface NavigationProps {
  isOpen: boolean;
  onToggle: () => void;
}
```

#### Function Components
```typescript
// Use explicit typing for props
interface ComponentProps {
  title: string;
  variant?: 'primary' | 'secondary';
}

// Use Readonly for component props in Next.js
export default function Component({
  title,
  variant = 'primary',
}: Readonly<ComponentProps>) {
  // Component implementation
}
```

#### API Responses
```typescript
// Define explicit interfaces for API responses
interface StockHistory {
  symbol: string;
  native_currency: string;
  target_currency?: string;
  period: string;
  data: Array<{
    date: string;
    close: number;
  }>;
}
```

### Error Handling
```typescript
// Use try-catch for async operations
async function fetchStockData(symbol: string): Promise<StockHistory> {
  try {
    const response = await fetch(`/api/stock/${symbol}/history`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching stock data:', error);
    throw error; // Re-throw for caller handling
  }
}
```

### Component Structure
```typescript
'use client';

import { useState } from 'react';
import { Button } from '@stocks/ui';

interface ComponentProps {
  initialValue?: string;
}

export function Component({ initialValue = '' }: ComponentProps) {
  const [value, setValue] = useState(initialValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle submit logic
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="border rounded px-3 py-2"
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}
```

### CSS and Styling
- **Use Tailwind CSS** for all styling
- **Follow dark theme** design patterns used in existing components
- **Use existing color schemes**: `bg-slate-900`, `text-blue-400`, `border-slate-700`
- **Component styling examples**:
```typescript
// Card component styling
<div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300">

// Button variants
<Button variant="primary" size="lg">Primary Button</Button>
<Button variant="secondary" size="sm">Secondary Button</Button>
```

### Testing Guidelines
```typescript
// Use React Testing Library
import { render, screen } from '@testing-library/react';
import { Navigation } from '../components/Navigation';

// Mock Next.js hooks
vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}));

// Test structure
describe('ComponentName', () => {
  it('renders correctly', () => {
    render(<ComponentName />);
    expect(screen.getByText('Expected Text')).toBeTruthy();
  });
});
```

### Linting Rules
- **No unused imports** - Remove all unused imports
- **No explicit `any` types** - Use proper TypeScript interfaces
- **No unused variables** - Remove unused declared variables
- **ESLint extends Next.js recommended configs**
- **TypeScript strict mode enforced**

### Next.js App Router Patterns
```typescript
// Layout files (app/layout.tsx)
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

// Page components
export default function PageName() {
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Page content */}
    </div>
  );
}

// Metadata export
export const metadata: Metadata = {
  title: 'Page Title',
  description: 'Page description',
};
```

### Performance Considerations
- **Use React Server Components** where possible
- **Implement proper loading states** for async operations
- **Optimize bundle size** - avoid unnecessary dependencies
- **Use React.memo** for expensive components if needed

### Security Guidelines
- **Never commit secrets** - Use environment variables
- **Validate all user inputs** on both client and server
- **Use TypeScript strict mode** for type safety
- **Sanitize data** before rendering

## Development Workflow
1. **Before coding**: Run `npm run lint:web` to check style
2. **During development**: Use `npm run dev:web` for fast feedback
3. **Before commits**: Run full linting and tests
4. **Testing**: Write tests for new components and functionality

This guide should be followed by all AI agents working in this codebase to maintain consistency and quality standards.