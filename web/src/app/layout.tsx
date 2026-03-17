import type { Metadata } from 'next';
import './globals.css';
import { ToastProvider } from '@/contexts/ToastContext';
import { ToastContainer } from '@/components/toast/ToastContainer';
import { SessionProvider } from '@/components/auth/session-provider';
import { MockProvider } from '@/components/MockProvider';
import { NavBar } from '@/components/NavBar';
import { auth } from '@/lib/auth/auth';

export const metadata: Metadata = {
  title: 'BetterBond Commission Payments',
  description:
    'Commission payment management system for bond agencies in South Africa',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className="antialiased">
        <SessionProvider session={session}>
          <ToastProvider>
            <MockProvider>
              <div className="min-h-screen flex flex-col">
                <NavBar />
                <main className="flex-1">{children}</main>
              </div>
            </MockProvider>
            <ToastContainer />
          </ToastProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
