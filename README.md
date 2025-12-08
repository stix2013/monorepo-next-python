# Stocks Monorepo

This is a monorepo for a stocks application, consisting of a Next.js web frontend and a FastAPI backend.

## Project Structure

- `apps/web`: The Next.js frontend application.
- `apps/api`: The FastAPI backend application.
- `packages/shared`: A shared TypeScript package for the web app.
- `packages/py-finance`: A Python package with finance utilities for the api app.

### Landing Page

The application features a modern landing page at `/home` that demonstrates the value proposition and features of the platform.

- **URL**: `http://localhost:3000/home`
- **Features**: Responsive design, animations, and reusable UI components.

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/)
- [uv](https://github.com/astral-sh/uv)

### Installation

1.  **Install JavaScript dependencies:**

    From the root of the project, run:

    ```bash
    bun install
    ```

2.  **Install Python dependencies:**

    This project uses `uv` for Python package management. `uv` will create a virtual environment in each python project (`apps/api` and `packages/py-finance`).

    To install the dependencies for the API, run the following command from the root of the project:

    ```bash
    cd apps/api && uv sync
    ```

### Running the applications

You can run both the web and api applications concurrently using the following command from the root of the project:

```bash
bun run dev
```

This will start the Next.js development server on port 3000 and the FastAPI server on port 8000.

Alternatively, you can run them separately:

- **Web app:** `bun run dev:web`
- **API:** `bun run dev:api`
