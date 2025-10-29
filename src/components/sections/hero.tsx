'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Typewriter from '@/components/ui/typewriter';

const Hero = () => {
  return (
    <section id="home" className="relative isolate bg-transparent scroll-mt-20 h-[100vh] min-h-[700px] flex items-center justify-center overflow-hidden">

      {/* Efek Gradien Radial untuk Kontras Teks */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--background)/0.5)_20%,hsl(var(--background)))]"></div>
      
      {/* Overlay Efek Vintage */}
      <div className="absolute inset-0 w-full h-full bg-transparent pointer-events-none z-20">
        <div className="absolute inset-0 w-full h-full bg-[repeating-linear-gradient(to_bottom,transparent_0,hsl(var(--background)/0.03)_1px,transparent_2px)]"></div>
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'hsl(222, 47%, 11%)\' fill-opacity=\'0.04\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            opacity: 0.3
          }}
        />
      </div>

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
