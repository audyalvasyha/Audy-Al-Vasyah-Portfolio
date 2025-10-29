'use client';
import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';

// Deklarasikan window.VANTA untuk menghindari error TypeScript
declare global {
  interface Window {
    VANTA: any;
  }
}

const WebGLBackground: React.FC = () => {
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const vantaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!vantaRef.current || vantaEffect) return;

    // Load vanta.js script dynamically
    const script = document.createElement('script');
    script.src =
      'https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.topology.min.js';
    script.async = true;

    script.onload = () => {
      // Once the script is loaded, initialize Vanta
      if (window.VANTA && window.VANTA.TOPOLOGY) {
        const effect = window.VANTA.TOPOLOGY({
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
    };

    document.body.appendChild(script);

    // Cleanup function
    return () => {
      if (vantaEffect) {
        vantaEffect.destroy();
      }
      // Clean up the added script tag
      const existingScript = document.querySelector(`script[src="${script.src}"]`);
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, [vantaEffect]);

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
