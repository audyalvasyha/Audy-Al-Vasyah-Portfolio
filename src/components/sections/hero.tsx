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
  { label: 'Peran', value: 'Operation Tech' },
  { label: 'Fokus', value: 'Automasi, Machine Learning' },
  { label: 'Sistem', value: 'S4 Fiori · SD · WM · TMS' },
  { label: 'Lokasi', value: 'Bagan Batu, Riau · remote' },
];

const Hero = () => {
  const [portraitOk, setPortraitOk] = useState(true);
  return (
    <section
      id="home"
      className="relative isolate min-h-dvh overflow-hidden bg-secondary pt-24 pb-16 scroll-mt-20 sm:pb-20"
    >
      {/* Grid hitam tipis di atas kuning */}
      <div
        className="absolute inset-0 z-0 bp-grid opacity-60"
        aria-hidden="true"
      ></div>
      {/* Strip hitam nomor dokumen ala tape */}
      <div className="absolute right-0 top-20 z-10 hidden border-2 border-foreground bg-foreground px-3 py-1 font-code text-[0.6rem] uppercase tracking-[0.3em] text-secondary sm:block">
        Open to work · 2026
      </div>

      <motion.div
        className="container relative z-20 px-4 sm:px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid items-start gap-12 md:grid-cols-2 md:gap-8 lg:gap-10">
          <div className="max-w-2xl">
            <motion.div variants={revealVariants} className="inline-block">
              <span className="inline-block max-w-full border-2 border-foreground bg-foreground px-3 py-2 font-code text-[0.65rem] uppercase leading-snug tracking-[0.2em] text-secondary sm:px-4 sm:text-sm sm:tracking-[0.35em] lg:text-base">
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
              className="mt-8 flex flex-wrap items-center gap-4 sm:mt-10 sm:gap-6"
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

            {/* Kartu profil — datasheet operasional, di bawah CTA */}
            <motion.aside
              variants={revealVariants}
              className="mt-10 max-w-xl border-2 border-foreground bg-card shadow-hardlg"
              aria-label="Ringkasan profil"
            >
              <div className="flex items-center justify-between border-b-2 border-foreground bg-foreground px-4 py-2.5 sm:px-5">
                <h2 className="font-code text-[0.6rem] uppercase tracking-[0.3em] text-secondary">
                  Profil
                </h2>
                <span className="font-code text-[0.6rem] uppercase tracking-[0.3em] text-secondary/60">
                  2026
                </span>
              </div>
              <dl>
                {META_ROWS.map((row) => (
                  <div
                    key={row.label}
                    className="grid grid-cols-[4rem_1fr] items-baseline gap-3 border-b border-foreground/10 px-4 py-2.5 sm:grid-cols-[5.5rem_1fr] sm:px-5"
                  >
                    <dt className="font-code text-[0.58rem] uppercase tracking-[0.22em] text-muted-foreground">
                      {row.label}
                    </dt>
                    <dd className="text-sm font-medium leading-snug text-foreground">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="flex items-center gap-2.5 border-t-2 border-foreground bg-secondary px-4 py-3 sm:px-5">
                <span className="h-2 w-2 flex-shrink-0 bg-foreground" aria-hidden="true" />
                <span className="font-code text-[0.58rem] font-bold uppercase leading-snug tracking-[0.18em] text-foreground">
                  Open untuk proyek & kolaborasi
                </span>
              </div>
            </motion.aside>
          </div>

          <div className="flex w-full flex-col gap-6 md:self-center">
            {/* Portrait low-poly — hilang otomatis bila file belum ada (404) */}
            {portraitOk && (
              <HeroPortrait variants={revealVariants} onFail={() => setPortraitOk(false)} />
            )}
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
      className="relative mx-auto w-full max-w-sm overflow-hidden border-2 border-foreground bg-card shadow-hardlg md:mx-0 md:max-w-none"
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
