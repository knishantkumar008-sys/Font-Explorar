import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from "@/components/ui/toaster"
import './globals.css';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeProvider } from '@/app/components/theme-provider';
import { ThemeToggle } from '@/app/components/theme-toggle';
import { Type } from 'lucide-react';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Font Explorer - Fancy Text & Style Generator',
  description: 'Explore, generate, and copy-paste stylish and fancy text for your social media profiles and posts.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-body antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <header className="flex h-20 items-center px-4 md:px-6">
              <Link href="/" className="flex items-center gap-2 text-white hover:text-white/90 transition-colors">
                  <Type className="h-7 w-7" />
                  <span className="hidden sm:inline text-xl font-semibold tracking-tight">
                    Font Explorer
                  </span>
              </Link>
              <nav className="ml-auto flex items-center space-x-1">
                <Button variant="ghost" asChild className="text-white hover:bg-white/10 hover:text-white">
                  <Link href="/">Home</Link>
                </Button>
                <Button variant="ghost" asChild className="text-white hover:bg-white/10 hover:text-white">
                  <Link href="/symbols">Symbols</Link>
                </Button>
                <Button variant="ghost" asChild className="text-white hover:bg-white/10 hover:text-white">
                  <Link href="/text-art">Text Art</Link>
                </Button>
                <Button variant="ghost" asChild className="text-white hover:bg-white/10 hover:text-white">
                  <Link href="/blog">Blog</Link>
                </Button>
                <ThemeToggle />
              </nav>
            </header>
            <main className="flex-1 overflow-auto p-4 md:p-6">
              <div className="mx-auto max-w-4xl">
                {children}
              </div>
            </main>
            <footer className="mt-auto">
              <div className="container mx-auto flex flex-col md:flex-row items-center justify-between py-4 px-4 md:px-6 text-sm text-white">
                <p className="text-center md:text-left mb-2 md:mb-0">
                  &copy; {new Date().getFullYear()} Font Explorer. All rights reserved.
                </p>
                <div className="flex items-center space-x-4">
                  <Link href="/about" className="hover:underline">About</Link>
                  <Link href="/contact" className="hover:underline">Contact</Link>
                  <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
                  <Link href="/terms" className="hover:underline">Terms & Conditions</Link>
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
