'use client'

import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import { useRef, useEffect } from 'react'
import { TextureLoader } from 'three'
import { OrbitControls } from '@react-three/drei'
import NavBar from './components/NavBar'

function RealisticEarth() {
  const earthRef = useRef<THREE.Mesh>(null)
  const cloudRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  const sunLight = useRef<THREE.DirectionalLight>(null)

  const [day, night, bump, spec, clouds] = useLoader(TextureLoader, [
    '/textures/earth_daymap.jpg',
    '/textures/earth_nightmap.jpg',
    '/textures/earthbump1k.jpg',
    '/textures/earthspec1k.jpg',
    '/textures/earth_clouds.jpg',
  ])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.15
    if (sunLight.current)
      sunLight.current.position.set(Math.sin(t) * 10, 2, Math.cos(t) * 10)

    if (earthRef.current) earthRef.current.rotation.y += 0.0008
    if (cloudRef.current) cloudRef.current.rotation.y += 0.001
    if (glowRef.current) glowRef.current.rotation.y += 0.0008

    if (earthRef.current?.material instanceof THREE.MeshPhongMaterial) {
      earthRef.current.material.emissiveIntensity =
        1.2 + Math.sin(clock.elapsedTime * 0.6) * 0.1
    }
  })

  return (
    <>
      {/* Jord */}
      <mesh ref={earthRef} scale={2.5}>
        <sphereGeometry args={[1, 128, 128]} />
        <meshPhongMaterial
          map={day}
          bumpMap={bump}
          bumpScale={0.04}
          specularMap={spec}
          specular={new THREE.Color('#3366ff')}
          shininess={20}
          emissiveMap={night}
          emissive={new THREE.Color('#ffd580')}
          emissiveIntensity={1.3}
        />
      </mesh>

      {/* Glöd */}
      <mesh ref={glowRef} scale={2.52}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial
          map={night}
          transparent
          opacity={0.3}
          color={'#ffcc88'}
          blending={THREE.AdditiveBlending}
          side={THREE.FrontSide}
        />
      </mesh>

      {/* Moln */}
      <mesh ref={cloudRef} scale={2.54}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial
          map={clouds}
          transparent
          opacity={0.35}
          depthWrite={false}
        />
      </mesh>

      {/* Atmosfär */}
      <mesh scale={2.56}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial
          color="#3fa9f5"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Ljus */}
      <ambientLight intensity={0.3} />
      <directionalLight
        ref={sunLight}
        color={0xffffff}
        intensity={2.1}
        position={[5, 0, 5]}
      />
    </>
  )
}

export default function Home() {
  useEffect(() => {
    const video = document.querySelector('video')
    if (video) {
      const playVideo = () =>
        video.play().catch(() => setTimeout(playVideo, 300))
      playVideo()
    }
  }, [])

  return (
    <main
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: 'black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        color: 'white',
        fontFamily: '"Century Gothic", CenturyGothic, AppleGothic, sans-serif',
        position: 'relative',
      }}
    >
      {/* --- VIDEO BACKGROUND --- */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
          filter: 'brightness(1.1) contrast(1.2) saturate(1.1)',
        }}
      >
        <source src="/videos/shop_bg_earth.mp4" type="video/mp4" />
      </video>

      {/* --- NAVBAR --- */}
      <div
        style={{
          position: 'absolute',
          top: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <NavBar />
      </div>

      {/* --- EARTH SECTION --- */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(75vw, 520px)',
          aspectRatio: '1 / 1',
          overflow: 'visible',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: '180%',
            height: '180%',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(255,200,150,0.18) 0%, rgba(130,200,255,0.25) 30%, rgba(0,0,0,0) 75%)',
            filter: 'blur(100px)',
            opacity: 0.9,
            zIndex: 1,
            animation: 'glowpulse 6s ease-in-out infinite',
          }}
        />
        <Canvas
          camera={{ position: [0, 0, 6], fov: 45 }}
          style={{
            borderRadius: '50%',
            background: 'transparent',
            zIndex: 3,
          }}
        >
          <RealisticEarth />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </div>

      {/* --- CTA --- */}
      <section
        style={{
          position: 'absolute',
          bottom: '8%',
          opacity: 0.9,
          letterSpacing: '0.5px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          zIndex: 12,
          textAlign: 'center',
        }}
      >
        <p
          style={{
            opacity: 0.88,
            letterSpacing: '0.42em',
            fontSize: '0.8rem',
            textTransform: 'uppercase',
          }}
        >
          Don't Just Watch. React.
        </p>
        <a
          href="https://www.youtube.com/@NextMomentia"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.6rem',
            borderRadius: '999px',
            background:
              'linear-gradient(135deg, rgba(130,200,255,0.25) 0%, rgba(255,255,255,0.75) 100%)',
            color: '#051035',
            fontWeight: 600,
            letterSpacing: '0.3em',
            textDecoration: 'none',
            boxShadow: '0 12px 40px rgba(140,210,255,0.35)',
            backdropFilter: 'blur(6px)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)'
            e.currentTarget.style.boxShadow =
              '0 18px 55px rgba(170,225,255,0.45)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)'
            e.currentTarget.style.boxShadow =
              '0 12px 40px rgba(140,210,255,0.35)'
          }}
        >
          Explore the Channel
        </a>
      </section>

      <style jsx global>{`
        @keyframes glowpulse {
          0% {
            opacity: 0.75;
            transform: scale(1);
          }
          50% {
            opacity: 0.95;
            transform: scale(1.05);
          }
          100% {
            opacity: 0.75;
            transform: scale(1);
          }
        }

        @keyframes pulseGlow {
          0% {
            filter: drop-shadow(0 0 10px rgba(168,217,255,0.3));
          }
          50% {
            filter: drop-shadow(0 0 30px rgba(168,217,255,0.65));
          }
          100% {
            filter: drop-shadow(0 0 10px rgba(168,217,255,0.3));
          }
        }
      `}</style>
    </main>
  )
}
