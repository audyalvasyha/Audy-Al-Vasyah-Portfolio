'use client';

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
// Jangan impor Vanta di sini, kita akan memuatnya secara dinamis

const WebGLBackground = () => {
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const vantaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let effect: any = null;
    
    if (vantaRef.current) {
      // Muat skrip Vanta secara dinamis
      import('vanta/dist/vanta.topology.min.js')
        .then((vanta) => {
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
              color: 0x7df9ff,
              backgroundColor: 0x121212,
            });
            setVantaEffect(effect);
          }
        })
        .catch((e) => {
          console.error("Vanta loading error:", e);
        });
    }

    return () => {
      if (effect) {
        effect.destroy();
      }
    };
  }, []);

  return <div ref={vantaRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
};

export default WebGLBackground;
