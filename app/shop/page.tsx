'use client'

// @ts-expect-error - GLTFLoader types missing
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { useRef, useState } from 'react'
import NavBar from '../components/NavBar'

function TShirt({ color, logo }: { color: string; logo: string }) {
  const model = useLoader(GLTFLoader, '/models/oversized_t-shirt.glb')
  const logoTexture = useLoader(THREE.TextureLoader, `/textures/${logo}`)
  const group = useRef<THREE.Group>(null)

  // Rotation
  useFrame(() => {
    if (group.current) group.current.rotation.y += 0.002
  })

  // Applicera färg och material
  model.scene.traverse((child: any) => {
    if (child.isMesh) {
      child.material.color = new THREE.Color(color)
      child.material.roughness = 0.8
      child.material.metalness = 0.05
    }
  })

  return (
    <group ref={group} scale={2.2}>
      <primitive object={model.scene} />

      {/* PNG-tryck ovanpå bröstet */}
      <mesh position={[0, 0.42, 0.54]}>
        <planeGeometry args={[0.7, 0.4]} />
        <meshBasicMaterial
          map={logoTexture}
          transparent
          opacity={1}
          depthWrite={false}
          depthTest={false}
          side={THREE.FrontSide}
        />
      </mesh>
    </group>
  )
}


export default function ShopPage() {
  // 🔵🔴⚪ Färgvarianter
 const variants = [
  { color: '#1e3a8a', logo: 'KinW_v1.png' }, // blå
  { color: '#b91c1c', logo: 'QE_v1.png' },   // röd
  { color: '#0a0a0a', logo: 'ToC_v1.png' },  // svart
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

      {/* PILAR */}
      <div
        style={{
          position: 'absolute',
          bottom: '12%',
          display: 'flex',
          gap: '2rem',
          fontSize: '2.2rem',
          cursor: 'pointer',
          userSelect: 'none',
          fontFamily: '"Space Grotesk", monospace',
        }}
      >
        <span onClick={prev} style={{ opacity: 0.7 }}>{'<'}</span>
        <span onClick={next} style={{ opacity: 0.7 }}>{'>'}</span>
      </div>
    </main>
  )
}
