# Changes

## README.md

- Updated with more detailed instructions on how to set up and run the project.
- Includes information about the project structure, prerequisites, and installation steps for both the frontend and backend.

## apps/api

- Removed unused import `StockHistory` from `main.py`.

## apps/web

- Added `@stocks/ui` and `recharts` as dependencies.
- Updated dev dependencies to newer versions.
- Added paths for `@stocks/shared` and `@stocks/ui` in `tsconfig.json`.
- Added new page `apps/web/app/stocks/page.tsx`.

## packages/shared

- Removed the `ApiResponse` interface.
- Added `API_BASE_URL` constant.
- Exported all types from `stocks.ts` and `api.ts`.
- Added new types in `packages/shared/src/types/`.

## packages/ui

- Added new package `@stocks/ui`.
