'use client'

import { motion } from 'framer-motion';
import { useMemo } from 'react';

const numParticles = 100;

export function MotionBackground() {
  const particles = useMemo(() => {
    return Array.from({ length: numParticles }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1.5 + Math.random() * 4,
      duration: 15 + Math.random() * 20,
      delay: Math.random() * 15,
      directionX: Math.random() > 0.5 ? 1 : -1,
      directionY: Math.random() > 0.5 ? 1 : -1,
    }));
  }, []);

  return (
    <div className="absolute inset-0 -z-10 w-full h-full overflow-hidden">
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
