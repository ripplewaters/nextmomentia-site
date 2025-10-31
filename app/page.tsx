'use client'

import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import { useRef, useMemo } from 'react'
import { TextureLoader } from 'three'
import { OrbitControls } from '@react-three/drei'
import { Space_Grotesk } from 'next/font/google'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['700'],
})

// 🌍 Jordkomponent
function RealisticEarth() {
  const earthRef = useRef<THREE.Mesh>(null)
  const cloudRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)

  // Ladda texturer
  const [day, night, bump, spec, clouds] = useLoader(TextureLoader, [
    '/textures/earth_daymap.jpg',
    '/textures/earth_nightmap.jpg',
    '/textures/earthbump1k.jpg',
    '/textures/earthspec1k.jpg',
    '/textures/earth_clouds.jpg',
  ])

  // ✨ Generera space-particles
  const particles = useMemo(() => {
  const points = []
  for (let i = 0; i < 1200; i++) {
    const radius = 15 + Math.random() * 20 // längre ut i rymden
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    const x = radius * Math.sin(phi) * Math.cos(theta)
    const y = radius * Math.sin(phi) * Math.sin(theta)
    const z = radius * Math.cos(phi)
    points.push(x, y, z)
  }
  return new Float32Array(points)
}, [])


  // 🔄 Animationer (rotation, ljus, glow, kamera)
  useFrame(({ clock, scene, camera }) => {
    const t = clock.getElapsedTime() * 0.1
    const light = scene.getObjectByName('sunLight') as THREE.DirectionalLight
    if (light) {
      light.position.set(Math.sin(t) * 10, 2, Math.cos(t) * 10)
    }

    // rotation
    if (earthRef.current) earthRef.current.rotation.y += 0.0008
    if (cloudRef.current) cloudRef.current.rotation.y += 0.001

    // glow-puls
    if (glowRef.current) {
      const material = glowRef.current.material as THREE.MeshBasicMaterial
      material.opacity = 0.25 + Math.sin(clock.elapsedTime * 0.6) * 0.1
      material.color = new THREE.Color(`hsl(${210 + Math.sin(t * 2) * 10}, 100%, 65%)`)
    }

    // subtil kamerarörelse ("breathing")
    camera.position.z = 6 + Math.sin(clock.elapsedTime * 0.3) * 0.15
  })

  return (
    <>
          {/* ✨ Space Particles */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particles, 3] as any}
          />

        </bufferGeometry>
        <pointsMaterial
          size={0.01}
          color="#88aaff"
          transparent
          opacity={0.2}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>


      {/* 🌌 Glow-fält bakom jorden */}
      <mesh ref={glowRef} scale={2.9}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial
          color="#2266ff"
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 🌍 Jordklotet */}
      <mesh ref={earthRef} scale={2.5}>
        <sphereGeometry args={[1, 128, 128]} />
        <meshPhongMaterial
          map={day}
          bumpMap={bump}
          bumpScale={0.05}
          specularMap={spec}
          specular={new THREE.Color('#3366ff')}
          shininess={20}
          emissiveMap={night}
          emissiveIntensity={1.6}
          emissive={new THREE.Color('#111111')}
        />
      </mesh>

      {/* ☁️ Moln */}
      <mesh ref={cloudRef} scale={2.53}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial
          map={clouds}
          transparent
          opacity={0.4}
          depthWrite={false}
        />
      </mesh>

      {/* 🌫️ Atmosfär */}
      <mesh scale={2.55}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial
          color="#3fa9f5"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </mesh>
    </>
  )
}

// 🌌 Scenkomponent
export default function Home() {
  return (
    <main
      style={{
        width: '100vw',
        height: '100vh',
        background: 'radial-gradient(circle at center, #040224 0%, #000010 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        color: 'white',
        fontFamily: '"Century Gothic", CenturyGothic, AppleGothic, sans-serif',
      }}
    >
      {/* HEADER / NAV */}
      <header
        style={{
          position: 'absolute',
          top: '3%',
          width: 'min(640px, 86%)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0.55rem 1.2rem',
          borderRadius: '999px',
          background:
            'linear-gradient(135deg, rgba(10,16,60,0.6) 0%, rgba(60,110,200,0.25) 100%)',
          boxShadow: '0 16px 42px rgba(30,70,180,0.25)',
          backdropFilter: 'blur(14px)',
          border: '1px solid rgba(160,210,255,0.25)',
          zIndex: 15,
        }}
      >
        <span
          className={spaceGrotesk.className}
          style={{
            fontSize: '1.1rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            background: 'linear-gradient(90deg, #ffffff 0%, #b9e2ff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          NextMomentia
        </span>

        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.2rem',
            fontSize: '0.85rem',
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
          }}
        >
          <a href="#videos" style={{ color: 'rgba(255,255,255,0.78)', textDecoration: 'none' }}>
            Videos
          </a>
          <a href="#shop" style={{ color: 'rgba(255,255,255,0.78)', textDecoration: 'none' }}>
            Shop
          </a>
          <a href="#about" style={{ color: 'rgba(255,255,255,0.78)', textDecoration: 'none' }}>
            About
          </a>
        </nav>
      </header>

      {/* 🌍 GLOB */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(75vw, 520px)',
          aspectRatio: '1 / 1',
          overflow: 'visible',
          maxWidth: '520px',
          minWidth: '260px',
        }}
      >
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }} style={{ background: 'transparent' }}>
          <ambientLight intensity={0.3} />
          <directionalLight
            name="sunLight"
            color={0xffffff}
            intensity={2.2}
            position={[5, 0, 5]}
          />
          <RealisticEarth />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      {/* CTA */}
      <section
        style={{
          position: 'absolute',
          bottom: '8%',
          opacity: 0.9,
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
            padding: '0.8rem 1.8rem',
            borderRadius: '999px',
            background:
              'linear-gradient(135deg, rgba(130,200,255,0.25) 0%, rgba(255,255,255,0.75) 100%)',
            color: '#051035',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textDecoration: 'none',
            boxShadow: '0 12px 40px rgba(140,210,255,0.35)',
            backdropFilter: 'blur(6px)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease, filter 1s ease',
            filter: 'brightness(1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px) scale(1.04)'
            e.currentTarget.style.boxShadow = '0 20px 60px rgba(170,225,255,0.55)'
            e.currentTarget.style.filter = 'brightness(1.2)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)'
            e.currentTarget.style.boxShadow = '0 12px 40px rgba(140,210,255,0.35)'
            e.currentTarget.style.filter = 'brightness(1)'
          }}
        >
          Explore the Channel
        </a>
      </section>
    </main>
  )
}
