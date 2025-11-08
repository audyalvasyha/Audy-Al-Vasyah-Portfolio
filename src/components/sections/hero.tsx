'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { MessageSquare, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';
import React from 'react';

const GridBackground = () => {
  return (
    <div className="absolute inset-0 z-0 h-full w-full bg-transparent">
      <div
        className={cn(
          'absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:100px_100px] sm:bg-[size:60px_60px]'
        )}
      ></div>
    </div>
  );
};


const Hero = () => {

  return (
    <section
      id="home"
      className="relative isolate bg-transparent scroll-mt-20 h-screen min-h-[700px] md:min-h-[800px] flex items-center overflow-hidden"
    >
      <GridBackground />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent to-background" />

      <div className="container z-20 px-6 flex flex-col justify-center pt-24 md:pt-0">
        <motion.div 
          className="flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        >
          <div className="inline-block rounded-full bg-background/80 backdrop-blur-sm border border-border/40 text-accent px-4 py-1 text-sm font-medium mb-6 self-center">
            Hi 👋, Siap Meluncurkan Proyek Digital Anda?
          </div>

          <h1 className="text-4xl font-headline font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl max-w-3xl">
            Solusi Digital & Automasi
          </h1>

          <div className="mt-4 text-center">
            <h2 className="text-6xl font-headline font-extrabold tracking-tight sm:text-7xl md:text-8xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-accent to-foreground animate-gradient bg-[length:400%_400%]">
                Audy Al Vasyah
              </span>
            </h2>
            <p className="text-xl font-medium text-muted-foreground mt-2">
              Spesialis IT & Automasi Proses
            </p>
          </div>

          <p className="mt-6 max-w-3xl text-lg text-slate-300 sm:text-xl">
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
    </section>
  );
};

export default Hero;
