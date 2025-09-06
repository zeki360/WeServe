import type { Metadata } from 'next';
import './globals.css';
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import Navigation from '@/components/Navigation';

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("font-body antialiased", "min-h-screen bg-background")}>
        <div className="relative md:flex">
          <Navigation />
          <main className="flex-1 pb-20 md:pb-0">
            {children}
          </main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
