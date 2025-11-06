'use client'

// @ts-expect-error - GLTFLoader types missing
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { Center, Environment } from '@react-three/drei'
import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import NavBar from '../components/NavBar'

/* === 3D TSHIRT === */
function TShirt({ color }: { color: string }) {
  const gltf = useLoader(GLTFLoader, '/models/oversized_t-shirt.glb')
  const ref = useRef<THREE.Group>(null)

  // långsam rotation
  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.003
  })

  useEffect(() => {
    if (!gltf?.scene) return

    // hitta rätt grupp (Sketchfab-namn)
    const main = gltf.scene.getObjectByName('Sketchfab_Scene') || gltf.scene

    // centrera & skala lagom
    const box = new THREE.Box3().setFromObject(main)
    const center = box.getCenter(new THREE.Vector3())
    main.position.sub(center)
    const scale = 2 / Math.max(...box.getSize(new THREE.Vector3()).toArray())
    main.scale.setScalar(scale * 1.6)

    // applicera tygmaterial
    main.traverse((child: any) => {
      if (child.isMesh) {
        child.material = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color(color),
          roughness: 0.55,
          metalness: 0.1,
          clearcoat: 0.3,
          side: THREE.DoubleSide,
        })
        child.castShadow = true
        child.receiveShadow = true
      }
    })
  }, [gltf, color])

  return (
    <group ref={ref}>
      <Center top disableZ>
        <primitive object={gltf.scene} />
      </Center>
    </group>
  )
}

/* === SHOP PAGE === */
export default function ShopPage() {
  const variants = [
    { color: '#1e3a8a' }, // blå
    { color: '#b91c1c' }, // röd
    { color: '#0f9d58' }, // grön
  ]
  const [i, setI] = useState(0)
  const prev = () => setI((x) => (x - 1 + variants.length) % variants.length)
  const next = () => setI((x) => (x + 1) % variants.length)

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
        overflow: 'hidden',
      }}
    >
      <NavBar />

      <h1
        style={{
          marginTop: '5.5rem',
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
        <Canvas camera={{ position: [0, 0.3, 3.5], fov: 45 }} shadows>
          <color attach="background" args={['#040411']} />

          {/* Ljus */}
          <ambientLight intensity={0.9} />
          <directionalLight position={[2, 4, 5]} intensity={1.8} color="#a0c8ff" />
          <pointLight position={[0, 1.5, 2]} intensity={1.1} />
          <Environment preset="studio" />

          <TShirt color={variants[i].color} />
        </Canvas>
      </div>

      {/* PILAR */}
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
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
