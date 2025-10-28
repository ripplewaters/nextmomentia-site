'use client'

import { Space_Grotesk } from 'next/font/google'
import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useRef, useMemo } from 'react'
import Globe from 'globe.gl'
import * as THREE from 'three'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['700'],
})

// --- Partikelfält (samma som innan) ---
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

// --- Ny Globe.gl-komponent ---
function GlobeOutline() {
  const globeEl = useRef<HTMLDivElement>(null)

  useEffect(() => {
  // Kör bara i browsern
  if (typeof window === 'undefined' || !globeEl.current) return

  const globe = new Globe(globeEl.current)
    .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
    .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
    .showGraticules(true)
    .showAtmosphere(true)
    .atmosphereColor('#80bfff')
    .atmosphereAltitude(0.15)
    .polygonCapColor(() => 'rgba(255,255,255,0.05)')
    .polygonSideColor(() => 'rgba(255,255,255,0.2)')
    .polygonStrokeColor(() => '#ffffff')

  globe.controls().enableZoom = false
  globe.controls().autoRotate = true
  globe.controls().autoRotateSpeed = 0.8
  globe.width(600).height(600)

  return () => {
    globeEl.current?.replaceChildren()
  }
}, [])

  return <div ref={globeEl} style={{ width: '100%', height: '100%' }} />
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

      {/* Partiklar i bakgrunden */}
      <Canvas camera={{ position: [0, 0, 3.5] }}>
        <ParticleField />
      </Canvas>

      {/* Själva globen */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <GlobeOutline />
      </div>

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

