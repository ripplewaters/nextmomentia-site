'use client'

import { Space_Grotesk } from 'next/font/google'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { useRef } from 'react'

// 🔹 Importera postprocessing-komponenter
import { EffectComposer, Bloom } from '@react-three/postprocessing'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['700'],
})

// --- Glob-komponenten ---
function TwoToneGlobe() {
  const meshRef = useRef<THREE.Mesh>(null!)
  const map = useLoader(THREE.TextureLoader, '/textures/earth_bw.jpg')

  useFrame(() => {
    if (meshRef.current) meshRef.current.rotation.y += 0.002
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 128, 128]} />
      <meshStandardMaterial
        map={map}
        color="#ffffff"
        emissive="#ffffff"
        emissiveIntensity={0.15}
        roughness={0.4}
        metalness={0.1}
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
        }}
      >
        NextMomentia
      </h1>

      <Canvas camera={{ position: [0, 0, 3.5] }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1.5} />

        <TwoToneGlobe />

        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.3} />

        {/* ✨ Glow-effekten */}
        <EffectComposer>
          <Bloom
            intensity={0.6}       // styrkan på glöden
            luminanceThreshold={0.1}
            luminanceSmoothing={0.9}
            height={300}
          />
        </EffectComposer>
      </Canvas>

      <p
        style={{
          position: 'absolute',
          bottom: '8%',
          opacity: 0.8,
          letterSpacing: '-0.5px',
        }}
      >
        Delivering the internet’s most powerful moments 🌐
      </p>
    </main>
  )
}
