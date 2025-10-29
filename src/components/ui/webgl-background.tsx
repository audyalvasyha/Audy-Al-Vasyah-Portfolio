'use client';
import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';

// Deklarasikan window.VANTA dan window.THREE untuk menghindari error TypeScript
declare global {
  interface Window {
    VANTA: any;
    THREE: any;
  }
}

const WebGLBackground: React.FC = () => {
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const vantaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!vantaRef.current || vantaEffect) return;

    // Fungsi untuk memuat skrip
    const loadScript = (src: string, onCondition: () => boolean, onLoad: () => void) => {
      if (onCondition()) {
        onLoad();
        return;
      }
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = onLoad;
      document.body.appendChild(script);
      return script;
    };
    
    let threeScript: HTMLScriptElement | undefined;
    let vantaScript: HTMLScriptElement | undefined;

    // 1. Muat THREE.js terlebih dahulu
    threeScript = loadScript(
      'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js',
      () => !!window.THREE,
      () => {
        // 2. Setelah THREE.js dimuat, muat skrip Vanta
        vantaScript = loadScript(
          'https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.clouds.min.js',
          () => !!(window.VANTA && window.VANTA.CLOUDS),
          () => {
            // 3. Setelah kedua skrip dimuat, inisialisasi Vanta
            if (vantaRef.current && !vantaEffect) {
              const effect = window.VANTA.CLOUDS({
                el: vantaRef.current,
                THREE: window.THREE,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.0,
                minWidth: 200.0,
                skyColor: 0x121212,
                cloudColor: 0x234f6d,
              });
              setVantaEffect(effect);
            }
          }
        );
      }
    );

    // Cleanup function
    return () => {
      if (vantaEffect) {
        vantaEffect.destroy();
      }
      // Hapus skrip yang ditambahkan secara dinamis untuk kebersihan
      if (threeScript && threeScript.parentNode) {
        threeScript.parentNode.removeChild(threeScript);
      }
      if (vantaScript && vantaScript.parentNode) {
        vantaScript.parentNode.removeChild(vantaScript);
      }
    };
  }, [vantaEffect]); // Hanya dijalankan sekali saat komponen dipasang

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
