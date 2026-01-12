import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { Navigation } from '../components/Navigation';
import { usePathname } from 'next/navigation';

// Mock the usePathname hook
vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}));

const mockUsePathname = vi.mocked(usePathname);

describe('Navigation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it('renders the brand name and logo', () => {
    mockUsePathname.mockReturnValue('/home');
    render(<Navigation />);
    
    expect(screen.getAllByText(/StockTracker/)).toBeTruthy();
    expect(screen.getByText('📈')).toBeTruthy();
  });

  it('renders all navigation links', () => {
    mockUsePathname.mockReturnValue('/home');
    render(<Navigation />);
    
    expect(screen.getByText('Home')).toBeTruthy();
    expect(screen.getByText('Stocks')).toBeTruthy();
    expect(screen.getByText('Real-Time')).toBeTruthy();
    expect(screen.getByText('About')).toBeTruthy();
  });

  it('highlights the active navigation link', () => {
    mockUsePathname.mockReturnValue('/stocks');
    render(<Navigation />);
    
    const stocksLink = screen.getByText('Stocks').closest('a');
    expect(stocksLink).toBeTruthy();
    expect(stocksLink?.className).toContain('text-blue-400');
    expect(stocksLink?.className).toContain('bg-blue-400/10');
  });

  it('highlights home page when on root path', () => {
    mockUsePathname.mockReturnValue('/');
    render(<Navigation />);
    
    const homeLink = screen.getByText('Home').closest('a');
    expect(homeLink).toBeTruthy();
    expect(homeLink?.className).toContain('text-blue-400');
    expect(homeLink?.className).toContain('bg-blue-400/10');
  });

  it('highlights home page when explicitly on /home', () => {
    mockUsePathname.mockReturnValue('/home');
    render(<Navigation />);
    
    const homeLink = screen.getByText('Home').closest('a');
    expect(homeLink).toBeTruthy();
    expect(homeLink?.className).toContain('text-blue-400');
    expect(homeLink?.className).toContain('bg-blue-400/10');
  });

  it('does not highlight inactive navigation links', () => {
    mockUsePathname.mockReturnValue('/home');
    render(<Navigation />);
    
    const stocksLink = screen.getByText('Stocks').closest('a');
    expect(stocksLink?.className).not.toContain('text-blue-400');
    expect(stocksLink?.className).not.toContain('bg-blue-400/10');
  });

  it('shows hamburger menu button on mobile', () => {
    mockUsePathname.mockReturnValue('/home');
    render(<Navigation />);
    
    // Find button by its sr-only text content
    const menuButton = screen.getByText('Open main menu');
    expect(menuButton).toBeTruthy();
    expect(menuButton.closest('button')).toBeTruthy();
  });

  it('has proper navigation links with hrefs', () => {
    mockUsePathname.mockReturnValue('/home');
    render(<Navigation />);
    
    const homeLink = screen.getByText('Home').closest('a');
    const stocksLink = screen.getByText('Stocks').closest('a');
    const realtimeLink = screen.getByText('Real-Time').closest('a');
    const aboutLink = screen.getByText('About').closest('a');
    
    expect(homeLink?.getAttribute('href')).toBe('/home');
    expect(stocksLink?.getAttribute('href')).toBe('/stocks');
    expect(realtimeLink?.getAttribute('href')).toBe('/realtime');
    expect(aboutLink?.getAttribute('href')).toBe('/about');
  });

  it('applies correct styling classes', () => {
    mockUsePathname.mockReturnValue('/home');
    render(<Navigation />);
    
    const nav = screen.getByRole('navigation');
    expect(nav.className).toContain('fixed');
    expect(nav.className).toContain('top-0');
    expect(nav.className).toContain('bg-slate-900/95');
    expect(nav.className).toContain('backdrop-blur-md');
  });

  it('shows different styling for active vs inactive links', () => {
    mockUsePathname.mockReturnValue('/stocks');
    render(<Navigation />);
    
    const activeLink = screen.getByText('Stocks').closest('a');
    const inactiveLink = screen.getByText('Home').closest('a');
    
    expect(activeLink?.className).toContain('text-blue-400');
    expect(activeLink?.className).toContain('bg-blue-400/10');
    
    expect(inactiveLink?.className).toContain('text-slate-300');
    expect(inactiveLink?.className).toContain('hover:text-white');
    expect(inactiveLink?.className).toContain('hover:bg-slate-800/50');
  });

  it('has proper accessibility attributes', () => {
    mockUsePathname.mockReturnValue('/home');
    render(<Navigation />);
    
    // Check that the sr-only text for accessibility is present
    const srOnlyText = screen.getByText('Open main menu');
    expect(srOnlyText).toBeTruthy();
    expect(srOnlyText.className).toContain('sr-only');
  });

  it('contains proper navigation structure', () => {
    mockUsePathname.mockReturnValue('/home');
    render(<Navigation />);
    
    // Check that navigation has proper structure
    const nav = screen.getByRole('navigation');
    expect(nav).toBeTruthy();
    
    // Check that there are link elements
    const links = nav.querySelectorAll('a');
    expect(links.length).toBeGreaterThan(0);
    
    // Check that brand link exists
    const brandLink = screen.getByText('📈').closest('a');
    expect(brandLink?.getAttribute('href')).toBe('/home');
  });

  it('renders all expected text content', () => {
    mockUsePathname.mockReturnValue('/home');
    render(<Navigation />);
    
    // Check that all expected text is rendered
    expect(screen.getByText('📈')).toBeTruthy();
    expect(screen.getByText('StockTracker')).toBeTruthy();
    expect(screen.getByText('Home')).toBeTruthy();
    expect(screen.getByText('Stocks')).toBeTruthy();
    expect(screen.getByText('Real-Time')).toBeTruthy();
    expect(screen.getByText('About')).toBeTruthy();
  });

  it('handles different route paths correctly', () => {
    // Test /stocks route
    mockUsePathname.mockReturnValue('/stocks');
    render(<Navigation />);
    
    const stocksLinks = screen.getAllByText('Stocks');
    const homeLinks = screen.getAllByText('Home');
    
    // Find the active Stocks link (first one should be active)
    const activeStocksLink = stocksLinks[0].closest('a');
    const inactiveHomeLink = homeLinks[0].closest('a');
    
    expect(activeStocksLink?.className).toContain('text-blue-400');
    expect(inactiveHomeLink?.className).not.toContain('text-blue-400');
    
    cleanup();
    
    // Test /about route
    mockUsePathname.mockReturnValue('/about');
    render(<Navigation />);
    
    const aboutLinks = screen.getAllByText('About');
    const stocksLinks2 = screen.getAllByText('Stocks');
    
    // Find the active About link
    const activeAboutLink = aboutLinks[0].closest('a');
    const inactiveStocksLink = stocksLinks2[0].closest('a');
    
    expect(activeAboutLink?.className).toContain('text-blue-400');
    expect(inactiveStocksLink?.className).not.toContain('text-blue-400');
  });

  it('displays navigation links in correct order', () => {
    mockUsePathname.mockReturnValue('/home');
    render(<Navigation />);
    
    const nav = screen.getByRole('navigation');
    const links = Array.from(nav.querySelectorAll('a')).map(a => a.textContent);
    
    // Should contain Home, Stocks, Real-Time, About in some order
    expect(links).toContain('Home');
    expect(links).toContain('Stocks');
    expect(links).toContain('Real-Time');
    expect(links).toContain('About');
    expect(links).toContain('📈 StockTracker');
  });
});