'use client'

import { useEffect, useState, useRef } from 'react'
import NavBar from '../components/NavBar'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, OrbitControls, useTexture } from '@react-three/drei'
import * as THREE from 'three'

function MiniCloudOrb() {
  const groupRef = useRef<THREE.Group | null>(null)
  const clouds = useTexture('/textures/earth_clouds.jpg')

  useFrame((_, delta) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y += delta * 0.25
    groupRef.current.rotation.x = Math.sin(Date.now() * 0.0004) * 0.18
  })

  return (
    <group ref={groupRef} scale={0.9}>
      <mesh>
        <sphereGeometry args={[1, 48, 48]} />
        <meshPhysicalMaterial
          map={clouds}
          metalness={0.95}
          roughness={0.18}
          clearcoat={1}
          clearcoatRoughness={0.12}
          envMapIntensity={1.4}
          sheen={0.6}
          sheenColor={new THREE.Color('#bcd9ff')}
        />
      </mesh>
    </group>
  )
}

export default function ShopPage() {
  const [isIOS, setIsIOS] = useState(false)

  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      const ua = navigator.userAgent.toLowerCase()
      if (/iphone|ipad|ipod/.test(ua)) setIsIOS(true)
    }
  }, [])

  return (
    <main
      id="shop-page"
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

      <section className="shop-wrap">
        <div className="shop-card">
          <h1 className="shop-title">Statements in Orbit</h1>

          <div className="shop-text-shell">
            <img
              src="/textures/text2.png"
              alt="Question Everything"
              className="shop-text-img"
            />
          </div>

          <p className="shop-coming">COMING SOON</p>

          <div className="product-grid">
  {[0, 1, 2].map((idx) => (
    <div className="product-circle" key={idx}>
      <Canvas
        camera={{ position: [0, 0, 3.1], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.8} />
        <pointLight position={[3, 4, 4]} intensity={1.5} color="#b7ddff" />
        <MiniCloudOrb />
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
  ))}
</div>

        </div>
      </section>

      <style jsx global>{`
        #shop-page .shop-wrap {
          position: relative;
          z-index: 5;
          min-height: 100dvh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 150px 24px 140px;
          box-sizing: border-box;
        }

        #shop-page .shop-card {
          width: min(880px, 100%);
          margin: 0 auto;
          border-radius: 28px;
          padding: 40px 48px 50px;
          box-sizing: border-box;
          backdrop-filter: blur(20px) saturate(170%);
          -webkit-backdrop-filter: blur(20px) saturate(170%);
          background:
            radial-gradient(
              circle at 0% 0%,
              rgba(160, 210, 255, 0.26),
              transparent 55%
            ),
            radial-gradient(
              circle at 100% 100%,
              rgba(110, 80, 220, 0.22),
              transparent 60%
            ),
            rgba(4, 6, 18, 0.82);
          border: 1px solid rgba(175, 215, 255, 0.32);
          box-shadow:
            0 26px 60px rgba(0, 0, 0, 0.9),
            inset 0 1px 16px rgba(255, 255, 255, 0.04);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 32px;
        }

        .shop-title {
          font-size: clamp(1.4rem, 1.8vw + 1rem, 2.2rem);
          letter-spacing: 0.16em;
          text-transform: uppercase;
          background: linear-gradient(90deg, #ffffff, #a8d9ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 0 22px rgba(170, 220, 255, 0.45);
        }

        .shop-text-shell {
          width: 100%;
          max-width: 520px;
          aspect-ratio: 16 / 6;
          border-radius: 699px;
          overflow: hidden;
          position: relative;
          background:
            radial-gradient(
              circle at 30% 0%,
              rgba(255, 255, 255, 0.32),
              transparent 60%
            ),
            radial-gradient(circle at 70% 120%, #2f164a, #050713);
          box-shadow:
            inset 0 1px 6px rgba(255, 255, 255, 0.5),
            inset 0 -10px 18px rgba(0, 0, 0, 0.95),
            0 22px 40px rgba(0, 0, 0, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px 20px;
          box-sizing: border-box;
        }

        .shop-text-img {
          max-width: 58%;
          height: auto;
          object-fit: contain;
          filter: drop-shadow(0 0 26px rgba(185, 205, 255, 0.75));
          opacity: 0.98;
        }

        .shop-coming {
          font-size: 0.85rem;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: rgba(240, 245, 255, 0.94);
          filter: drop-shadow(0 0 12px rgba(150, 180, 255, 0.6));
        }

        .product-grid {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 34px;
  margin-top: 20px;
}

.product-circle {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  padding: 18px;           /* mer luft runt globen */
  background:
    radial-gradient(
      circle at 20% 0%,
      rgba(255, 255, 255, 0.38),
      transparent 55%
    ),
    radial-gradient(circle at 80% 120%, #1b1233, #040510);
  box-shadow:
    inset 0 1px 8px rgba(255, 255, 255, 0.55),
    inset 0 -12px 20px rgba(0, 0, 0, 0.95),
    0 22px 40px rgba(0, 0, 0, 0.9);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-circle canvas {
  width: 100%;
  height: 100%;
}

        @media (max-width: 640px) {
          #shop-page .shop-wrap {
            padding: 132px 14px 90px;
          }

          #shop-page .shop-card {
            padding: 24px 14px 26px;
            gap: 24px;
          }

          .product-grid {
    flex-direction: column;
    align-items: center;
    gap: 24px;
  }

          .product-card {
            height: 150px;
            padding: 16px;
            max-width: 260px;
            margin: 0 auto;
          }

          .product-circle {
    width: 150px;
    height: 150px;
    padding: 16px;
  }
}
        }
      `}</style>
    </main>
  )
}
