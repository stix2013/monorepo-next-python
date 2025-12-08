import { Button, FeatureCard, Section } from '@stocks/ui';
import { Footer } from '../../components/Footer';

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

      <Footer />
    </div>
  );
}
