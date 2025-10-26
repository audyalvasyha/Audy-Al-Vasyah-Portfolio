'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

// Definisikan tipe untuk instance efek Vanta agar TypeScript memahaminya
interface VantaEffect {
  destroy: () => void;
}

declare global {
  interface Window {
    THREE: any;
    VANTA: any;
  }
}

const VantaBackground = () => {
  const vantaRef = useRef(null);
  const vantaEffectRef = useRef<VantaEffect | null>(null);

  const [threeLoaded, setThreeLoaded] = useState(false);
  const [vantaLoaded, setVantaLoaded] = useState(false);

  useEffect(() => {
    // Inisialisasi Vanta hanya ketika kedua skrip dimuat dan efek belum dibuat
    if (threeLoaded && vantaLoaded && !vantaEffectRef.current) {
      if (window.VANTA && window.THREE) {
        vantaEffectRef.current = window.VANTA.GLOBE({
          el: vantaRef.current,
          THREE: window.THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x9bf2d4, // Warna aksen untuk globe
          backgroundColor: 0x111827, // Warna latar belakang mode gelap
        });
      }
    }

    // Fungsi cleanup: hancurkan efek saat komponen di-unmount
    return () => {
      if (vantaEffectRef.current) {
        vantaEffectRef.current.destroy();
        vantaEffectRef.current = null;
      }
    };
  }, [threeLoaded, vantaLoaded]); // Dependensi untuk memicu efek

  return (
    <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
        strategy="lazyOnload"
        onLoad={() => setThreeLoaded(true)}
      />
      {/* Diperbarui: Muat skrip Vanta.GLOBE */}
      {threeLoaded && (
        <Script
          src="https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.globe.min.js"
          strategy="lazyOnload"
          onLoad={() => setVantaLoaded(true)}
        />
      )}

      <div ref={vantaRef} className="absolute inset-0 -z-10" />
    </>
  );
};

export default VantaBackground;
