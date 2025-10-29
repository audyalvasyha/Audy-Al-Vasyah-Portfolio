'use client';

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
// Make sure to add the correct vanta import
import FOG from 'vanta/dist/vanta.fog.min';

const WebGLBackground = () => {
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const vantaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!vantaEffect && vantaRef.current) {
      setVantaEffect(
        FOG({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          highlightColor: 0x93f2d2, // primary theme color
          midtoneColor: 0x3d9a8c,   // a darker shade of the primary
          lowlightColor: 0x1d2432, // background color
          baseColor: 0x1d2432,      // background color
          blurFactor: 0.4,
          speed: 1.0,
          zoom: 0.8,
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
