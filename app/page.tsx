'use client'

import { Space_Grotesk } from 'next/font/google'
import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useRef, useMemo, useState, useCallback } from 'react'
import * as THREE from 'three'
import type { CSSProperties } from 'react'

type CountryFeature = { properties: { NAME: string }; [key: string]: unknown }
type CountryCollection = { features: CountryFeature[] }

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ['700'] })

/* -------------------- Partikelfält -------------------- */
function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null!)
  const particles = useMemo(() => {
    const count = 1000
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i++) positions[i] = (Math.random() - 0.5) * 10
    return positions
  }, [])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.01
      pointsRef.current.rotation.x = Math.sin(t * 0.05) * 0.02
    }
  })

  return (
    <group position={[0, 0, -4]}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particles, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#80bfff" size={0.025} sizeAttenuation transparent opacity={0.25} />
      </points>
    </group>
  )
}

/* -------------------- Globe.gl -------------------- */
function GlobeOutline() {
  const globeEl = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!globeEl.current) return
    let isMounted = true
    const container = globeEl.current

    ;(async () => {
      const GlobeModule = await import('globe.gl')
      if (!isMounted) return
      const Globe = GlobeModule.default
      const globe = new Globe(container)

      const textures = {
      day: '/textures/earth_daymap.jpg?v=2',
      night: '/textures/earth_nightmap.jpg?v=2',
      clouds: '/textures/earth_clouds.jpg?v=2',
      bump: '/textures/earthbump1k.jpg?v=2',
      spec: '/textures/earthspec1k.jpg?v=2',
      }

      const loader = new THREE.TextureLoader()

      // Grundinställning
      globe
        .globeImageUrl(textures.day)
        .bumpImageUrl(textures.bump)
        // @ts-ignore - specular map stöds men saknas i typer
        .specularImageUrl(textures.spec)
        .showGraticules(false)
        .showAtmosphere(true)
        .atmosphereColor('#9fcaff')
        .atmosphereAltitude(0.3)
        .backgroundColor('#040224')

      // Material
      const material = globe.globeMaterial() as THREE.MeshPhongMaterial
      material.color = new THREE.Color('#0a0a1a')
      material.specular = new THREE.Color('#9fd4ff')
      material.shininess = 45

      // --- Moln ---
      const cloudTex = loader.load(textures.clouds)
      const cloudGeo = new THREE.SphereGeometry(100, 64, 64)
      const cloudMat = new THREE.MeshPhongMaterial({
        map: cloudTex,
        transparent: true,
        opacity: 0.35,
        depthWrite: false,
      })
      const cloudMesh = new THREE.Mesh(cloudGeo, cloudMat)
      cloudMesh.scale.set(1.013, 1.013, 1.013)
      globe.scene().add(cloudMesh)

      const animateClouds = () => {
        if (!isMounted) return
        cloudMesh.rotation.y += 0.0006
        requestAnimationFrame(animateClouds)
      }
      animateClouds()

      // --- Dynamisk belysning (solrörelse) ---
      const ambientLight = new THREE.AmbientLight(0x202040, 0.4)
      const sunLight = new THREE.DirectionalLight(0xffffff, 1.1)
      globe.scene().add(ambientLight)
      globe.scene().add(sunLight)

      const updateSunPosition = () => {
        const now = new Date()
        const hours = now.getHours() + now.getMinutes() / 60
        const angle = (hours / 24) * Math.PI * 2
        const radius = 200
        sunLight.position.set(
          Math.cos(angle) * radius,
          Math.sin(angle * 0.7) * radius * 0.3,
          Math.sin(angle) * radius
        )
        requestAnimationFrame(updateSunPosition)
      }
      updateSunPosition()

      // --- Länder / polygoner ---
      const res = await fetch(
        'https://unpkg.com/three-globe/example/datasets/ne_110m_admin_0_countries.geojson'
      )
      const countries = await res.json()
      globe
        .polygonsData(countries.features)
        .polygonCapColor(() => 'rgba(255,255,255,0.1)')
        .polygonSideColor(() => 'rgba(160,210,255,0.12)')
        .polygonStrokeColor(() => '#9fd4ff')
      globe.labelsData([])

      // --- Kontroller ---
      globe.controls().enableZoom = false
      globe.controls().autoRotate = true
      globe.controls().autoRotateSpeed = 0.8
      globe.controls().enableDamping = true
      globe.controls().dampingFactor = 0.08

      // --- Anpassa storlek ---
      const resize = () => {
        const { clientWidth, clientHeight } = container
        globe.width(Math.min(clientWidth, clientHeight)).height(Math.min(clientWidth, clientHeight))
      }
      resize()
      const ro = new ResizeObserver(resize)
      ro.observe(container)

      // --- Day/Night blend ---
      const updateLighting = () => {
        const hour = new Date().getHours()
        const blend = hour < 6 ? 0 : hour < 18 ? 1 : 1 - (hour - 18) / 12
        const dayTex = loader.load(textures.day)
        const nightTex = loader.load(textures.night)
        const canvas = document.createElement('canvas')
        canvas.width = 2048
        canvas.height = 1024
        const ctx = canvas.getContext('2d')!
        ctx.globalAlpha = 1
        ctx.drawImage(dayTex.image, 0, 0)
        ctx.globalAlpha = 1 - blend
        ctx.drawImage(nightTex.image, 0, 0)
        const blended = new THREE.CanvasTexture(canvas)
        const globeMat = globe.globeMaterial() as THREE.MeshPhongMaterial
        globeMat.map = blended
        globeMat.needsUpdate = true

      }
      setTimeout(updateLighting, 1500)

      return () => {
        isMounted = false
        ro.disconnect()
      }
    })()

    return () => {
      isMounted = false
      globeEl.current?.replaceChildren()
    }
  }, [])

  return (
    <div
      ref={globeEl}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    />
  )
}

