'use client';
import { useState, useEffect, useRef } from 'react';

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
    if (vantaEffect || !vantaRef.current) return;

    const threeScript = document.createElement('script');
    threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
    threeScript.async = true;
    
    threeScript.onload = () => {
      const vantaScript = document.createElement('script');
      vantaScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.clouds.min.js';
      vantaScript.async = true;

      vantaScript.onload = () => {
        if (window.VANTA && window.VANTA.CLOUDS) {
          const effect = window.VANTA.CLOUDS({
            el: vantaRef.current,
            THREE: window.THREE, // Gunakan THREE dari window
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            skyColor: 0x121212,
            cloudColor: 0x7df9ff,
          });
          setVantaEffect(effect);
        }
      };
      
      document.body.appendChild(vantaScript);
    };

    document.body.appendChild(threeScript);

    // Cleanup function
    return () => {
      if (vantaEffect) {
        vantaEffect.destroy();
      }
      // Hapus skrip yang ditambahkan secara dinamis
      const scripts = document.querySelectorAll('script[src*="three.min.js"], script[src*="vanta.clouds.min.js"]');
      scripts.forEach(s => s.remove());
    };
  }, [vantaEffect]); // Hanya bergantung pada vantaEffect

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
