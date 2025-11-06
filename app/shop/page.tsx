'use client'

import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useRef, useState } from 'react'
import NavBar from '../components/NavBar'

function TShirt({ color, logo }: { color: string; logo: string }) {
  const model = useLoader(GLTFLoader, '/models/tshirt.glb')
  const logoTexture = useLoader(THREE.TextureLoader, `/textures/${logo}`)
  const group = useRef<THREE.Group>(null)

  // Rotera lätt för dynamik
  useFrame(() => {
    if (group.current) group.current.rotation.y += 0.002
  })

  // Applicera färg
  model.scene.traverse((child: any) => {
    if (child.isMesh) {
      child.material.color = new THREE.Color(color)
      child.material.roughness = 0.7
      child.material.metalness = 0.1
    }
  })

  return (
    <group ref={group} scale={2.5}>
      <primitive object={model.scene} />

      {/* PNG-tryck (ligger som ett plan ovanpå bröstet) */}
      <mesh position={[0, 0.35, 0.51]} rotation={[0, 0, 0]}>
        <planeGeometry args={[0.7, 0.4]} />
        <meshBasicMaterial map={logoTexture} transparent opacity={1} />
      </mesh>
    </group>
  )
}

export default function ShopPage() {
  // Tre färger + deras respektive PNG-tryck
  const variants = [
    { color: '#1e3a8a', logo: 'KinW_v1.png' },
    { color: '#b91c1c', logo: 'QE_v1.png' },
    { color: '#f1f5f9', logo: 'ToC_v1.png' },
  ]

  const [index, setIndex] = useState(0)
  const prev = () => setIndex((i) => (i - 1 + variants.length) % variants.length)
  const next = () => setIndex((i) => (i + 1) % variants.length)

  return (
    <main
      style={{
        width: '100vw',
        height: '100vh',
        background: 'radial-gradient(circle at center, #01010e 0%, #000 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontFamily: '"Space Grotesk", sans-serif',
        position: 'relative',
      }}
    >
      <NavBar />

      <h1
        style={{
          fontSize: '1.6rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginBottom: '1.2rem',
          background: 'linear-gradient(90deg,#ffffff,#a8d9ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        NextMomentia Shop
      </h1>

      <div style={{ width: 'min(80vw,600px)', height: '65vh' }}>
        <Canvas camera={{ position: [0, 0, 2.8], fov: 45 }}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[2, 3, 5]} intensity={1.2} />
          <TShirt
            color={variants[index].color}
            logo={variants[index].logo}
          />
          {/* Begränsa rotation till horisontell */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 2.05}
            maxPolarAngle={Math.PI / 2.05}
          />
        </Canvas>
      </div>

      {/* PILAR FÖR ATT BYTA VARIANT */}
      <div
        style={{
          position: 'absolute',
          bottom: '12%',
          display: 'flex',
          gap: '2rem',
          fontSize: '2rem',
          cursor: 'pointer',
          userSelect: 'none',
        }}
      >
        <span onClick={prev} style={{ opacity: 0.6 }}>⬅️</span>
        <span onClick={next} style={{ opacity: 0.6 }}>➡️</span>
      </div>
    </main>
  )
}
