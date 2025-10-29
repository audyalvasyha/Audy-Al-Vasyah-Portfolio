'use client';

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import DOTS from 'vanta/dist/vanta.dots.min';

const WebGLBackground = () => {
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const vantaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!vantaEffect && vantaRef.current) {
      const initializeVanta = async () => {
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
            color: 0x7DF9FF,
            color2: 0xA7FF83,
            size: 2.5,
            spacing: 30.00,
            showLines: false,
          })
        );
      };
      initializeVanta();
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return <div ref={vantaRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
};

export default WebGLBackground;
