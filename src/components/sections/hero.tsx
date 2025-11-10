'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { MessageSquare, Briefcase } from 'lucide-react';
import React from 'react';
import GridBallAnimation from '../layout/grid-ball-animation';

const Hero = () => {
  return (
    <section
      id="home"
      className="relative isolate flex flex-col justify-center bg-transparent scroll-mt-20 overflow-hidden min-h-[85vh]"
    >
      <div className="absolute inset-0 -z-10 h-full w-full bg-transparent">
        {/* Static Grid */}
        <div className="absolute h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:60px_60px] sm:bg-[size:80px_80px] lg:bg-[size:100px_100px]"></div>
        
        {/* Radial Gradient overlay */}
        <div className="absolute inset-0 h-full w-full bg-[radial-gradient(circle_500px_at_50%_200px,hsl(var(--background)/0.1),hsl(var(--background)))]"></div>
        
        <GridBallAnimation />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/80 to-transparent z-0"></div>

      <div className="container relative z-20 px-6">
        <div className="flex flex-col items-center text-center">
          <motion.div
            className="flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
          >
            <div className="inline-block rounded-full bg-gray-800/50 backdrop-blur-sm border border-slate-700 text-accent px-4 py-1 text-sm font-medium mb-6 self-center">
              Hi 👋, Siap Meluncurkan Proyek Digital Anda?
            </div>

            <h1 className="text-xl font-headline font-semibold tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl max-w-3xl">
              Solusi Digital & Automasi
            </h1>

            <div className="mt-4 text-center">
              <h2 className="text-3xl font-headline font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-accent to-foreground animate-gradient bg-[length:400%_400%]">
                  Audy Al Vasyah
                </span>
              </h2>
              <p className="text-sm font-medium text-muted-foreground sm:text-lg mt-2">
                Spesialis IT & Automasi Proses
              </p>
            </div>

            <p className="mt-6 max-w-3xl text-sm text-slate-300 sm:text-base">
              Dari Proses Manual ke Efisiensi Digital – 3+ Tahun Pengalaman dalam
              Transformasi Proses Bisnis.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
              >
                <Link
                  href="#contact"
                  className="flex items-center gap-2"
                >
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
                <Link
                  href="#projects"
                  className="flex items-center gap-2"
                >
                  <Briefcase className="h-5 w-5" />
                  Lihat Proyek Saya
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
