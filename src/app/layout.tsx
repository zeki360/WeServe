import type { Metadata } from 'next';
import './globals.css';
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import Navigation from '@/components/Navigation';
import { AuthProvider } from '@/context/AuthContext';

export const metadata: Metadata = {
  title: 'WeServe',
  description: 'Your one-stop solution for food, lodging, and event spaces.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className={cn("font-body antialiased", "min-h-screen bg-background")}>
            <div className="relative md:flex">
              <Navigation />
              <main className="flex-1 pb-20 md:pb-0 md:h-screen md:overflow-y-auto">
                {children}
              </main>
            </div>
            <Toaster />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
