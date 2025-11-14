'use client';

import { cn } from '@/lib/utils';
import React, { useEffect, useRef } from 'react';

interface InteractiveGridBackgroundProps {
  className?: string;
}

const InteractiveGridBackground: React.FC<InteractiveGridBackgroundProps> = ({
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      container.style.setProperty('--mouse-x', `${x}px`);
      container.style.setProperty('--mouse-y', `${y}px`);
    };

    container.addEventListener('mousemove', handleMouseMove);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        'interactive-grid absolute inset-0 -z-10 h-full w-full',
        className
      )}
    ></div>
  );
};

export default InteractiveGridBackground;
