import Link from 'next/link';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const clipPathStyle = {
    clipPath:
      'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
  };

  return (
    <section id="home" className="relative isolate bg-background scroll-mt-20">
      <div className="px-6 pt-14 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={clipPathStyle}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-secondary opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>

        <div className="mx-auto max-w-3xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
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
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={clipPathStyle}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-primary to-secondary opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
