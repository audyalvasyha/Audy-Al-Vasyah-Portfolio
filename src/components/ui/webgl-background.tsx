'use client';

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
// Make sure to add the correct vanta import
import DOTS from 'vanta/dist/vanta.dots.min';

const WebGLBackground = () => {
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const vantaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!vantaEffect && vantaRef.current) {
      setVantaEffect(
        DOTS({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          backgroundColor: 0x1d2432,
          color: 0x93f2d2,
          color2: 0x93f2d2,
          size: 2.5,
          spacing: 30.00,
          showLines: false,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return <div ref={vantaRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
};

export default WebGLBackground;
