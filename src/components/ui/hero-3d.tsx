'use client'

import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { Icosahedron, useMatcapTexture } from '@react-three/drei'
import { useMemo, useRef } from 'react'

const tempObject = new THREE.Object3D()
const tempColor = new THREE.Color()

function Spheres({ count = 100 }) {
  const [matcapTexture] = useMatcapTexture('3B3C3F_DAD9D5_929290_ABACA8', 256)
  const ref = useRef<THREE.InstancedMesh>(null!)

  const particles = useMemo(() => {
    const data = []
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100
      const factor = 20 + Math.random() * 100
      const speed = 0.01 + Math.random() / 200
      const xFactor = -50 + Math.random() * 100
      const yFactor = -50 + Math.random() * 100
      const zFactor = -50 + Math.random() * 100
      data.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 })
    }
    return data
  }, [count])

  useFrame((state, delta) => {
    if (!ref.current) return

    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle
      t = particle.t += speed / 2
      const a = Math.cos(t) + Math.sin(t * 1) / 10
      const b = Math.sin(t) + Math.cos(t * 2) / 10
      const s = Math.cos(t)
      
      tempObject.position.set(
        (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      )
      tempObject.scale.setScalar(s * 1.5)
      tempObject.updateMatrix()
      ref.current.setMatrixAt(i, tempObject.matrix)
    })
    ref.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <icosahedronGeometry args={[1, 0]} />
      <meshMatcapMaterial matcap={matcapTexture} />
    </instancedMesh>
  )
}

export function Hero3D() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 30] }}
        gl={{ antialias: false, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Spheres />
      </Canvas>
    </div>
  )
}
