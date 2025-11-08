'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Briefcase, MessageSquare } from 'lucide-react';
import WAVES from 'vanta/dist/vanta.waves.min';
import * as THREE from 'three';


const Hero = () => {
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const vantaRef = useRef(null);

  useEffect(() => {
    if (!vantaEffect) {
        setVantaEffect(WAVES({
            el: vantaRef.current,
            THREE: THREE,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x152238,
            shininess: 30.00,
            waveHeight: 15.00,
            waveSpeed: 0.75,
            zoom: 0.75
        }))
    }
    return () => {
        if (vantaEffect) vantaEffect.destroy()
    }
}, [vantaEffect]);


  return (
    <section
      id="home"
      ref={vantaRef}
      className="relative isolate bg-transparent scroll-mt-20 h-screen min-h-[700px] md:min-h-[800px] flex items-center overflow-hidden"
    >
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-background/50 to-background" />

      <div className="container z-20 px-6 flex flex-col justify-center pt-24 md:pt-0">
        <motion.div 
          className="flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        >
          <div className="inline-block rounded-full bg-accent text-accent-foreground px-4 py-1 text-sm font-medium mb-6 self-center">
            Hi 👋, Siap Meluncurkan Proyek Digital Anda?
          </div>

          <h1 className="text-4xl font-headline font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl max-w-3xl">
            Solusi Digital & Automasi
          </h1>

          <div className="mt-4 text-center">
            <h2 className="text-6xl font-headline font-extrabold tracking-tight sm:text-7xl md:text-8xl">
              <span className="bg-gradient-to-br from-accent via-foreground to-accent text-transparent bg-clip-text animate-gradient bg-[length:400%_400%]">
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
