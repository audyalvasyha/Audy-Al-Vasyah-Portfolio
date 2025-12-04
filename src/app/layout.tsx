import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';


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
      className={`${GeistSans.variable} ${GeistMono.variable} dark`}
    >
      <body className="font-code antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
