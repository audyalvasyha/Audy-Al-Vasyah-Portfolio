'use client';

import { motion } from 'framer-motion';
import React from 'react';

const ballSize = 8;

interface PathData {
  xPath: number[];
  yPath: number[];
  speed: number;
}

interface AnimatedPathProps extends PathData {
  gridSize: number;
}

const AnimatedPath: React.FC<AnimatedPathProps> = ({ xPath, yPath, speed, gridSize }) => {
  const duration = xPath.length * speed;
  const ballOffset = -ballSize / 2;
  const p = (gridUnits: number): number => gridUnits * gridSize;

  const ballKeyframes = {
    x: xPath.map((u) => p(u) + ballOffset),
    y: yPath.map((u) => p(u) + ballOffset),
  };

  const segments = [];
  for (let i = 0; i < xPath.length - 1; i++) {
    const isHorizontal = yPath[i] === yPath[i + 1];
    const x = Math.min(xPath[i], xPath[i + 1]);
    const y = Math.min(yPath[i], yPath[i + 1]);

    // THE FINAL FIX: Smoother, overlapping transitions.
    // Start fading in before the ball reaches the segment to create a seamless handover.
    const fadeInStartTime = (i - 0.5) * speed;
    const peakTime = (i + 1) * speed; // Peak brightness when ball leaves the segment
    const trailDuration = 4 * speed;   // Existing trail length
    const fadeOutEndTime = peakTime + trailDuration;

    const opacityKeyframes = [0, 0, 1, 0, 0];
    const timePoints = [
        0,
        Math.max(0, fadeInStartTime / duration), // Start fade-in earlier for overlap
        peakTime / duration,                     // Reach peak brightness
        Math.min(fadeOutEndTime / duration, 1),  // End fade-out
        1,
    ];

    segments.push(
      <motion.div
        key={i}
        className={`absolute bg-accent/80 shadow-[0_0_8px_1px] shadow-accent/80 rounded-full blur-[1px]`}
        style={{
          top: p(y),
          left: p(x),
          width: isHorizontal ? gridSize : 2,
          height: isHorizontal ? 2 : gridSize,
          translateX: isHorizontal ? 0 : -1,
          translateY: isHorizontal ? -1 : 0,
        }}
        animate={{ opacity: opacityKeyframes }}
        transition={{ 
            duration, 
            repeat: Infinity, 
            ease: 'linear', 
            times: timePoints 
        }}
      />
    );
  }

  return (
    <>
      {segments}
      <motion.div
        className="absolute h-2 w-2 rounded-full bg-accent/50 shadow-lg shadow-accent/40"
        style={{ top: 0, left: 0, width: ballSize, height: ballSize }}
        animate={ballKeyframes}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
      />
    </>
  );
};

export const GridGlobe = ({ gridSize }: { gridSize: number }) => {
  const paths: PathData[] = [
    { xPath: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1], yPath: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], speed: 0.4 },
    { xPath: [18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18], yPath: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3], speed: 0.6 },
    { xPath: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], yPath: [1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2, 1], speed: 0.7 },
    { xPath: [15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15], yPath: [3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2, 1, 2, 3], speed: 0.7 },
  ];

  if (!gridSize || gridSize === 0) {
    return null;
  }

  return (
    <div className="absolute inset-0 h-full w-full">
      {paths.map((path, index) => (
        <AnimatedPath key={index} {...path} gridSize={gridSize} />
      ))}
    </div>
  );
};
