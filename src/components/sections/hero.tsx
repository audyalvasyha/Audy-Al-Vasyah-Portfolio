'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Briefcase, Calendar } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative isolate bg-transparent scroll-mt-20 h-[100vh] min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Subtle Background Animation */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 w-full h-full bg-[radial-gradient(circle_at_center,hsl(var(--background)/0.4)_0%,hsl(var(--background))_75%)] animate-pulse" style={{ animationDuration: '8s', animationIterationCount: 'infinite' }}></div>
        <div className="absolute inset-0 w-full h-full bg-[radial-gradient(circle_at_bottom_right,hsl(var(--background)/0.1)_0%,transparent_50%)] animate-pulse" style={{ animationDelay: '2s', animationDuration: '12s', animationIterationCount: 'infinite' }}></div>
        <div className="absolute inset-0 w-full h-full bg-[radial-gradient(circle_at_top_left,hsl(var(--background)/0.1)_0%,transparent_50%)] animate-pulse" style={{ animationDelay: '4s', animationDuration: '14s', animationIterationCount: 'infinite' }}></div>
      </div>

      <div className="w-full max-w-5xl z-20 px-6">
        <div className="flex flex-col items-center text-center">
            <div className="inline-block rounded-full bg-secondary text-secondary-foreground px-4 py-1 text-sm font-medium mb-6 self-center">
              Hi 👋, Siap Meluncurkan Proyek Digital Anda?
            </div>

            <h1 className="text-4xl font-headline font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl max-w-3xl">
              Solusi Digital & Automasi
            </h1>
            
            <div className="mt-4 text-center">
              <h2 className="text-6xl font-headline font-extrabold tracking-tight sm:text-7xl md:text-8xl">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-primary to-accent bg-[200%_auto] animate-gradient">
                  Audy Al Vasyah
                </span>
              </h2>
              <p className="text-xl font-medium text-muted-foreground mt-2">
                Spesialis IT & Automasi Proses
              </p>
            </div>

            <p className="mt-6 max-w-3xl text-lg text-slate-300 sm:text-xl">
              Dari Proses Manual ke Efisiensi Digital – 3+ Tahun Pengalaman dalam Transformasi Proses Bisnis.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-white font-bold">
                <Link href="#contact" className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Jadwalkan Konsultasi
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="#projects" className="flex items-center gap-2">
                   <Briefcase className="h-5 w-5" />
                  Lihat Proyek Saya
                </Link>
              </Button>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
