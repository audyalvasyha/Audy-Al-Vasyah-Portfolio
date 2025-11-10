'use client';

import React from 'react';
import { cn } from '@/lib/utils';

const GridBall = ({
  className,
  duration,
  delay,
}: {
  className?: string;
  duration?: string;
  delay?: string;
}) => (
  <div
    className={cn(
      'absolute h-1.5 w-1.5 rounded-full bg-accent/50',
      className
    )}
    style={{
      animationName: 'move-ball',
      animationTimingFunction: 'linear',
      animationIterationCount: 'infinite',
      animationDuration: duration,
      animationDelay: delay,
    }}
  />
);

const GridBallAnimation = () => {
  return (
    <div className="absolute inset-0 h-full w-full overflow-hidden">
      <GridBall className="top-1/4" duration="20s" delay="0s" />
      <GridBall className="top-1/2" duration="25s" delay="-5s" />
      <GridBall className="top-3/4" duration="18s" delay="-10s" />
       {/* Add more balls for vertical movement if desired */}
    </div>
  );
};

export default GridBallAnimation;
