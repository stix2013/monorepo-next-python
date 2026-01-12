import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from '../components/Footer';

describe('Footer', () => {
  it('renders the brand name', () => {
    render(<Footer />);
    expect(screen.getAllByText(/StockTracker/).length).toBeGreaterThan(0);
  });

  it('renders product links', () => {
    render(<Footer />);
    expect(screen.getByText('Features')).toBeDefined();
    expect(screen.getByText('Live Dashboard')).toBeDefined();
    expect(screen.getByText('History Analysis')).toBeDefined();
  });

  it('renders company links', () => {
    render(<Footer />);
    expect(screen.getByText('About')).toBeDefined();
    expect(screen.getByText('Blog')).toBeDefined();
    expect(screen.getByText('Careers')).toBeDefined();
    expect(screen.getByText('Contact')).toBeDefined();
  });

  it('renders legal links', () => {
    render(<Footer />);
    expect(screen.getByText('Privacy Policy')).toBeDefined();
    expect(screen.getByText('Terms of Service')).toBeDefined();
  });

  it('renders copyright text', () => {
    render(<Footer />);
    expect(screen.getByText(/© 2025 StockTracker/)).toBeDefined();
  });
});
