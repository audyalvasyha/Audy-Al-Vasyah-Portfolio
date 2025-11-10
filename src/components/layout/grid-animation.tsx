'use client';

import { cn } from '@/lib/utils';
import React from 'react';

const AnimatedGrid = () => {
  // We generate a large number of dots to cover the screen
  const dots = Array.from({ length: 20 });

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {dots.map((_, i) => {
        const duration = `${Math.random() * 20 + 20}s`; // 20s to 40s
        const delay = `${Math.random() * 20}s`; // 0s to 20s
        const top = `${Math.random() * 100}%`;
        const left = `${Math.random() * 100}%`;

        // Alternate animations
        const animationClass = [
          'animate-[move-right_var(--duration)_linear_infinite]',
          'animate-[move-left_var(--duration)_linear_infinite]',
          'animate-[move-down_var(--duration)_linear_infinite]',
          'animate-[move-up_var(--duration)_linear_infinite]',
        ][i % 4];

        return (
          <div
            key={i}
            className={cn(
              'absolute h-[1px] w-[1px] rounded-full bg-accent/50 shadow-[0_0_8px_1px_hsl(var(--accent)/0.5)]',
              animationClass
            )}
            style={{
              top,
              left,
              animationDelay: delay,
              ['--duration' as string]: duration,
            }}
          />
        );
      })}
    </div>
  );
};

export default AnimatedGrid;
