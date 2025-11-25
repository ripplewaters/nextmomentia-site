'use client'

import { useEffect, useState, useMemo, useRef } from 'react'
import NavBar from './components/NavBar'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import * as THREE from 'three'
import { TextureLoader } from 'three'

function StarField() {
  const count = 650
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i += 3) {
      const radius = 5 + Math.random() * 4.5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      arr[i] = radius * Math.sin(phi) * Math.cos(theta)
      arr[i + 1] = radius * Math.cos(phi) * 0.6
      arr[i + 2] = radius * Math.sin(phi) * Math.sin(theta)
    }
    return arr
  }, [])

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#b7e2ff"
        sizeAttenuation
        transparent
        opacity={0.8}
      />
    </points>
  )
}

function EarthBlob() {
  const meshRef = useRef<THREE.Mesh>(null)

  const [day, night, bump, spec, clouds] = useLoader(TextureLoader, [
    '/textures/earth_daymap.jpg',
    '/textures/earth_nightmap.jpg',
    '/textures/earthbump1k.jpg',
    '/textures/earthspec1k.jpg',
    '/textures/earth_clouds.jpg',
  ])

  useFrame((_, delta) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y += delta * 0.25
    meshRef.current.rotation.x = Math.sin(Date.now() * 0.0003) * 0.22
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.05, 64, 64]} />
      <meshPhysicalMaterial
        map={day}
        bumpMap={bump}
        bumpScale={0.035}
        metalness={0.4}
        roughness={0.35}
        clearcoat={0.7}
        clearcoatRoughness={0.18}
        envMapIntensity={1.4}
        sheen={0.6}
        sheenColor={new THREE.Color('#cfe8ff')}
        emissiveMap={night}
        emissive={new THREE.Color('#ffdfb0')}
        emissiveIntensity={0.9}
      />
      <mesh scale={1.01}>
        <sphereGeometry args={[1.05, 64, 64]} />
        <meshPhongMaterial
          map={clouds}
          transparent
          opacity={0.23}
          depthWrite={false}
        />
      </mesh>
    </mesh>
  )
}

export default function HomePage() {
  const [isIOS, setIsIOS] = useState(false)

  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      const ua = navigator.userAgent.toLowerCase()
      if (/iphone|ipad|ipod/.test(ua)) setIsIOS(true)
    }
  }, [])

  return (
    <main
      id="home-page"
      style={{
        width: '100%',
        minHeight: '100dvh',
        backgroundColor: '#000',
        color: '#fff',
        overflow: 'hidden',
        position: 'relative',
        fontFamily: '"Space Grotesk", system-ui, -apple-system, sans-serif',
      }}
    >
      {/* BG */}
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
            opacity: 0.7,
            zIndex: 0,
          }}
        >
          <source src="/videos/shop_bg_earth.mp4" type="video/mp4" />
        </video>
      ) : (
        <img
          src="/mockups/shop_bg_fallback.jpg"
          alt="" // inget alt-text som kan visas som "Background"
          style={{
            position: 'absolute',
            inset: 0,
            display: 'block',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.45,
            zIndex: 0,
          }}
        />
      )}

      <NavBar />

      <section className="home-wrap">
        <div className="home-card">
          <div className="home-orb-shell">
            <Canvas
              camera={{ position: [0, 0, 5], fov: 36 }} // lite mer zoom på desktop
              gl={{ antialias: true, alpha: true }}
            >
              <ambientLight intensity={0.7} />
              <pointLight position={[3, 4, 4]} intensity={1.4} color="#b7ddff" />
              <StarField />
              <EarthBlob />
              <Environment preset="city" />
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                rotateSpeed={0.6}
                maxPolarAngle={Math.PI / 2 + 0.4}
                minPolarAngle={Math.PI / 2 - 0.4}
              />
            </Canvas>
          </div>

          <h1 className="home-title">NEXTMOMENTIA</h1>
        </div>
      </section>

      <style jsx global>{`
        #home-page .home-wrap {
          position: relative;
          z-index: 5;
          min-height: 100dvh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 170px 32px 130px; /* större på desktop */
          box-sizing: border-box;
        }

        #home-page .home-card {
          width: min(980px, 100%); /* bredare card */
          margin: 0 auto;
          border-radius: 32px;
          padding: 34px 48px 46px; /* mer padding */
          box-sizing: border-box;
          backdrop-filter: blur(20px) saturate(175%);
          -webkit-backdrop-filter: blur(20px) saturate(175%);
          background:
            radial-gradient(
              circle at 0% 0%,
              rgba(160, 210, 255, 0.3),
              transparent 55%
            ),
            radial-gradient(
              circle at 100% 100%,
              rgba(110, 80, 220, 0.23),
              transparent 60%
            ),
            rgba(4, 6, 18, 0.9);
          border: 1px solid rgba(175, 215, 255, 0.48);
          box-shadow:
            0 30px 70px rgba(0, 0, 0, 0.98),
            inset 0 1px 18px rgba(255, 255, 255, 0.05);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 26px;
        }

        .home-orb-shell {
          width: 100%;
          max-width: 640px; /* större orb på desktop */
          height: 320px;
          border-radius: 999px;
          overflow: hidden;
          position: relative;
          background: radial-gradient(
              circle at 30% 0%,
              rgba(255, 255, 255, 0.3),
              transparent 60%
            ),
            radial-gradient(circle at 70% 120%, #2f164a, #050713);
          box-shadow:
            inset 0 1px 6px rgba(255, 255, 255, 0.5),
            inset 0 -10px 18px rgba(0, 0, 0, 0.95),
            0 24px 44px rgba(0, 0, 0, 1);
        }

        .home-orb-shell canvas {
          width: 100% !important;
          height: 100% !important;
        }

        .home-title {
          font-size: clamp(2rem, 2.4vw + 1rem, 2.8rem); /* större titel */
          letter-spacing: 0.2em;
          text-transform: uppercase;
          background: linear-gradient(90deg, #ffffff, #a8d9ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 0 26px rgba(170, 220, 255, 0.55);
          margin-top: 6px;
        }

        @media (max-width: 900px) {
          #home-page .home-wrap {
            padding: 150px 20px 100px;
          }
          #home-page .home-card {
            width: min(860px, 100%);
            padding: 26px 24px 32px;
            border-radius: 26px;
          }
          .home-orb-shell {
            height: 260px;
            max-width: 500px;
          }
        }

        @media (max-width: 640px) {
          #home-page .home-wrap {
            padding: 132px 14px 80px;
          }
          #home-page .home-card {
            padding: 20px 14px 26px;
            gap: 18px;
            border-radius: 22px;
          }
          .home-orb-shell {
            height: 210px;
            max-width: 360px;
          }
          .home-title {
            font-size: 1.6rem;
            letter-spacing: 0.18em;
          }
        }
      `}</style>
    </main>
  )
}
