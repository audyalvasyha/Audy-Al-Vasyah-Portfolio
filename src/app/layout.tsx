import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Space_Grotesk, IBM_Plex_Mono } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-headline',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-code',
});

export const metadata: Metadata = {
  title: 'Audy Al Vasyah — Full-Stack Engineer · Operations Tech',
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
      className={`${spaceGrotesk.variable} ${ibmPlexMono.variable} dark`}
    >
      <body className="font-code antialiased">{children}</body>
    </html>
  );
}
