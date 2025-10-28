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

// --- Partikelfältet ---
function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null!)

  // skapa tusentals punkter
  const particles = useMemo(() => {
    const count = 1200
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 6 // sprid ut runt globen
    }
    return positions
  }, [])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.05
      pointsRef.current.rotation.x = Math.sin(t * 0.1) * 0.05
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        {/* 🔧 FIX: lägg till args i stället för separata props */}
        <bufferAttribute
          attach="attributes-position"
          args={[particles, 3]} // [array, itemSize]
          count={particles.length / 3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#80bfff"
        size={0.02}
        sizeAttenuation
        transparent
        opacity={0.8}
      />
    </points>
  )
}

// --- Globen ---
function EnergyGlobe() {
  const outerRef = useRef<THREE.Mesh>(null!)
  const innerRef = useRef<THREE.Mesh>(null!)
  const map = useLoader(THREE.TextureLoader, '/textures/earth_bw.jpg')

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (outerRef.current) outerRef.current.rotation.y += 0.0015
    if (innerRef.current) innerRef.current.rotation.y -= 0.001
    const glow = 0.3 + Math.sin(t * 2) * 0.25
    if (innerRef.current?.material instanceof THREE.MeshStandardMaterial) {
      innerRef.current.material.emissiveIntensity = glow
    }
  })

  return (
    <>
      <mesh ref={outerRef}>
        <sphereGeometry args={[1.05, 64, 64]} />
        <meshStandardMaterial
          map={map}
          color="#66ccff"
          emissive="#66ccff"
          emissiveIntensity={0.8}
          transparent
          opacity={0.15}
          wireframe
        />
      </mesh>

      <mesh ref={innerRef}>
        <sphereGeometry args={[0.98, 128, 128]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#80bfff"
          emissiveIntensity={0.5}
          roughness={0.3}
          metalness={0.2}
          transparent
          opacity={0.6}
          toneMapped={false}
        />
      </mesh>
    </>
  )
}

// --- Bakgrunds-lager (mjuk gradient som pulserar) ---
function AnimatedBackground() {
  const meshRef = useRef<THREE.Mesh>(null!)
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (meshRef.current?.material instanceof THREE.MeshBasicMaterial) {
      const c1 = new THREE.Color(0x040224)
      const c2 = new THREE.Color(0x0b1358)
      const mix = (Math.sin(t * 0.3) + 1) / 2
      meshRef.current.material.color.copy(c1).lerp(c2, mix)
    }
  })

  return (
    <mesh ref={meshRef} scale={[50, 50, 1]} position={[0, 0, -10]}>
      <planeGeometry args={[2, 2]} />
      <meshBasicMaterial color="#040224" />
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
        <ambientLight intensity={0.8} />
        <pointLight position={[3, 3, 5]} intensity={1.6} />

        <AnimatedBackground /> {/* ← rörlig bakgrund */}
        <ParticleField />      {/* ← partiklar */}
        <EnergyGlobe />        {/* ← globen */}

        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.1} />

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
        DON'T JUST WATCH. REACT 🌐
      </p>
    </main>
  )
}
