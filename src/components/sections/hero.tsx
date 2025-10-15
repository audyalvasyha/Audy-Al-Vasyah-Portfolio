import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const Hero = () => {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-background');

  return (
    <section
      id="home"
      className="relative w-full h-[80dvh] min-h-[500px] flex items-center justify-center text-center"
    >
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      <div className="relative z-10 container px-4 md:px-6">
        <div className="max-w-3xl mx-auto space-y-4">
          <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-foreground">
            Audy Al Vasyah
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Seorang praktisi IT dengan rekam jejak lebih dari 3 tahun dalam
            meningkatkan efisiensi operasional melalui implementasi sistem
            digital dan automasi proses.
          </p>
          <div className="flex justify-center">
            <Button asChild size="lg" className="mt-4">
              <Link href="#contact">Contact Me</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
