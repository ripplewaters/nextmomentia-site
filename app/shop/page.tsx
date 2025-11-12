'use client'

import { Suspense, useEffect, useRef, useState } from 'react'
import NavBar from '../components/NavBar'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { useGLTF, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

// ❤️ Röd kromad tröja med balanserad glans (utan HDRI)
function TShirtWithPrint() {
  const { scene } = useGLTF('/models/shop_tshirt.glb') as any
  const shirtRef = useRef<THREE.Group>(null)
  const fabricNormal = useLoader(THREE.TextureLoader, '/textures/fabric_normal.png')

  const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256, { format: THREE.RGBAFormat })
  const cubeCamera = new THREE.CubeCamera(0.1, 10, cubeRenderTarget)

  fabricNormal.wrapS = fabricNormal.wrapT = THREE.RepeatWrapping
  fabricNormal.repeat.set(2, 2)

  // 🔴 Ljus röd-krom – varm och glansig, ej plastig
  const redChromeMaterial = new THREE.MeshPhysicalMaterial({
    color: '#ff3333',
    metalness: 0.95,
    roughness: 0.1,
    clearcoat: 1.1,
    clearcoatRoughness: 1.5,
    sheen: 0.4,
    sheenColor: new THREE.Color('#ffd6d6'),
    reflectivity: 1.0,
    envMap: cubeRenderTarget.texture,
    envMapIntensity: 0.95,
    normalMap: fabricNormal,
  })

  scene.traverse((child: any) => {
    if (child.isMesh) {
      child.material = redChromeMaterial
      child.castShadow = true
      child.receiveShadow = true
    }
  })

  useFrame(({ gl, scene: mainScene }) => {
    if (!shirtRef.current) return
    shirtRef.current.rotation.y += 0.004
    cubeCamera.update(gl, mainScene)
  })

  // centrera modellen
  scene.updateMatrixWorld(true)
  const box = new THREE.Box3().setFromObject(scene)
  const center = new THREE.Vector3()
  const size = new THREE.Vector3()
  box.getCenter(center)
  box.getSize(size)
  scene.position.sub(center)
  scene.position.y += size.y * 0.12

  return (
    <group
      ref={shirtRef}
      scale={1.85}
      position={[0, 0.04, 0]}
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
      {/* 🌌 Bakgrund */}
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

      {/* ✨ Glow-text längst upp */}
      <img
        src="/textures/text2.png"
        alt="NextMomentia Title"
        style={{
          position: 'absolute',
          top: '6.5rem',
          width: 'min(70vw, 420px)',
          zIndex: 5,
          animation: 'glowText 6s ease-in-out infinite',
          filter:
            'drop-shadow(0 0 25px rgba(150,220,255,0.8)) drop-shadow(0 0 60px rgba(150,220,255,0.4))',
        }}
      />

      {/* 🧥 3D-tröja */}
      <div
        style={{
          width: 'min(90vw, 500px)',
          height: 'min(90vw, 500px)',
          marginTop: '12rem',
          zIndex: 5,
        }}
      >
        <Canvas camera={{ position: [0, 0.25, 2.35], fov: 45 }}>
          <ambientLight intensity={1.1} />
          <hemisphereLight args={[new THREE.Color('#fff8f8'), new THREE.Color('#111'), 0.7]} />
          <directionalLight position={[3, 5, 3]} intensity={1.25} color="#ffd8b0" />
          <pointLight position={[0, 2, 3]} intensity={1.1} color="#ffb080" />

          <Suspense fallback={null}>
            <TShirtWithPrint />
          </Suspense>

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

      {/* 📩 Coming soon */}
      <div
        style={{
          marginTop: '1rem',
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
        @keyframes glowText {
          0% { filter: drop-shadow(0 0 15px rgba(173,216,255,0.5)); }
          50% { filter: drop-shadow(0 0 40px rgba(173,216,255,0.9)); }
          100% { filter: drop-shadow(0 0 15px rgba(173,216,255,0.5)); }
        }
      `}</style>
    </main>
  )
}
