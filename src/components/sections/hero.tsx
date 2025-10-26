'use client';

import Link from 'next/link';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

const MotionBackground = dynamic(() => import('@/components/ui/motion-background').then(mod => mod.MotionBackground), {
  ssr: false,
  loading: () => <div className="absolute inset-0 -z-10 bg-transparent" />,
});

const Hero = () => {
  return (
    <section id="home" className="relative isolate bg-background scroll-mt-20 h-[100vh] min-h-[700px] flex items-center justify-center overflow-hidden">
      <Suspense fallback={null}>
        <MotionBackground />
      </Suspense>

      <div className="mx-auto max-w-3xl text-center z-10 px-6">
        <h1 className="text-4xl font-headline font-semibold tracking-tight text-foreground sm:text-6xl">
          Audy Al Vasyah
        </h1>
        <p className="mt-8 text-lg font-medium text-pretty text-muted-foreground sm:text-xl/8">
          Seorang praktisi IT dengan rekam jejak lebih dari 3 tahun dalam
          meningkatkan efisiensi operasional melalui implementasi sistem
          digital dan automasi proses.
        </p>
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
      
      {/* Gradient overlay for smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent pointer-events-none z-20"></div>
    </section>
  );
};

export default Hero;
