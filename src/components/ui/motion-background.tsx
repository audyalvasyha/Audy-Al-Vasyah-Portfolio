'use client'

import { motion } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';

const numParticles = 100;

interface Particle {
  id: number | string;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  directionX: number;
  directionY: number;
}

export function MotionBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mainStar, setMainStar] = useState<Particle | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      setMainStar({
        id: 'main-star',
        x: 20 + Math.random() * 60,
        y: 30 + Math.random() * 40,
        size: 40 + Math.random() * 20,
        duration: 50 + Math.random() * 30,
        delay: Math.random() * 5,
        directionX: Math.random() > 0.5 ? 1 : -1,
        directionY: Math.random() > 0.5 ? 1 : -1,
      });

      setParticles(
        Array.from({ length: numParticles }).map((_, i) => ({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: 1.5 + Math.random() * 6,
          duration: 15 + Math.random() * 20,
          delay: Math.random() * 15,
          directionX: Math.random() > 0.5 ? 1 : -1,
          directionY: Math.random() > 0.5 ? 1 : -1,
        }))
      );
    }
  }, [isMounted]);

  if (!isMounted) {
    return null; // Return null on the server and initial client render
  }

  return (
    <div className="absolute inset-0 -z-10 w-full h-full overflow-hidden">
      {/* Main Star / Planet */}
      {mainStar && (
        <motion.div
          key={mainStar.id}
          className="absolute rounded-full bg-primary/20" // Slightly more opaque
          style={{
            left: `${mainStar.x}%`,
            top: `${mainStar.y}%`,
            width: `${mainStar.size}px`,
            height: `${mainStar.size}px`,
            filter: 'blur(8px)', // Add a glow effect
          }}
          animate={{
              x: [0, (Math.random() * 100 - 50) * mainStar.directionX, 0],
              y: [0, (Math.random() * 100 - 50) * mainStar.directionY, 0],
              scale: [1, 1.1, 1],
              opacity: [0, 0.8, 0],
          }}
          transition={{
              duration: mainStar.duration,
              delay: mainStar.delay,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeInOut',
          }}
        />
      )}


      {/* Smaller Stars */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-primary/30"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
          }}
          animate={{
            x: [0, (Math.random() * 200 - 100) * p.directionX, 0],
            y: [0, (Math.random() * 200 - 100) * p.directionY, 0],
            scale: [1, 1.5, 1],
            opacity: [0, 0.7, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}