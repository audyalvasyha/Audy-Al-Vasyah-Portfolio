'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getPageViews, incrementAndGetViews } from '@/app/actions';

const SOCIALS = [
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/audy-al-vasyah-8b6135206/', color: 'text-secondary' },
  { name: 'GitHub', href: 'https://github.com/audyalvasyha', color: 'text-accent' },
  { name: 'Instagram', href: 'https://www.instagram.com/_audysignin/', color: 'text-redline' },
  { name: 'Facebook', href: 'https://web.facebook.com/audyalvasyah.audyalvasyah.1/', color: 'text-card' },
];

const Footer = () => {
  const [pageViews, setPageViews] = useState<number | null>(null);

  useEffect(() => {
    // Increment sekali per sesi peramban; sesi setelahnya hanya membaca angkanya.
    let seen = false;
    try {
      seen = sessionStorage.getItem('viewCounted') === '1';
    } catch {
      // sessionStorage bisa gagal (mis. private mode) — tetap aman.
    }

    (seen ? getPageViews() : incrementAndGetViews())
      .then((views) => {
        setPageViews(views);
        try {
          sessionStorage.setItem('viewCounted', '1');
        } catch {
          /* abaikan */
        }
      })
      .catch((error) => {
        console.error('Gagal memuat jumlah kunjungan', error);
        setPageViews(0);
      });
  }, []);

  return (
    <footer>
      {/* Blok hitam besar: marquee identitas + sosial warna-warni */}
      <div className="relative overflow-hidden border-t-2 border-foreground bg-foreground py-16 md:py-24">
        <div className="container px-6">
          <p className="text-center font-display text-[clamp(2.5rem,9vw,7rem)] uppercase leading-none tracking-tight text-secondary">
            Mari Kolaborasi
          </p>
          <nav
            aria-label="Media sosial"
            className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
          >
            {SOCIALS.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`font-code text-sm uppercase tracking-[0.3em] underline-offset-4 hover:underline md:text-base ${social.color}`}
              >
                {social.name}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Strip putih: copyright mono */}
      <div className="border-t-2 border-foreground bg-background py-6">
        <div className="container flex flex-col items-center justify-between gap-3 px-6 md:flex-row">
          <p className="text-center font-code text-[0.7rem] uppercase tracking-[0.25em] leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} Audy Al Vasyah — Dibangun sendiri dengan Next.js
          </p>
          <div className="flex items-center gap-4">
            <span className="hidden md:inline text-[0.6rem] font-code uppercase tracking-[0.3em] text-muted-foreground/60">
              {pageViews !== null ? `Kunjungan: ${pageViews.toLocaleString('id-ID')}` : ''}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
