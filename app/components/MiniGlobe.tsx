'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useRef } from 'react'

function RotatingSphere() {
  const meshRef = useRef<THREE.Mesh>(null)

  // Nu är useFrame inuti Canvas-komponentens barn → inga fel
  useFrame(() => {
    if (!meshRef.current) return
    meshRef.current.rotation.y += 0.01
    const t = performance.now() * 0.001
    const s = 0.9 + Math.sin(t * 2) * 0.05
    meshRef.current.scale.setScalar(s)
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshPhysicalMaterial
        color="#00aaff"
        transmission={0.9}
        opacity={0.45}
        transparent
        roughness={0.15}
        metalness={0.1}
        clearcoat={1}
        clearcoatRoughness={0.1}
        emissive="#00aaff"
        emissiveIntensity={0.4}
      />
    </mesh>
  )
}

export default function MiniGlobe() {
  return (
    <div
      style={{
        width: 200,
        height: 200,
        isolation: 'isolate',
        transform: 'translateZ(0)',
        willChange: 'transform',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 3] }}
        style={{
          background: 'transparent',
        }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[2, 3, 4]} intensity={1.4} />
        <RotatingSphere /> {/* ← useFrame körs här inne */}
      </Canvas>
    </div>
  )
}
