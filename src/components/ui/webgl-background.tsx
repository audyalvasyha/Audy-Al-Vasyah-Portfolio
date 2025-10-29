'use client';
import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import TOPOLOGY from 'vanta/dist/vanta.topology.min.js';

const WebGLBackground: React.FC = () => {
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const vantaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!vantaEffect && vantaRef.current) {
      setVantaEffect(
        TOPOLOGY({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x7df9ff,
          backgroundColor: 0x121212,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div
      ref={vantaRef}
      style={{ width: '100%', height: '100%', position: 'fixed', top: 0, left: 0, zIndex: -10 }}
    />
  );
};

export default WebGLBackground;
