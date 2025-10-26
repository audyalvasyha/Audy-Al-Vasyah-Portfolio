'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Typewriter from '@/components/ui/typewriter';

const Hero = () => {
  return (
    <section id="home" className="relative isolate bg-transparent scroll-mt-20 h-[100vh] min-h-[700px] flex items-center justify-center overflow-hidden">

      {/* Diperbarui: Kekuatan filter gelap dikurangi menjadi 50% untuk keseimbangan antara kontras dan kecerahan */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--background)/0.5)_20%,hsl(var(--background)))]"></div>

      <div className="mx-auto max-w-3xl text-center z-10 px-6">
        <h1 className="text-4xl font-headline font-semibold tracking-tight text-foreground sm:text-6xl">
          Audy Al Vasyah
        </h1>
        <Typewriter 
          text="Seorang praktisi IT dengan rekam jejak lebih dari 3 tahun dalam meningkatkan efisiensi operasional melalui implementasi sistem digital dan automasi proses."
          className="mt-8 text-lg font-medium text-pretty text-slate-200 sm:text-xl/8 min-h-[112px] sm:min-h-[64px]"
          speed={20}
          triggerOnView={true}
        />
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button asChild size="lg">
            <Link href="#projects">Lihat Proyek</Link>
          </Button>
          <Button asChild variant="link" className="text-foreground">
            <Link href="#contact">
              Hubungi Saya <span aria-hidden="true" className="ml-1">→</span>
            </Link>
          </Button>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent pointer-events-none z-20"></div>
    </section>
  );
};

export default Hero;
