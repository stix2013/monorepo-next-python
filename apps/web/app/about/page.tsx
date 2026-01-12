import { Section } from '@stocks/ui';
import { Metadata } from 'next';
import { Footer } from '../../components/Footer';

interface TechItem {
  name: string;
  description: string;
}

interface TechStack {
  title: string;
  items: TechItem[];
}

interface Philosophy {
  title: string;
  description: string;
}

export const metadata: Metadata = {
  title: 'About',
};

async function getAboutData(): Promise<{
  title: string;
  subtitle: string;
  frontend: TechStack;
  backend: TechStack;
  philosophy: Philosophy;
}> {
  try {
    const res = await fetch('http://localhost:3000/api/about', {
      next: { revalidate: 3600 }
    });

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching about data:', error);
    // Fallback data in case the server is not running directly or build time fetch issues
    return {
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
  }
}

export default async function AboutPage() {
  const data = await getAboutData();

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <Section className="pt-28 pb-16 md:pt-36 md:pb-24 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
          {data.title}
        </h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto animate-slide-up">
          {data.subtitle}
        </p>
      </Section>

      {/* Tech Stack Section */}
      <Section background="subtle" id="tech-stack">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Frontend Stack */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 hover:border-blue-500/30 transition-all">
            <h2 className="text-3xl font-bold text-white mb-8 border-b border-slate-700 pb-4">
              {data.frontend.title}
            </h2>
            <div className="space-y-6">
              {data.frontend.items.map((item: TechItem) => (
                <div key={item.name} className="flex items-start gap-4">
                  <div className="bg-blue-500/10 p-2 rounded-lg text-blue-400">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{item.name}</h3>
                    <p className="text-slate-400">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Backend Stack */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 hover:border-green-500/30 transition-all">
            <h2 className="text-3xl font-bold text-white mb-8 border-b border-slate-700 pb-4">
              {data.backend.title}
            </h2>
            <div className="space-y-6">
              {data.backend.items.map((item: TechItem) => (
                <div key={item.name} className="flex items-start gap-4">
                  <div className="bg-green-500/10 p-2 rounded-lg text-green-400">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{item.name}</h3>
                    <p className="text-slate-400">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Philosophy Section */}
      <Section id="philosophy">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            {data.philosophy.title}
          </h2>
          <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-slate-700 rounded-2xl p-8 md:p-12">
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
              {data.philosophy.description}
            </p>
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  );
}
