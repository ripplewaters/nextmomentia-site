'use client'

import { useEffect, useState, useMemo, useRef } from 'react'
import NavBar from '../components/NavBar'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, useTexture } from '@react-three/drei'
import * as THREE from 'three'

function ChromeEarthOrb() {
  const meshRef = useRef<THREE.Mesh>(null)

  // exakt som i din struktur: public/textures/earth_clouds.jpg
  const clouds = useTexture('/textures/earth_clouds.jpg')

  useFrame((_, delta) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y += delta * 0.25
    meshRef.current.rotation.x = Math.sin(Date.now() * 0.0003) * 0.25
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.05, 64, 64]} />
      <meshPhysicalMaterial
        map={clouds}
        metalness={0.95}
        roughness={0.15}
        clearcoat={1}
        clearcoatRoughness={0.12}
        reflectivity={1}
        envMapIntensity={1.4}
        sheen={0.8}
        sheenColor={new THREE.Color('#cfe8ff')}
      />
    </mesh>
  )
}

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
          args={[positions, 3]} // TS-safe
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

export default function AboutPage() {
  const [isIOS, setIsIOS] = useState(false)

  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      const ua = navigator.userAgent.toLowerCase()
      if (/iphone|ipad|ipod/.test(ua)) setIsIOS(true)
    }
  }, [])

  return (
    <main
      id="about-page"
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
          alt="Background"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.45,
            zIndex: 0,
          }}
        />
      )}

      <NavBar />

      <section className="about-wrap">
        <div className="about-card">
          <div className="about-orb-shell">
            <Canvas
              camera={{ position: [0, 0, 5], fov: 38 }}
              gl={{ antialias: true, alpha: true }}
            >
              <ambientLight intensity={0.7} />
              <pointLight position={[3, 4, 4]} intensity={1.4} color="#b7ddff" />
              <StarField />
              <ChromeEarthOrb />
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

          <h1 className="about-title">About NextMomentia</h1>

          <p className="about-body">
            NextMomentia is a creative hub where ideas, design and technology
            are pushed into motion. A place built on tension - between logic and
            instinct, simplicity and depth, control and chaos.
            <br />
            <br />
            Clips, music, visuals and merch all orbit the same core idea:
            questioning what we are shown, without losing the curiosity that
            makes it worth watching.
          </p>
        </div>
      </section>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,400&display=swap');

        #about-page .about-wrap {
          position: relative;
          z-index: 5;
          min-height: 100dvh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 150px 24px 110px;
          box-sizing: border-box;
        }

        #about-page .about-card {
          width: min(840px, 100%);
          margin: 0 auto;
          border-radius: 28px;
          padding: 26px 34px 34px;
          box-sizing: border-box;
          backdrop-filter: blur(18px) saturate(170%);
          -webkit-backdrop-filter: blur(18px) saturate(170%);
          background:
            radial-gradient(
              circle at 0% 0%,
              rgba(160, 210, 255, 0.3),
              transparent 55%
            ),
            radial-gradient(
              circle at 100% 100%,
              rgba(110, 80, 220, 0.2),
              transparent 60%
            ),
            rgba(4, 6, 18, 0.88);
          border: 1px solid rgba(175, 215, 255, 0.45);
          box-shadow:
            0 26px 60px rgba(0, 0, 0, 0.9),
            inset 0 1px 16px rgba(255, 255, 255, 0.05);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 20px;
        }

        .about-orb-shell {
          width: 100%;
          max-width: 520px;
          height: 260px;
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
            0 22px 40px rgba(0, 0, 0, 1);
        }

        .about-title {
          font-size: clamp(1.6rem, 2.1vw + 1rem, 2.4rem);
          letter-spacing: 0.16em;
          text-transform: uppercase;
          background: linear-gradient(90deg, #ffffff, #a8d9ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 0 22px rgba(170, 220, 255, 0.45);
          margin-top: 4px;
        }

        .about-body {
          font-size: 1rem;
          line-height: 1.85;
          color: rgba(236, 241, 255, 0.92);
          letter-spacing: 0.02em;
          max-width: 640px;
          text-shadow: 0 0 14px rgba(0, 0, 0, 0.6);
        }

        @media (max-width: 900px) {
          #about-page .about-wrap {
            padding: 140px 18px 90px;
          }
          #about-page .about-card {
            padding: 22px 20px 26px;
            border-radius: 22px;
          }
          .about-orb-shell {
            height: 220px;
            max-width: 440px;
          }
        }

        @media (max-width: 640px) {
          #about-page .about-wrap {
            padding: 132px 14px 80px;
          }
          #about-page .about-card {
            padding: 18px 14px 22px;
            gap: 16px;
          }
          .about-orb-shell {
            height: 200px;
            max-width: 360px;
          }
          .about-body {
            font-size: 0.95rem;
          }
        }
      `}</style>
    </main>
  )
}
