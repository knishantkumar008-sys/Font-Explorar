import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster"
import { fonts } from '@/lib/fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'Font Explorer',
  description: 'An intuitive tool to explore and preview fonts.',
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
        {fonts.map(font => (
          <link key={font.name} href={font.googleFontUrl} rel="stylesheet" />
        ))}
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
