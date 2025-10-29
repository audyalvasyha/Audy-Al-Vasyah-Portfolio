import type { Metadata } from 'next';
import { Varela_Round } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import WebGLBackground from '@/components/ui/webgl-background';

const varelaRound = Varela_Round({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-varela-round',
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
        <WebGLBackground />
        <div className="relative z-10"> 
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
