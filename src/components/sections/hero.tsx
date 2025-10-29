'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Typewriter from '@/components/ui/typewriter';

const Hero = () => {
  return (
    <section id="home" className="relative isolate bg-transparent scroll-mt-20 h-[100vh] min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Subtle Background Animation */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 w-full h-full bg-[radial-gradient(circle_at_center,hsl(var(--background)/0.2)_0%,hsl(var(--background))_75%)] animate-pulse" style={{ animationDuration: '10s', animationIterationCount: 'infinite' }}></div>
        <div className="absolute inset-0 w-full h-full bg-[radial-gradient(circle_at_bottom_right,hsl(var(--background)/0.1)_0%,transparent_50%)] animate-pulse" style={{ animationDelay: '2s', animationDuration: '12s', animationIterationCount: 'infinite' }}></div>
        <div className="absolute inset-0 w-full h-full bg-[radial-gradient(circle_at_top_left,hsl(var(--background)/0.1)_0%,transparent_50%)] animate-pulse" style={{ animationDelay: '4s', animationDuration: '14s', animationIterationCount: 'infinite' }}></div>
      </div>

      <div className="mx-auto max-w-3xl text-center z-20 px-6">
        <h1 className="text-4xl font-headline font-semibold tracking-tight text-foreground sm:text-6xl">Audy Al Vasyah</h1>
        {/* Adjust min-h to be appropriate for the content */}
        <Typewriter 
          text="Seorang praktisi IT dengan rekam jejak lebih dari 3 tahun dalam meningkatkan efisiensi operasional melalui implementasi sistem digital dan automasi proses."
          className="mt-8 text-lg font-medium text-pretty text-slate-200 sm:text-xl/8 min-h-[96px] sm:min-h-[64px]"
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
    </section>
  );
};

export default Hero;
