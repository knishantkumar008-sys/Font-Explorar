import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster"
import './globals.css';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Fancy Text Generator',
  description: 'Generate fancy text styles for your social media posts.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <div className="flex flex-col min-h-screen">
          <header className="flex h-16 items-center border-b bg-card px-4 md:px-6">
            <h1 className="text-xl font-semibold tracking-tight mr-auto">
              <Link href="/">Fancy Text Generator</Link>
            </h1>
            <nav className="flex items-center space-x-2">
              <Button variant="ghost" asChild>
                <Link href="/">Home</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/font-changer">Font Changer</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/symbols">Symbols</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/text-art">Text Art</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/blog">Blog</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/about">About</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/privacy">Privacy</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/contact">Contact</Link>
              </Button>
            </nav>
          </header>
          <main className="flex-1 overflow-auto p-4 md:p-6">
            <div className="mx-auto max-w-4xl">
              {children}
            </div>
          </main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
