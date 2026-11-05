'use client';

import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import AnimatedTitle from '@/components/ui/animated-title';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.15 },
  },
};

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const META_ROWS = [
  { label: 'Referensi', value: 'AV-2026-01' },
  { label: 'Peran', value: 'Transport Planner' },
  { label: 'Fokus', value: 'AI & automasi operasional' },
  { label: 'Lokasi', value: 'Bagan Batu, Riau · remote OK' },
  { label: 'Status', value: 'Open untuk proyek & kolaborasi' },
];

const Hero = () => {
  return (
    <section
      id="home"
      className="relative isolate flex min-h-screen items-center overflow-hidden pt-24 pb-20 scroll-mt-20"
    >
      <div className="absolute inset-0 z-0 bp-grid" aria-hidden="true"></div>

      <motion.div
        className="container relative z-20 px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Layout judul gambar teknik: deskripsi di kiri, informasi di kanan */}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16">
          <div className="max-w-2xl">
            <motion.p
              variants={revealVariants}
              className="mb-6 font-code text-[0.65rem] uppercase tracking-[0.35em] text-muted-foreground"
            >
              01 — HALO
            </motion.p>

            <motion.div variants={revealVariants}>
              <AnimatedTitle
                as="h1"
                text="Audy Al Vasyah"
                className="font-headline text-4xl font-bold uppercase tracking-tight sm:text-6xl lg:text-7xl"
              />
            </motion.div>

            <motion.p
              variants={revealVariants}
              className="mt-4 font-code text-sm uppercase tracking-[0.25em] text-accent"
            >
              Transport Planner · Automation Builder
            </motion.p>

            <motion.p
              variants={revealVariants}
              className="mt-6 text-base leading-relaxed text-foreground/85 sm:text-lg"
            >
              Saya mengatur 100+ rute pengiriman harian di Wings Group. Karena
              proses manual nggak ter-scale, saya build sendiri sistemnya —
              penjadwalan berbasis ML, automasi gudang, dan{' '}
              <span className="text-accent">dashboard AI</span> yang benar-benar
              dipakai tim setiap hari.
            </motion.p>

            <motion.div
              variants={revealVariants}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Button asChild size="lg" className="gap-2">
                <Link href="#contact">
                  Diskusi proyek <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Blok judul — tertata seperti kolom informasi lembar kerja */}
          <motion.aside
            variants={revealVariants}
            className="border-2 border-foreground bg-card shadow-hardlg lg:self-center"
            aria-label="Informasi singkat"
          >
            <div className="border-b-2 border-foreground px-5 py-3">
              <span className="font-code text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">
                PROFIL · 2026
              </span>
            </div>
            <dl className="divide-y divide-primary/15">
              {META_ROWS.map((row) => (
                <div
                  key={row.label}
                  className="flex items-baseline justify-between gap-4 px-5 py-3"
                >
                  <dt className="font-code text-[0.6rem] uppercase tracking-[0.25em] text-muted-foreground">
                    {row.label}
                  </dt>
                  <dd className={`text-right text-sm ${row.label === 'Status' ? 'text-accent' : 'text-foreground/90'}`}>
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.aside>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
