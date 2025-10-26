import Link from 'next/link';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

const Hero3D = dynamic(() => import('@/components/ui/hero-3d').then(mod => mod.Hero3D), {
  ssr: false,
  loading: () => <div className="absolute inset-0 -z-10 bg-transparent" />,
});

const Hero = () => {
  return (
    <section id="home" className="relative isolate bg-background scroll-mt-20 h-[100vh] min-h-[700px] flex items-center justify-center">
      <Suspense fallback={null}>
        <Hero3D />
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
    </section>
  );
};

export default Hero;
