
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from "@/components/ui/toaster"
import './globals.css';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeProvider } from '@/app/components/theme-provider';
import { ThemeToggle } from '@/app/components/theme-toggle';
import { Logo } from '@/app/components/logo';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

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
             <header className="h-20">
                <div className="container mx-auto flex h-full items-center px-4 md:px-6">
                    <Link href="/" className="flex items-center gap-2 text-white hover:text-white/90 transition-colors mr-auto">
                        <Logo />
                    </Link>
                    
                    <nav className="hidden md:flex items-center space-x-1">
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
                    </nav>

                    <div className="flex items-center ml-auto md:ml-4">
                        <ThemeToggle />
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="md:hidden ml-2 text-white hover:bg-white/10 hover:text-white">
                                    <Menu className="h-6 w-6" />
                                    <span className="sr-only">Toggle navigation menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left">
                                <div className="flex flex-col gap-4 py-8">
                                    <Link href="/" className="flex items-center gap-2 mb-4 text-foreground">
                                        <Logo />
                                        <span className="font-bold text-lg">Font Explorer</span>
                                    </Link>
                                    <Link href="/" className="text-lg font-medium hover:underline">Home</Link>
                                    <Link href="/symbols" className="text-lg font-medium hover:underline">Symbols</Link>
                                    <Link href="/text-art" className="text-lg font-medium hover:underline">Text Art</Link>
                                    <Link href="/blog" className="text-lg font-medium hover:underline">Blog</Link>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </header>
            <main className="flex-1 overflow-auto p-4 md:p-6">
              <div className="container mx-auto max-w-4xl">
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
