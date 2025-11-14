import type { Metadata } from 'next';
import { Inter, Orbitron } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const orbitron = Orbitron({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-headline',
});

export const metadata: Metadata = {
  title: 'Audy Al Vasyah - AI & Automation Portfolio',
  description:
    'Portofolio profesional Audy Al Vasyah. Menampilkan keahlian dalam implementasi AI, Machine Learning, dan automasi untuk efisiensi operasional.',
  keywords: [
    'Audy Al Vasyah',
    'Portfolio',
    'AI',
    'Machine Learning',
    'Automasi',
    'Efisiensi Operasional',
    'Transport Planner',
    'Web Developer',
    'Next.js',
    'Firebase',
    'Google Cloud',
  ],
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${orbitron.variable} dark`}
    >
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
