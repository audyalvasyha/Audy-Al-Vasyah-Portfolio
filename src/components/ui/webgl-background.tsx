'use client';
import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
// Jangan impor Vanta di sini untuk menghindari masalah SSR

const WebGLBackground: React.FC = () => {
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const vantaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let effect: any = null;

    const initializeVanta = async () => {
      if (vantaRef.current && !effect) {
        // Impor Vanta secara dinamis hanya di sisi klien
        const vanta = await import('vanta/dist/vanta.topology.min.js');
        const TOPOLOGY = vanta.default || vanta;

        // Periksa apakah window.VANTA sudah tersedia
        if (window.VANTA && window.VANTA.TOPOLOGY) {
          effect = window.VANTA.TOPOLOGY({
            el: vantaRef.current,
            THREE: THREE,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
            color: 0x7df9ff, // Warna garis topologi
            backgroundColor: 0x121212, // Warna latar belakang
          });
          setVantaEffect(effect);
        }
      }
    };

    initializeVanta();

    return () => {
      if (effect) {
        effect.destroy();
      }
    };
  }, []);

  return (
    <div
      ref={vantaRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -10,
      }}
    />
  );
};

export default WebGLBackground;
