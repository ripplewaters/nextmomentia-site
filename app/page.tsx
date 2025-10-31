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

/* -------------------- Globe.gl (Day/Night + Clouds + Bump/Specular) -------------------- */
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

      const hour = new Date().getHours()
      const isDaytime = hour >= 6 && hour < 18

      const dayTexture = '/textures/earth_daymap.jpg'
      const nightTexture = '/textures/earth_nightmap.jpg'
      const cloudsTexture = '/textures/earth_clouds.jpg'
      const bumpTexture = '/textures/earthbump1k.jpg'
      const specTexture = '/textures/earthspec1k.jpg'

      globe
        .globeImageUrl(isDaytime ? dayTexture : nightTexture)
        .bumpImageUrl(bumpTexture)
        // @ts-ignore - specularImageUrl works at runtime but not typed
        .specularImageUrl(specTexture)
        .showGraticules(false)
        .showAtmosphere(true)
        .atmosphereColor('#a8cfff')
        .atmosphereAltitude(0.28)
        .backgroundColor('#040224')

      // --- Materialjustering ---
      const material = globe.globeMaterial() as THREE.MeshPhongMaterial
      material.color = new THREE.Color('#0a0a1a')
      material.specular = new THREE.Color('#a0caff')
      material.shininess = 45

      // --- Cloud layer ---
      const textureLoader = new THREE.TextureLoader()
      const cloudTexture = textureLoader.load(cloudsTexture)
      const cloudGeometry = new THREE.SphereGeometry(100, 64, 64)
      const cloudMaterial = new THREE.MeshPhongMaterial({
        map: cloudTexture,
        transparent: true,
        opacity: 0.35,
        depthWrite: false,
      })
      const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial)
      cloudMesh.scale.set(1.013, 1.013, 1.013)
      globe.scene().add(cloudMesh)

      const animateClouds = () => {
        if (!isMounted) return
        cloudMesh.rotation.y += 0.0006
        requestAnimationFrame(animateClouds)
      }
      animateClouds()

      // --- Länder / polygoner ---
      const res = await fetch(
        'https://unpkg.com/three-globe/example/datasets/ne_110m_admin_0_countries.geojson'
      )
      const countries = (await res.json()) as CountryCollection
      globe
        .polygonsData(countries.features)
        .polygonCapColor(() => 'rgba(255,255,255,0.15)')
        .polygonSideColor(() => 'rgba(160,210,255,0.12)')
        .polygonStrokeColor(() => '#9fd4ff')

      globe.labelsData([])


      // --- Kamerakontroller ---
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

/* -------------------- Nav & Layout -------------------- */
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
