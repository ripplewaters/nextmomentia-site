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
        clearcoat={0.65}
        clearcoatRoughness={0.2}
        envMapIntensity={1.4}
        sheen={0.55}
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
      {/* Bakgrund */}
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
          alt=""
          aria-hidden="true"
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

      <section className="hero-wrap">
        <div className="hero-frame">
          {/* Brygga som kopplar nav -> glob */}
          <div className="hero-bridge-shell">
            <div className="hero-bridge" />
          </div>

          {/* Rund kapsel med globen */}
          <div className="hero-orb-zone">
            <div className="hero-orb-backplate">
              <div className="hero-orb-inner">
                <Canvas
                  camera={{ position: [0, 0, 5], fov: 36 }}
                  gl={{ antialias: true, alpha: true }}
                >
                  <ambientLight intensity={0.7} />
                  <pointLight
                    position={[3, 4, 4]}
                    intensity={1.4}
                    color="#b7ddff"
                  />
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
            </div>
          </div>

          {/* Modul under globen */}
          <div className="hero-bottom-shell">
            <div className="hero-status-bar">
              <div className="hero-status-lights">
                <span className="hero-status-dot dot-red" />
                <span className="hero-status-dot dot-yellow" />
                <span className="hero-status-dot dot-blue" />
              </div>
            </div>

            <h1 className="hero-title">NEXTMOMENTIA</h1>
          </div>
        </div>
      </section>

      <style jsx global>{`
        #home-page {
          overflow-x: hidden;
        }

        .hero-wrap {
          position: relative;
          z-index: 5;
          min-height: 100dvh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 170px 20px 120px;
          box-sizing: border-box;
        }

        .hero-frame {
          width: 100%;
          max-width: 1040px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
        }

        /* BRYGGAN UNDER NAVEN */

        

        /* ORB ZONE */

        .hero-orb-zone {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 3;
        }

        .hero-orb-backplate {
          width: min(520px, 100%);
          aspect-ratio: 1 / 1;
          border-radius: 50%;
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(
              circle at 25% 0%,
              rgba(255, 255, 255, 0.32),
              transparent 55%
            ),
            radial-gradient(circle at 70% 120%, #2f164a, #050713);
          box-shadow:
            inset 0 1px 8px rgba(255, 255, 255, 0.52),
            inset 0 -14px 26px rgba(0, 0, 0, 0.95),
            0 26px 50px rgba(0, 0, 0, 1);
        }

        .hero-orb-backplate::before {
          content: '';
          position: absolute;
          inset: 8px;
          border-radius: 50%;
          border: 1px solid rgba(130, 205, 255, 0.7);
          box-shadow:
            inset 0 0 18px rgba(0, 0, 0, 0.9),
            0 0 0 0.5px rgba(3, 8, 18, 0.8);
          pointer-events: none;
        }

        .hero-orb-inner {
          position: absolute;
          inset: 9%;
          border-radius: 50%;
          overflow: hidden;
        }

        .hero-orb-inner canvas {
          width: 100% !important;
          height: 100% !important;
          display: block;
        }

        /* BOTTOM MODUL */

       

        

        .hero-title {
          margin: 0;
          margin-top: 28px;
          font-size: clamp(2rem, 2.4vw + 1rem, 2.8rem);
          letter-spacing: 0.22em;
          text-transform: uppercase;
          background: linear-gradient(90deg, #ffffff, #a8d9ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-align: center;
          text-shadow: 0 0 26px rgba(170, 220, 255, 0.55);
        }

        /* BREAKPOINTS */

        @media (max-width: 900px) {
          .hero-wrap {
            padding: 150px 16px 100px;
          }

          .hero-frame {
            max-width: 760px;
          }

          .hero-orb-backplate {
            width: min(440px, 100%);
          }

          .hero-bottom-shell {
            width: min(440px, 100%);
          }
        }

        @media (max-width: 640px) {
          .hero-wrap {
            padding: 10px 12px 80px;
          }

          .hero-frame {
            gap: 10px;
          }

          .hero-bridge-shell {
            width: min(320px, 100%);
            height: 34px;
            margin-bottom: -18px;
          }

          .hero-bridge {
            width: 82%;
            border-radius: 999px 999px 26px 26px;
          }

          .hero-orb-backplate {
            width: min(320px, 100%);
          }

          .hero-orb-backplate::before {
            inset: 6px;
          }

          .hero-orb-inner {
            inset: 8%;
          }

          .hero-bottom-shell {
            width: min(340px, 100%);
          }

          .hero-status-bar {
            max-width: 300px;
            padding: 3px 14px;
          }

          .hero-status-dot {
            width: 14px;
            height: 14px;
          }

          .hero-title {
            font-size: 1.45rem;
            letter-spacing: 0.16em;
          }
        }
      `}</style>
    </main>
  )
}
