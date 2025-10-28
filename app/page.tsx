'use client'

import { Space_Grotesk } from 'next/font/google'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { useRef, useMemo } from 'react'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['700'],
})

// --- Partikelfält (frikopplat från kameran) ---
function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null!)

  const particles = useMemo(() => {
    const count = 1000
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10
    }
    return positions
  }, [])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.01
      pointsRef.current.rotation.x = Math.sin(t * 0.05) * 0.02
    }
  })

  return (
    <group position={[0, 0, -4]}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particles, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#80bfff"
          size={0.025}
          sizeAttenuation
          transparent
          opacity={0.25}
        />
      </points>
    </group>
  )
}

// --- Ny, enkel och fungerande Glow-Earth baserad på din inverterade textur ---
function GlowEarth() {
  const earthRef = useRef<THREE.Mesh>(null!)
  const map = useLoader(THREE.TextureLoader, '/textures/earth_bw_inv.jpg')

  useFrame(() => {
    if (earthRef.current) earthRef.current.rotation.y += 0.0015
  })

  return (
    <mesh ref={earthRef}>
      <sphereGeometry args={[1, 128, 128]} />
      <meshStandardMaterial
        map={map}
        color="#ffffff"
        emissive="#ffffff"
        emissiveIntensity={2.2}
        roughness={0.2}
        metalness={0.1}
        transparent
        opacity={0.95}
        toneMapped={false}
      />
    </mesh>
  )
}

// --- Huvudkomponenten ---
export default function Home() {
  return (
    <main
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#040224',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontFamily:
          '"Century Gothic", CenturyGothic, AppleGothic, sans-serif',
        overflow: 'hidden',
      }}
    >
      <h1
        className={spaceGrotesk.className}
        style={{
          position: 'absolute',
          top: '6%',
          textAlign: 'center',
          fontSize: '3rem',
          fontWeight: '700',
          letterSpacing: '-1.2px',
          background: 'linear-gradient(90deg, #ffffff 0%, #80bfff 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 0 15px rgba(128,191,255,0.35)',
          zIndex: 10,
        }}
      >
        NextMomentia
      </h1>

      <Canvas camera={{ position: [0, 0, 3.5] }}>
        {/* Bakgrunds-element */}
        <ambientLight intensity={0.8} />
        <pointLight position={[3, 3, 5]} intensity={1.6} />

        <ParticleField /> {/* ← Partiklar som inte påverkas av orbit */}
        <group>
          <GlowEarth /> {/* ← Globen som kan roteras */}
          <OrbitControls enableZoom={false} autoRotate={false} />
        </group>

        <EffectComposer>
          <Bloom
            intensity={1.3}
            luminanceThreshold={0.0}
            luminanceSmoothing={1.2}
            height={400}
          />
        </EffectComposer>
      </Canvas>

      <p
        style={{
          position: 'absolute',
          bottom: '8%',
          opacity: 0.8,
          letterSpacing: '-0.5px',
          zIndex: 10,
        }}
      >
        DON'T JUST WATCH. REACT.
      </p>
    </main>
  )
}

