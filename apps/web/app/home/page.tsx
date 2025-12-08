import { Button, FeatureCard, Section } from '@stocks/ui';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <Section className="pt-20 pb-16 md:pt-32 md:pb-24">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in">
            Manage Your Stock Portfolio{' '}
            <span className="text-blue-500">Effortlessly</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 mb-10 leading-relaxed animate-slide-up">
            Real-time market data, intelligent insights, and powerful analytics—all in one beautiful dashboard.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
            <Button size="lg" variant="primary">
              Get Started Free
            </Button>
            <Button size="lg" variant="secondary">
              Watch Demo
            </Button>
          </div>

          {/* Hero Visual */}
          <div className="mt-16 relative">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 shadow-2xl">
              <div className="aspect-video bg-slate-900 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">📈</div>
                  <p className="text-slate-400">Dashboard Preview</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Value Proposition Section */}
      <Section background="subtle" id="value">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Why Choose Our Platform?
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            We solve the complexity of stock market tracking with simplicity and power.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-5xl mb-4">⚡</div>
            <h3 className="text-2xl font-bold text-white mb-3">Real-Time Data</h3>
            <p className="text-slate-400 leading-relaxed">
              Get instant market updates with our Server-Sent Events technology. Never miss a price movement.
            </p>
          </div>

          <div className="text-center">
            <div className="text-5xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold text-white mb-3">Smart Insights</h3>
            <p className="text-slate-400 leading-relaxed">
              AI-powered analytics help you make informed decisions. Understand trends before they happen.
            </p>
          </div>

          <div className="text-center">
            <div className="text-5xl mb-4">🔒</div>
            <h3 className="text-2xl font-bold text-white mb-3">Secure & Reliable</h3>
            <p className="text-slate-400 leading-relaxed">
              Enterprise-grade security with 99.9% uptime. Your data is always safe and accessible.
            </p>
          </div>
        </div>
      </Section>

      {/* Features Section */}
      <Section id="features">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Everything you need to track, analyze, and optimize your investments.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon="📊"
            title="Live Market Dashboard"
            description="Monitor multiple stocks simultaneously with real-time price updates and change indicators."
          />

          <FeatureCard
            icon="📈"
            title="Advanced Charts"
            description="Interactive charts with technical indicators, historical data, and customizable timeframes."
          />

          <FeatureCard
            icon="🔔"
            title="Price Alerts"
            description="Set custom alerts for price movements, volume changes, and market events."
          />

          <FeatureCard
            icon="📱"
            title="Mobile Responsive"
            description="Access your portfolio anywhere, anytime. Fully optimized for mobile and tablet devices."
          />

          <FeatureCard
            icon="🤖"
            title="AI Forecasting"
            description="Machine learning models predict future price movements based on historical patterns."
          />

          <FeatureCard
            icon="📑"
            title="Portfolio Reports"
            description="Generate comprehensive reports with performance metrics, gains/losses, and insights."
          />
        </div>
      </Section>

      {/* How It Works Section */}
      <Section background="subtle" id="how-it-works">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            How It Works
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Get started in minutes with our simple 4-step process.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { step: '1', title: 'Sign Up', description: 'Create your free account in seconds. No credit card required.' },
            { step: '2', title: 'Add Stocks', description: 'Search and add stocks to your watchlist. Track unlimited symbols.' },
            { step: '3', title: 'Monitor Live', description: 'Watch real-time price updates and market movements on your dashboard.' },
            { step: '4', title: 'Get Insights', description: 'Receive AI-powered forecasts and actionable trading insights.' },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white text-2xl font-bold rounded-full mb-4">
                {item.step}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-slate-400 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Social Proof Section */}
      <Section id="testimonials">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Trusted by Traders
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Join thousands of investors who rely on our platform daily.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: 'Sarah Chen',
              role: 'Day Trader',
              avatar: '👩‍💼',
              quote: 'The real-time updates are incredibly fast. I can react to market changes instantly.',
            },
            {
              name: 'Michael Rodriguez',
              role: 'Portfolio Manager',
              avatar: '👨‍💼',
              quote: 'Best stock tracking platform I\'ve used. The AI forecasts have improved my returns by 23%.',
            },
            {
              name: 'Emily Watson',
              role: 'Retail Investor',
              avatar: '👩‍🔬',
              quote: 'Simple, beautiful, and powerful. Finally, a platform that doesn\'t overwhelm beginners.',
            },
          ].map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="text-4xl">{testimonial.avatar}</div>
                <div>
                  <div className="font-bold text-white">{testimonial.name}</div>
                  <div className="text-sm text-slate-400">{testimonial.role}</div>
                </div>
              </div>
              <p className="text-slate-300 leading-relaxed italic">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 text-center">
          <p className="text-slate-500 text-sm mb-6">TRUSTED BY</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
            <div className="text-2xl font-bold text-slate-600">NASDAQ</div>
            <div className="text-2xl font-bold text-slate-600">NYSE</div>
            <div className="text-2xl font-bold text-slate-600">FINRA</div>
            <div className="text-2xl font-bold text-slate-600">SEC</div>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section background="solid" className="text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Trading?
          </h2>
          <p className="text-xl text-slate-300 mb-10 leading-relaxed">
            Join thousands of traders who are making smarter decisions with real-time data and AI insights.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button size="lg" variant="primary">
              Start Free Trial
            </Button>
            <Button size="lg" variant="secondary">
              Schedule Demo
            </Button>
          </div>

          <p className="text-sm text-slate-500">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="text-2xl font-bold text-white mb-4">📈 StockTracker</div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Real-time market intelligence for modern traders.
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#features" className="text-slate-400 hover:text-blue-400 transition-colors">Features</Link></li>
                <li><Link href="/realtime" className="text-slate-400 hover:text-blue-400 transition-colors">Live Dashboard</Link></li>
                <li><Link href="#" className="text-slate-400 hover:text-blue-400 transition-colors">Pricing</Link></li>
                <li><Link href="#" className="text-slate-400 hover:text-blue-400 transition-colors">API</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="text-slate-400 hover:text-blue-400 transition-colors">About</Link></li>
                <li><Link href="#" className="text-slate-400 hover:text-blue-400 transition-colors">Blog</Link></li>
                <li><Link href="#" className="text-slate-400 hover:text-blue-400 transition-colors">Careers</Link></li>
                <li><Link href="#" className="text-slate-400 hover:text-blue-400 transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="text-slate-400 hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="text-slate-400 hover:text-blue-400 transition-colors">Terms of Service</Link></li>
                <li><Link href="#" className="text-slate-400 hover:text-blue-400 transition-colors">Cookie Policy</Link></li>
                <li><Link href="#" className="text-slate-400 hover:text-blue-400 transition-colors">Disclaimer</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              © 2025 StockTracker. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex gap-6">
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                <span className="sr-only">GitHub</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