/* -------------------- Navigation & Layout -------------------- */
const navItems = [
  { label: 'Videos', href: '#videos' },
  { label: 'Shop', href: '#shop' },
  { label: 'About', href: '#about' },
]

const navLinkBaseStyle: CSSProperties = {
  position: 'relative',
  color: 'rgba(255,255,255,0.78)',
  textDecoration: 'none',
  paddingBottom: '0.25rem',
  transition: 'color 0.35s ease, text-shadow 0.35s ease',
}
const navLinkHoverStyle: CSSProperties = { color: '#ffffff', textShadow: '0 0 14px rgba(160,220,255,0.85)' }
const navUnderlineBaseStyle: CSSProperties = {
  position: 'absolute',
  left: 0,
  bottom: 0,
  width: '100%',
  height: '2px',
  display: 'block',
  background:
    'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(200,230,255,0.85) 50%, rgba(255,255,255,0) 100%)',
  transformOrigin: 'center',
  transition: 'transform 0.35s ease',
  pointerEvents: 'none',
}

/* -------------------- Huvudkomponent -------------------- */
export default function Home() {
  const [hoveredNavIndex, setHoveredNavIndex] = useState<number | null>(null)
  const handleNavFocus = useCallback((index: number) => setHoveredNavIndex(index), [])
  const resetNavFocus = useCallback(() => setHoveredNavIndex(null), [])

  return (
    <main
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#040224',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontFamily: '"Century Gothic", CenturyGothic, AppleGothic, sans-serif',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <header
        style={{
          position: 'absolute',
          top: '3.5%',
          width: 'min(640px, 86%)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0.55rem 1.2rem',
          borderRadius: '999px',
          background: 'linear-gradient(135deg, rgba(10,16,60,0.6) 0%, rgba(60,110,200,0.25) 100%)',
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
            gap: '1rem',
            fontSize: '0.85rem',
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
          }}
        >
          {navItems.map(({ label, href }, index) => {
            const isHovered = hoveredNavIndex === index
            return (
              <a
                key={label}
                href={href}
                style={{ ...navLinkBaseStyle, ...(isHovered ? navLinkHoverStyle : null) }}
                onMouseEnter={() => handleNavFocus(index)}
                onMouseLeave={resetNavFocus}
              >
                {label}
                <span style={{ ...navUnderlineBaseStyle, transform: `scaleX(${isHovered ? 1 : 0})` }} />
              </a>
            )
          })}
        </nav>
      </header>

      {/* Titel */}
      <h1
        className={spaceGrotesk.className}
        style={{
          position: 'absolute',
          top: '17%',
          textAlign: 'center',
          fontSize: '1rem',
          fontWeight: '700',
          letterSpacing: '-1.5px',
          background: 'linear-gradient(90deg, #ffffff 0%, #d8f1ff 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 0 26px rgba(210,235,255,0.55)',
          zIndex: 10,
        }}
      >
        NextMomentia
      </h1>

      {/* Partiklar */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
        <Canvas camera={{ position: [0, 0, 3.5] }}>
          <ParticleField />
        </Canvas>
      </div>

      {/* Globen */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 5,
        }}
      >
        <GlobeOutline />
      </div>

      {/* Footer CTA */}
      <section
        style={{
          position: 'absolute',
          bottom: '8%',
          opacity: 0.8,
          letterSpacing: '-0.5px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          zIndex: 12,
          textAlign: 'center',
        }}
      >
        <p style={{ opacity: 0.88, letterSpacing: '0.42em', fontSize: '0.8rem', textTransform: 'uppercase' }}>
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
            background: 'linear-gradient(135deg, rgba(130,200,255,0.25) 0%, rgba(255,255,255,0.75) 100%)',
            color: '#051035',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textDecoration: 'none',
            boxShadow: '0 12px 40px rgba(140,210,255,0.35)',
            backdropFilter: 'blur(6px)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)'
            e.currentTarget.style.boxShadow = '0 18px 55px rgba(170,225,255,0.45)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)'
            e.currentTarget.style.boxShadow = '0 12px 40px rgba(140,210,255,0.35)'
          }}
        >
          Explore the Channel
        </a>
      </section>
    </main>
  )
}
