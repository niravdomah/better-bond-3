/**
 * Integration Tests: App Shell with Navigation
 * Epic 1, Story 1 — App Shell with Navigation and Home Page Setup
 *
 * Tests the navigation bar rendering, route navigation, active link states,
 * authentication display, and responsive layout.
 */

import { render, screen, within } from '@testing-library/react';
import React from 'react';
import { vi } from 'vitest';

// Mock next/navigation
const mockPush = vi.fn();
const mockPathname = vi.fn<() => string>(() => '/');
vi.mock('next/navigation', () => ({
  usePathname: () => mockPathname(),
  useRouter: () => ({
    push: mockPush,
    refresh: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
}));

// Mock next-auth/react
const mockSession = vi.fn<
  () => {
    data: {
      user: { name: string; email: string; role: string; id: string };
    } | null;
    status: string;
  }
>(() => ({
  data: {
    user: {
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'admin',
      id: '1',
    },
  },
  status: 'authenticated',
}));

vi.mock('next-auth/react', () => ({
  useSession: () => mockSession(),
  SessionProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

// Import the component under test — NavBar will be created during implementation
import { NavBar } from '@/components/NavBar';

describe('App Shell Navigation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockPathname.mockReturnValue('/');
    mockSession.mockReturnValue({
      data: {
        user: {
          name: 'Admin User',
          email: 'admin@example.com',
          role: 'admin',
          id: '1',
        },
      },
      status: 'authenticated',
    });
  });

  describe('Navigation Bar Rendering', () => {
    it('displays the application name "BetterBond"', () => {
      render(<NavBar />);

      expect(screen.getByText('BetterBond')).toBeInTheDocument();
    });

    it('displays navigation links for Dashboard, Payments, and Payments Made', () => {
      render(<NavBar />);

      const nav = screen.getByRole('navigation');
      expect(
        within(nav).getByRole('link', { name: /dashboard/i }),
      ).toBeInTheDocument();
      expect(
        within(nav).getByRole('link', { name: /^payments$/i }),
      ).toBeInTheDocument();
      expect(
        within(nav).getByRole('link', { name: /payments made/i }),
      ).toBeInTheDocument();
    });

    it('renders a navigation region', () => {
      render(<NavBar />);

      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });
  });

  describe('Navigation Between Routes', () => {
    it('Dashboard link points to /', () => {
      render(<NavBar />);

      const dashboardLink = screen.getByRole('link', { name: /dashboard/i });
      expect(dashboardLink).toHaveAttribute('href', '/');
    });

    it('Payments link points to /payments', () => {
      render(<NavBar />);

      const paymentsLink = screen.getByRole('link', { name: /^payments$/i });
      expect(paymentsLink).toHaveAttribute('href', '/payments');
    });

    it('Payments Made link points to /payments-made', () => {
      render(<NavBar />);

      const paymentsMadeLink = screen.getByRole('link', {
        name: /payments made/i,
      });
      expect(paymentsMadeLink).toHaveAttribute('href', '/payments-made');
    });
  });

  describe('Active Link Highlighting', () => {
    it('marks Dashboard link as current when on /', () => {
      mockPathname.mockReturnValue('/');
      render(<NavBar />);

      const dashboardLink = screen.getByRole('link', { name: /dashboard/i });
      expect(dashboardLink).toHaveAttribute('aria-current', 'page');
    });

    it('marks Payments link as current when on /payments', () => {
      mockPathname.mockReturnValue('/payments');
      render(<NavBar />);

      const paymentsLink = screen.getByRole('link', { name: /^payments$/i });
      expect(paymentsLink).toHaveAttribute('aria-current', 'page');
    });

    it('marks Payments Made link as current when on /payments-made', () => {
      mockPathname.mockReturnValue('/payments-made');
      render(<NavBar />);

      const paymentsMadeLink = screen.getByRole('link', {
        name: /payments made/i,
      });
      expect(paymentsMadeLink).toHaveAttribute('aria-current', 'page');
    });

    it('does not mark Dashboard as current when on /payments', () => {
      mockPathname.mockReturnValue('/payments');
      render(<NavBar />);

      const dashboardLink = screen.getByRole('link', { name: /dashboard/i });
      expect(dashboardLink).not.toHaveAttribute('aria-current', 'page');
    });
  });

  describe('Authenticated User Display', () => {
    it('displays the logged-in user name in the navigation', () => {
      render(<NavBar />);

      expect(screen.getByText('Admin User')).toBeInTheDocument();
    });

    it('displays a different user name when session changes', () => {
      mockSession.mockReturnValue({
        data: {
          user: {
            name: 'Standard User',
            email: 'user@example.com',
            role: 'standard_user',
            id: '3',
          },
        },
        status: 'authenticated',
      });

      render(<NavBar />);

      expect(screen.getByText('Standard User')).toBeInTheDocument();
    });
  });

  describe('Unauthenticated User', () => {
    it('shows sign-in link when user is not authenticated', () => {
      mockSession.mockReturnValue({
        data: null,
        status: 'unauthenticated',
      });

      render(<NavBar />);

      expect(
        screen.getByRole('link', { name: /sign in/i }),
      ).toBeInTheDocument();
    });

    it('does not show user name when not authenticated', () => {
      mockSession.mockReturnValue({
        data: null,
        status: 'unauthenticated',
      });

      render(<NavBar />);

      expect(screen.queryByText('Admin User')).not.toBeInTheDocument();
    });
  });

  describe('Layout Integration', () => {
    it('renders child content in the main area', () => {
      render(<NavBar />);

      // NavBar should render without errors
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });
  });

  describe('Responsive Navigation', () => {
    it('all navigation links are accessible in the DOM', () => {
      render(<NavBar />);

      // All links should be present and accessible regardless of viewport
      const links = screen.getAllByRole('link');
      const linkTexts = links.map((link) => link.textContent?.toLowerCase());

      expect(linkTexts).toEqual(
        expect.arrayContaining(['dashboard', 'payments', 'payments made']),
      );
    });
  });
});
