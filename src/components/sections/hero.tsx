'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { MessageSquare, Briefcase } from 'lucide-react';
import React from 'react';
import AnimatedTitle from '@/components/ui/animated-title';
import InteractiveGridBackground from '../ui/interactive-grid-background';

const Hero = () => {
  return (
    <section
      id="home"
      className="relative isolate flex flex-col justify-center scroll-mt-20 overflow-hidden min-h-[85vh]"
    >
      <InteractiveGridBackground />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10"></div>

      <div className="container relative z-20 px-6">
        <div className="flex flex-col items-center text-center">
          <motion.div
            className="inline-block rounded-full bg-gray-800/50 backdrop-blur-sm border border-slate-700 text-accent px-4 py-1 text-sm font-medium mb-6 self-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            Hi 👋, Siap Meluncurkan Proyek Digital Anda?
          </motion.div>

          <AnimatedTitle
            text="Solusi Digital & Automasi"
            className="text-xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl max-w-3xl"
          />

          <div className="mt-6 text-center">
            <AnimatedTitle
              as="div"
              text="Audy Al Vasyah"
              className="text-3xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-accent via-foreground to-accent bg-clip-text text-transparent animate-gradient"
            />
          </div>

          <motion.p
            className="mt-8 max-w-3xl text-sm text-slate-300 sm:text-base"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.8 }}
          >
            Dari Proses Manual ke Efisiensi Digital – 3+ Tahun Pengalaman dalam
            Transformasi Proses Bisnis.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 1.0 }}
          >
            <Button asChild size="lg">
              <Link href="#contact" className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Hubungi Saya
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-gray-800/50 backdrop-blur-sm border-slate-700"
            >
              <Link href="#projects" className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Lihat Proyek Saya
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
