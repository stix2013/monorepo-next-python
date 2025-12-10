import { NextResponse } from 'next/server';

export async function GET() {
  const data = {
    title: "About This Project",
    subtitle: "A modern full-stack application demonstrating best practices.",
    frontend: {
      title: "Frontend Stack",
      items: [
        { name: "Next.js", description: "The React Framework for the Web" },
        { name: "Bun", description: "A fast all-in-one JavaScript runtime" },
        { name: "TailwindCSS", description: "A utility-first CSS framework" },
      ],
    },
    backend: {
      title: "Backend Stack",
      items: [
        { name: "FastAPI", description: "Modern, fast (high-performance), web framework for building APIs with Python 3.6+" },
        { name: "uv", description: "An extremely fast Python package installer and resolver" },
      ],
    },
    philosophy: {
      title: "Development Philosophy",
      description: "This project is built with a focus on modularity, performance, and developer experience. We believe in API-first design, automated workflows, and clean, maintainable code. The goal is to create a robust foundation that scales with the needs of the product.",
    },
  };

  return NextResponse.json(data);
}
