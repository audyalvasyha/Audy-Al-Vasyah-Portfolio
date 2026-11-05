'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, type Variants } from 'framer-motion';
import { Button } from '@/components/ui/button';
import AnimatedTitle from '@/components/ui/animated-title';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const META_ROWS = [
  { label: 'Referensi', value: 'AV-2026-01' },
  { label: 'Peran', value: 'Operation Tech' },
  { label: 'Fokus', value: 'AI & automasi operasional' },
  { label: 'Lokasi', value: 'Bagan Batu, Riau · remote OK' },
  { label: 'Status', value: 'Open untuk proyek & kolaborasi' },
];

const Hero = () => {
  const [portraitOk, setPortraitOk] = useState(true);
  return (
    <section
      id="home"
      className="relative isolate min-h-dvh overflow-hidden bg-secondary pt-24 pb-16 scroll-mt-20"
    >
      {/* Grid hitam tipis di atas kuning */}
      <div
        className="absolute inset-0 z-0 bp-grid opacity-60"
        aria-hidden="true"
      ></div>
      {/* Strip hitam nomor dokumen ala tape */}
      <div className="absolute right-0 top-20 z-10 border-2 border-foreground bg-foreground px-3 py-1 font-code text-[0.6rem] uppercase tracking-[0.3em] text-secondary">
        AV-2026-01 · REV 2
      </div>

      <motion.div
        className="container relative z-20 px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-10">
          <div className="max-w-2xl">
            <motion.div variants={revealVariants} className="inline-block">
              <span className="inline-block border-2 border-foreground bg-foreground px-4 py-2 font-code text-sm uppercase tracking-[0.35em] text-secondary lg:text-base">
                Audy Al Vasyah // Ops·Tech
              </span>
            </motion.div>

            <motion.h1
              variants={revealVariants}
              className="mt-8 space-y-1"
              style={{ containerType: 'inline-size' }}
            >
              <AnimatedTitle
                as="span"
                text="AUTOMATE"
                className="block font-display uppercase leading-[0.95] tracking-tight text-[clamp(2.25rem,min(10vw,14cqw),7rem)]"
              />
              <AnimatedTitle
                as="span"
                text="EVERYTHING"
                className="block font-display uppercase leading-[0.95] tracking-tight text-[clamp(2.25rem,min(10vw,12.5cqw),6.2rem)] text-redline"
              />
            </motion.h1>

            <motion.p
              variants={revealVariants}
              className="mt-8 max-w-xl text-base leading-relaxed text-foreground sm:text-lg"
            >
              Operation tech yang juga build sistem sendiri: menyatukan
              proses operasional harian dengan{' '}
              <span className="font-bold">automasi,</span>{' '}
              <span className="font-bold">dashboard internal,</span> dan{' '}
              <span className="font-bold">AI</span> yang benar-benar dipakai
              tim setiap hari.
            </motion.p>

            <motion.div
              variants={revealVariants}
              className="mt-10 flex flex-wrap items-center gap-6"
            >
              <Button asChild size="lg" className="strip-cyan w-full font-display text-base tracking-normal sm:w-auto">
                <Link href="#experience">View My Killer Work</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full border-primary bg-transparent font-display text-base tracking-normal hover:bg-primary hover:text-primary-foreground sm:w-auto"
              >
                <Link href="#contact">Hubungi Saya</Link>
              </Button>
            </motion.div>
          </div>

          <div className="flex w-full flex-col gap-6 lg:self-center">
          {/* Portrait low-poly — tampil jika public/images/portrait.jpg tersedia */}
          <HeroPortrait variants={revealVariants} onFail={() => setPortraitOk(false)} />

          {/* Blok judul — kolom informasi profil */}
          <motion.aside
            variants={revealVariants}
            className={`border-2 border-foreground bg-card shadow-hardlg ${portraitOk ? 'lg:mt-6' : ''} lg:self-center`}
            aria-label="Informasi singkat"
          >
            <div className="border-b-2 border-foreground px-5 py-3">
              <span className="font-code text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">
                PROFIL · 2026
              </span>
            </div>
            <dl className="divide-y divide-foreground/20">
              {META_ROWS.map((row) => (
                <div
                  key={row.label}
                  className="flex items-baseline justify-between gap-4 px-5 py-3"
                >
                  <dt className="font-code text-[0.6rem] uppercase tracking-[0.25em] text-muted-foreground">
                    {row.label}
                  </dt>
                  <dd className={`text-right text-sm ${row.label === 'Status' ? 'font-bold text-redline' : 'text-foreground/90'}`}>
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.aside>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

// Slot gambar hero: otomatis sembunyi bila file belum ada (404).
function HeroPortrait({
  variants,
  onFail,
}: {
  variants: Variants;
  onFail: () => void;
}) {
  return (
    <motion.figure
      variants={variants}
      className="relative mx-auto w-full max-w-sm overflow-hidden border-2 border-foreground bg-card shadow-hardlg lg:mx-0 lg:max-w-none"
    >
      <Image
        src="/images/portrait.jpg"
        alt="Portrait Audy Al Vasyah — low poly"
        width={603}
        height={804}
        priority
        className="h-auto w-full object-cover"
        onError={onFail}
      />
    </motion.figure>
  );
}

export default Hero;
