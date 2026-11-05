import type { Metadata } from 'next';
import './globals.css';
import { Space_Grotesk, IBM_Plex_Mono, IBM_Plex_Sans, Archivo_Black } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-headline',
});

const archivoBlack = Archivo_Black({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-code',
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://audy-al-vasyah.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Audy Al Vasyah — Operation Tech',
    template: '%s · Audy Al Vasyah',
  },
  description:
    'Portofolio Audy Al Vasyah: transport planner yang juga membangun sendiri sistemnya — penjadwalan berbasis ML, automasi gudang, dan dashboard AI untuk operasional harian.',
  keywords: [
    'Audy Al Vasyah',
    'Operation Tech',
    'Automation',
    'Machine Learning',
    'Next.js',
    'Firebase',
    'Google Cloud',
    'n8n',
    'Portofolio',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'Audy Al Vasyah',
    title: 'Audy Al Vasyah — Operation Tech',
    description:
      'Operation tech: menyatukan operasional harian dengan automasi, dashboard internal, dan AI yang dipakai tim setiap hari.',
  },
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
      lang="id"
      className={`${spaceGrotesk.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable} ${archivoBlack.variable}`}
    >
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
