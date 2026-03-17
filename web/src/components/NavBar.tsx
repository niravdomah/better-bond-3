'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

const navLinks = [
  { href: '/', label: 'Dashboard' },
  { href: '/payments', label: 'Payments' },
  { href: '/payments-made', label: 'Payments Made' },
];

export function NavBar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  return (
    <header className="border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-bold">
            BetterBond
          </Link>
          <nav role="navigation" aria-label="Main navigation">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={isActive ? 'page' : undefined}
                      className={`inline-flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-accent text-accent-foreground'
                          : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          {status === 'authenticated' && session?.user ? (
            <span className="text-sm text-foreground">{session.user.name}</span>
          ) : status === 'unauthenticated' ? (
            <Link
              href="/auth/signin"
              className="inline-flex items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              Sign In
            </Link>
          ) : null}
        </div>
      </div>
    </header>
  );
}
