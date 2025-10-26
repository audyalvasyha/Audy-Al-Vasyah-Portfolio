import type { Metadata } from 'next';
import { Varela_Round } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

const varelaRound = Varela_Round({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-varela-round',
});

export const metadata: Metadata = {
  title: 'Audy Al Vasyah - Portfolio',
  description:
    'A professional portfolio for Audy Al Vasyah, showcasing expertise in AI, ML, and operational efficiency.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${varelaRound.variable} dark`}
    >
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
