'use client'

import { Suspense, useEffect, useRef, useState } from 'react'
import NavBar from '../components/NavBar'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

function RotatingTShirt() {
  const { scene } = useGLTF('models/shop_tshirt.glb') as any
  const shirtRef = useRef<THREE.Group>(null)

  // mjuk, stabil autospin
  useFrame(() => {
    if (shirtRef.current) shirtRef.current.rotation.y += 0.004
  })

  // material
  scene.traverse((child: any) => {
    if (child.isMesh) {
      child.material = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#ff3b2e'),
        roughness: 0.45,
        metalness: 0.18,
      })
      child.castShadow = true
      child.receiveShadow = true
    }
  })

  // uppdatera world innan vi mäter box
  scene.updateMatrixWorld(true)

  // centrera kring geometrisk mitt och lyft lite mot bröstet
  const box = new THREE.Box3().setFromObject(scene)
  const center = new THREE.Vector3()
  const size = new THREE.Vector3()
  box.getCenter(center)
  box.getSize(size)

  // flytta så scenens centrum hamnar vid origo
  scene.position.sub(center)
  // bias uppåt så pivot hamnar närmare bröstet, inte nacken
  scene.position.y += size.y * 0.12

  // lägg gruppen något högre i canvasen så hela syns
  return (
    <group
      ref={shirtRef}
      scale={1.85}
      position={[0, 0.04, 0]}   // positiv Y = högre upp i rutan
      rotation={[0, Math.PI, 0]}
    >
      <primitive object={scene} />
    </group>
  )
}

export default function ShopPage() {
  const [isIOS, setIsIOS] = useState(false)

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase()
    const iOS =
      /iphone|ipad|ipod/.test(ua) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
    const safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
    if (iOS || safari) setIsIOS(true)
  }, [])

  return (
    <main
      id="shop-page"
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#000',
        color: '#fff',
        fontFamily: '"Space Grotesk", sans-serif',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* bakgrund */}
      {!isIOS ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
        >
          <source src="/videos/shop_bg_earth.mp4" type="video/mp4" />
        </video>
      ) : (
        <img
          src="/mockups/shop_bg_fallback.jpg"
          alt="Shop background"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.25,
            zIndex: 0,
          }}
        />
      )}

      <NavBar />

      {/* logo */}
      <img
        src="/icon.png"
        alt="NextMomentia Eye Logo"
        style={{
          width: '80px',
          marginTop: '6rem',
          marginBottom: '0.4rem',
          animation: 'eyeGlow 4s ease-in-out infinite',
          zIndex: 4,
          filter: 'drop-shadow(0 0 30px rgba(168,217,255,0.5))',
        }}
      />

      {/* titel */}
      <div
        style={{
          padding: '0.5rem 1.2rem',
          borderRadius: '16px',
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.12)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 0 25px rgba(168,217,255,0.25)',
          zIndex: 3,
        }}
      >
        <h1
          style={{
            fontSize: 'clamp(1rem, 2vw + 0.4rem, 1.5rem)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            background: 'linear-gradient(90deg,#ffffff,#a8d9ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0,
            textShadow: '0 0 25px rgba(168,217,255,0.4)',
          }}
        >
          NextMomentia Shop
        </h1>
      </div>

      {/* canvas */}
      <div
        style={{
          width: 'min(90vw, 500px)',
          height: 'min(90vw, 500px)',
          marginTop: '1.2rem',
          zIndex: 5,
        }}
      >
        <Canvas camera={{ position: [0, 0.25, 2.35], fov: 45 }}>
          <ambientLight intensity={1.1} />
          <hemisphereLight args={[new THREE.Color('#ff9999'), new THREE.Color('#1a0d0d'), 0.6]} />
          <directionalLight position={[3, 5, 3]} intensity={1.35} color="#ffd8b0" />
          <pointLight position={[0, 2, 3]} intensity={1.1} color="#ffb080" />

          <Suspense fallback={null}>
            <RotatingTShirt />
          </Suspense>

          {/* enbart horisontell rotation, mittpunkt exakt i canvasens centrum */}
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            enableRotate={true}
            target={[0, 0, 0]}
            minPolarAngle={Math.PI / 2}
            maxPolarAngle={Math.PI / 2}
          />
        </Canvas>
      </div>

      {/* statisk text2 med subtilt vitt glow, lite större */}
      <div
        style={{
          marginTop: '-0.2rem',
          height: '116px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 6,
        }}
      >
        <img
          src="/textures/text2.png"
          alt="T-shirt text"
          style={{
            width: 'auto',
            height: '84px',
            objectFit: 'contain',
            filter:
              'drop-shadow(0 0 3px rgba(255,255,255,0.85)) drop-shadow(0 0 6px rgba(255,255,255,0.28))',
          }}
        />
      </div>

      {/* coming soon */}
      <div
        style={{
          marginTop: '0.6rem',
          textAlign: 'center',
          zIndex: 6,
          paddingBottom: '2rem',
        }}
      >
        <h2
          style={{
            fontSize: '1rem',
            color: '#aaffcc',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '0.4rem',
            textShadow: '0 0 10px rgba(180,255,220,0.5)',
          }}
        >
          Coming Soon
        </h2>
        <input
          type="email"
          placeholder="Enter your email for early access"
          style={{
            padding: '0.55rem 1rem',
            borderRadius: '8px',
            border: '1px solid rgba(255,255,255,0.2)',
            background: 'rgba(10,15,30,0.6)',
            color: '#fff',
            width: '220px',
            textAlign: 'center',
            fontSize: '0.9rem',
            outline: 'none',
          }}
        />
        <button
          style={{
            marginTop: '0.5rem',
            padding: '0.5rem 1.1rem',
            borderRadius: '8px',
            background:
              'linear-gradient(135deg, rgba(180,255,220,0.4), rgba(255,255,255,0.15))',
            border: '1px solid rgba(255,255,255,0.25)',
            color: '#aaffcc',
            cursor: 'pointer',
            transition: '0.2s ease',
            fontWeight: 600,
            fontSize: '0.85rem',
            minWidth: 120,
          }}
        >
          Notify Me
        </button>
      </div>

      <style jsx global>{`
        @keyframes eyeGlow {
          0% { filter: drop-shadow(0 0 15px rgba(173,216,255,0.4)); }
          50% { filter: drop-shadow(0 0 40px rgba(173,216,255,0.7)); }
          100% { filter: drop-shadow(0 0 15px rgba(173,216,255,0.4)); }
        }
      `}</style>
    </main>
  )
}
