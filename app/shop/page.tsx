'use client'

import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { useRef } from 'react'
import NavBar from '../components/NavBar'

function CodeTShirt({ color, textureFile, position }: { color: string; textureFile: string; position: [number, number, number] }) {
  const texture = useLoader(THREE.TextureLoader, `/textures/${textureFile}`)
  const group = useRef<THREE.Group>(null)

  useFrame(() => {
    if (group.current) group.current.rotation.y += 0.01
  })

  return (
    <group ref={group} position={position} scale={[1.2, 1.2, 1.2]}>
      <mesh>
        <cylinderGeometry args={[0.6, 0.8, 1.2, 32]} />
        <meshStandardMaterial color={color} map={texture} roughness={0.5} metalness={0.1} />
      </mesh>
      <mesh position={[0.8, 0.2, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 0.8, 32]} />
        <meshStandardMaterial color={color} map={texture} />
      </mesh>
      <mesh position={[-0.8, 0.2, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 0.8, 32]} />
        <meshStandardMaterial color={color} map={texture} />
      </mesh>
      <mesh position={[0, 0.65, 0]}>
        <torusGeometry args={[0.25, 0.05, 16, 64]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  )
}

export default function ShopPage() {
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

      <div style={{ width: 'min(90vw,700px)', height: '60vh' }}>
        <Canvas camera={{ position: [0, 0, 3.5], fov: 45 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[3, 3, 3]} intensity={1.2} />

          <CodeTShirt color="#1e40af" textureFile="KinW_v1.png" position={[-1.2, 0, 0]} />
          <CodeTShirt color="#b91c1c" textureFile="QE_v1.png" position={[1.2, 0, 0]} />

          <OrbitControls enableZoom enablePan={false} />
        </Canvas>
      </div>

      <p style={{ marginTop: '1.2rem', opacity: 0.8, fontSize: '0.9rem' }}>
        Knowledge • Question • Truth Collection
      </p>
    </main>
  )
}
