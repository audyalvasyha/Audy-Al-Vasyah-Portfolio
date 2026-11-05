'use client';
import { useEffect, useState } from 'react';
import { getPageViews, incrementAndGetViews } from '@/app/actions';

const Footer = () => {
  const [pageViews, setPageViews] = useState<number | null>(null);

  useEffect(() => {
    // Increment sekali per sesi peramban; sesi setelahnya hanya membaca angkanya.
    let seen = false;
    try {
      seen = sessionStorage.getItem('viewCounted') === '1';
    } catch {
      // sessionStorage bisa gagal (mis. private mode) — tetap aman, hanya menambah lagi.
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
    <footer className="border-t-2 border-foreground bg-secondary">
      <div className="bp-dimension mx-6 mt-4" aria-hidden="true" />
      <div className="container flex flex-col items-center justify-between gap-4 py-6 md:h-24 md:flex-row">
        <p className="text-balance text-center text-[0.7rem] font-code uppercase tracking-[0.25em] leading-loose text-muted-foreground md:text-left">
          &copy; {new Date().getFullYear()} Audy Al Vasyah — Dibangun sendiri dengan Next.js
        </p>
        <div className="flex items-center gap-4">
          <span className="hidden md:inline text-[0.6rem] font-code uppercase tracking-[0.3em] text-muted-foreground/60">
            Dibangun manual · Next.js
          </span>
          <div className="text-balance text-center text-[0.7rem] font-code uppercase tracking-[0.25em] leading-loose text-muted-foreground md:text-right min-h-[20px]">
            {pageViews !== null ? `Kunjungan: ${pageViews.toLocaleString('id-ID')}` : ''}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
