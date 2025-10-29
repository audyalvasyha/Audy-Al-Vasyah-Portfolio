'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const WebGLBackground = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    let mouseX = 0;
    let mouseY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 300;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);
    
    const particlesCount = 1500;
    const positions = new Float32Array(particlesCount * 3);
    const velocities = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;
        positions[i3] = (Math.random() - 0.5) * 800;
        positions[i3 + 1] = (Math.random() - 0.5) * 800;
        positions[i3 + 2] = (Math.random() - 0.5) * 800;

        velocities[i3] = (Math.random() - 0.5) * 0.1;
        velocities[i3 + 1] = (Math.random() - 0.5) * 0.1;
        velocities[i3 + 2] = (Math.random() - 0.5) * 0.1;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        color: 0x93f2d2, // HSL(158, 77%, 70%)
        size: 2,
        blending: THREE.AdditiveBlending,
        transparent: true,
        sizeAttenuation: true,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Lines
    const linesGeometry = new THREE.BufferGeometry();
    // Pre-allocate a large enough buffer for lines. This is an estimate.
    const maxLineConnections = particlesCount * 5; // Estimate max connections
    const linePositions = new Float32Array(maxLineConnections * 3 * 2);
    linesGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3).setUsage(THREE.DynamicDrawUsage));

    const linesMaterial = new THREE.LineBasicMaterial({
        color: 0x93f2d2, // HSL(158, 77%, 70%)
        linewidth: 1,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.1
    });

    const lines = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(lines);


    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      const positions = particles.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;
        positions[i3] += velocities[i3];
        positions[i3 + 1] += velocities[i3 + 1];
        positions[i3 + 2] += velocities[i3 + 2];
        
        if (positions[i3 + 1] < -400 || positions[i3 + 1] > 400) velocities[i3 + 1] *= -1;
        if (positions[i3] < -400 || positions[i3] > 400) velocities[i3] *= -1;
        if (positions[i3 + 2] < -400 || positions[i3 + 2] > 400) velocities[i3 + 2] *= -1;
      }
      
      const linePositions = (lines.geometry.attributes.position.array as Float32Array);
      let numConnected = 0;
      
      const distanceThreshold = 50;

      for (let i = 0; i < particlesCount; i++) {
          for (let j = i + 1; j < particlesCount; j++) {
              if (numConnected >= maxLineConnections -1) break;

              const i3 = i * 3;
              const j3 = j * 3;
              const dx = positions[i3] - positions[j3];
              const dy = positions[i3 + 1] - positions[j3 + 1];
              const dz = positions[i3 + 2] - positions[j3 + 2];
              const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
              
              if (dist < distanceThreshold) {
                  linePositions[numConnected * 6] = positions[i3];
                  linePositions[numConnected * 6 + 1] = positions[i3 + 1];
                  linePositions[numConnected * 6 + 2] = positions[i3 + 2];
                  
                  linePositions[numConnected * 6 + 3] = positions[j3];
                  linePositions[numConnected * 6 + 4] = positions[j3 + 1];
                  linePositions[numConnected * 6 + 5] = positions[j3 + 2];
                  numConnected++;
              }
          }
          if (numConnected >= maxLineConnections -1) break;
      }
      
      lines.geometry.setDrawRange(0, numConnected * 2);
      lines.geometry.attributes.position.needsUpdate = true;
      particles.geometry.attributes.position.needsUpdate = true;

      camera.position.x += (mouseX - camera.position.x) * 0.05;
      camera.position.y += (-mouseY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    const onDocumentMouseMove = (event: MouseEvent) => {
        mouseX = (event.clientX - windowHalfX) / 2;
        mouseY = (event.clientY - windowHalfY) / 2;
    }

    // Handle window resize
    const handleResize = () => {
      const currentMount = mountRef.current;
      if (!currentMount) return;
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('mousemove', onDocumentMouseMove);
    
    // Initial size
    handleResize();

    // Cleanup
    const currentMount = mountRef.current;
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', onDocumentMouseMove);
      if (currentMount) {
        currentMount.removeChild(renderer.domElement);
      }
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      linesGeometry.dispose();
      linesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="fixed top-0 left-0 w-full h-full -z-10 bg-background" />;
};

export default WebGLBackground;
