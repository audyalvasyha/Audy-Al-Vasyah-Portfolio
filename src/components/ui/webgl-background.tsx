'use client';
import React, { useState, useEffect, useRef } from 'react';

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
  const observerRef = useRef<IntersectionObserver | null>(null);

  const destroyVantaEffect = () => {
    if (vantaEffect) {
      vantaEffect.destroy();
      setVantaEffect(null);
    }
  };

  const createVantaEffect = () => {
    if (vantaRef.current && window.VANTA && window.VANTA.CLOUDS && !vantaEffect) {
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
  };
  
  useEffect(() => {
    // Fungsi untuk memuat skrip
    const loadScript = (src: string, integrity: string, crossOrigin: string, onCondition: () => boolean, onLoad: () => void) => {
      if (onCondition()) {
        onLoad();
        return;
      }
      const script = document.createElement('script');
      script.src = src;
      script.integrity = integrity;
      script.crossOrigin = crossOrigin;
      script.async = true;
      script.onload = onLoad;
      document.body.appendChild(script);
      return script;
    };

    let threeScript: HTMLScriptElement | undefined;
    let vantaScript: HTMLScriptElement | undefined;

    // Muat THREE.js, lalu Vanta.js
    threeScript = loadScript(
      'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js',
      'sha512-334uBDwY0iZ2TklV19s96JbS/Kz2GviLhCg+nB_3u/U6iOCrJ_O9N3337c33T0JEvs3eXglS3rSgJ5U6fe1+g==',
      'anonymous',
      () => !!window.THREE,
      () => {
        vantaScript = loadScript(
          'https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.clouds.min.js',
          'sha512-iJfr6u1+w9joxeGj6i6h6nS6eW0F1Qf0B9u0v2/vSfrJ10NfTqBf14pU9f3P+v1eI1yua3w3i2cEh1Jz2BJQ==',
          'anonymous',
          () => !!(window.VANTA && window.VANTA.CLOUDS),
          () => {
            // Skrip dimuat, sekarang observer akan menangani pembuatan efek
          }
        );
      }
    );
    
    // Cleanup function utama
    return () => {
      destroyVantaEffect();
       if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (threeScript && threeScript.parentNode) {
        threeScript.parentNode.removeChild(threeScript);
      }
      if (vantaScript && vantaScript.parentNode) {
        vantaScript.parentNode.removeChild(vantaScript);
      }
    };
  }, []); // Hanya dijalankan sekali saat komponen dipasang

  useEffect(() => {
    if (vantaRef.current) {
      observerRef.current = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          // Buat efek Vanta saat elemen masuk ke viewport
          createVantaEffect();
        } else {
          // Hancurkan efek Vanta saat elemen keluar dari viewport
          destroyVantaEffect();
        }
      });
      observerRef.current.observe(vantaRef.current);
    }
  }, [vantaRef]); // Dijalankan saat ref tersedia

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
