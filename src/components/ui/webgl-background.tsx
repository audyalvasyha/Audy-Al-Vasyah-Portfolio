'use client';

import React, { useRef, useEffect, useState } from 'react';
// Impor THREE.js dihapus karena Vanta akan menanganinya
// import * as THREE from 'three';
import DOTS from 'vanta/dist/vanta.dots.min';

const WebGLBackground = () => {
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const vantaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Tambahkan variabel untuk memegang instance Three.js agar bisa digunakan oleh Vanta
    let three: any;

    if (!vantaEffect && vantaRef.current) {
      // Pastikan untuk menangani import dinamis dengan benar
      const initializeVanta = async () => {
        // Vanta memerlukan THREE.js, jadi kita pastikan ia ada di window scope
        // atau kita bisa mengimpornya dan meneruskannya, tetapi vanta.d.ts seringkali
        // mengharapkan THREE sebagai global.
        // Cara yang lebih aman adalah membiarkan Vanta memuatnya.
        
        // Kita tidak perlu meneruskan THREE secara eksplisit jika vanta.dots.min.js menyertakannya
        setVantaEffect(
          DOTS({
            el: vantaRef.current,
            // Hapus properti THREE, biarkan Vanta menggunakan versi internalnya
            // THREE: THREE, 
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
