'use client'

// @ts-expect-error - GLTFLoader has no TS types
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { useRef, useState, useEffect } from 'react'
import NavBar from '../components/NavBar'

// 👕 3D-tröjkomponent
function TShirt({ color, logo }: { color: string; logo: string }) {
  const model = useLoader(GLTFLoader, '/models/oversized_t-shirt.glb')
  const logoTexture = useLoader(THREE.TextureLoader, `/textures/${logo}`)
  const group = useRef<THREE.Group>(null)

  useEffect(() => {
    if (!model?.scene) return
    model.scene.traverse((child: any) => {
      if (child.isMesh) {
        // Tvinga fram synligt material oavsett GLB:s inbyggda shader
        child.material = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color(color),
          roughness: 0.55,
          metalness: 0.05,
          clearcoat: 0.3,
          clearcoatRoughness: 0.4,
          side: THREE.DoubleSide,
        })
        child.material.needsUpdate = true
        child.castShadow = true
        child.receiveShadow = true
      }
    })
  }, [model, color])

  // Långsam rotation
  useFrame(() => {
    if (group.current) group.current.rotation.y += 0.002
  })

  return (
    <group ref={group} scale={1.8}>
      <primitive object={model.scene} />

      {/* PNG-tryck */}
      <mesh position={[0, 0.38, 0.52]}>
        <planeGeometry args={[0.7, 0.38]} />
        <meshBasicMaterial
          map={logoTexture}
          transparent
          opacity={1}
          depthWrite={false}
          depthTest={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}

// 🌌 Shop-sida
export default function ShopPage() {
  const variants = [
    { color: '#1e3a8a', logo: 'KinW_v1.png' }, // blå
    { color: '#b91c1c', logo: 'QE_v1.png' },   // röd
    { color: '#0f9d58', logo: 'ToC_v1.png' },  // grön
  ]

  const [index, setIndex] = useState(0)
  const prev = () => setIndex((i) => (i - 1 + variants.length) % variants.length)
  const next = () => setIndex((i) => (i + 1) % variants.length)

  return (
    <main
      style={{
        width: '100vw',
        height: '100vh',
        background: 'radial-gradient(circle at center, #050515 0%, #000 100%)',
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

      <div style={{ width: 'min(85vw,580px)', height: '65vh' }}>
        <Canvas camera={{ position: [0, 0, 3.6], fov: 45 }}>
          <color attach="background" args={['#040411']} />

          {/* Belysning fixad med rätt props */}
          <hemisphereLight color="#ffffff" groundColor="#1a1a1a" intensity={0.8} />
          <directionalLight position={[3, 4, 5]} intensity={2.2} color="#a0c8ff" />
          <directionalLight position={[-3, 2, -2]} intensity={1.4} color="#ffffff" />
          <pointLight position={[0, 3, 2]} intensity={1.2} color="#a0c8ff" />

          <TShirt color={variants[index].color} logo={variants[index].logo} />

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
