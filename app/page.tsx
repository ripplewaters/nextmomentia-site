'use client'

import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import { useRef } from 'react'
import { TextureLoader } from 'three'
import { OrbitControls } from '@react-three/drei'

// 🌍 Globkomponent
function RealisticEarth() {
  const earthRef = useRef<THREE.Mesh>(null)
  const cloudsRef = useRef<THREE.Mesh>(null)

  // Ladda texturer
  const [dayMap, nightMap, bumpMap, specMap, cloudMap] = useLoader(TextureLoader, [
    '/textures/earth_daymap.jpg',
    '/textures/earth_nightmap.jpg',
    '/textures/earthbump1k.jpg',
    '/textures/earthspec1k.jpg',
    '/textures/earth_clouds.jpg'
  ])

  // Material med flera lager
  const uniforms = {
    dayTexture: { value: dayMap },
    nightTexture: { value: nightMap },
    specularMap: { value: specMap },
    bumpMap: { value: bumpMap },
    lightDirection: { value: new THREE.Vector3() }
  }

  // Shader – blandar day/night beroende på ljusvinkel
  const earthMaterial = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vWorldPosition;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPosition.xyz;
        gl_Position = projectionMatrix * viewMatrix * worldPosition;
      }
    `,
    fragmentShader: `
      uniform sampler2D dayTexture;
      uniform sampler2D nightTexture;
      uniform vec3 lightDirection;
      varying vec3 vNormal;
      varying vec3 vWorldPosition;
      void main() {
        vec3 normal = normalize(vNormal);
        float intensity = dot(normal, normalize(lightDirection));
        intensity = clamp(intensity * 0.5 + 0.5, 0.0, 1.0);
        vec4 dayColor = texture2D(dayTexture, vec2(atan(normal.z, normal.x)/(2.0*3.14159)+0.5, asin(normal.y)/3.14159+0.5));
        vec4 nightColor = texture2D(nightTexture, vec2(atan(normal.z, normal.x)/(2.0*3.14159)+0.5, asin(normal.y)/3.14159+0.5));
        gl_FragColor = mix(nightColor, dayColor, intensity);
      }
    `
  })

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()

    // Rotera globen
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.0008
    }

    // Rotera molnen något snabbare
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += 0.001
    }

    // Flytta ljuskällan (solen)
    const lightDir = new THREE.Vector3(Math.sin(t * 0.1), 0, Math.cos(t * 0.1))
    uniforms.lightDirection.value.copy(lightDir)
  })

  return (
    <>
      {/* Jordklot */}
      <mesh ref={earthRef} scale={2.5} material={earthMaterial}>
        <sphereGeometry args={[1, 128, 128]} />
      </mesh>

      {/* Moln */}
      <mesh ref={cloudsRef} scale={2.52}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial
          map={cloudMap}
          transparent
          opacity={0.35}
          depthWrite={false}
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
        background: 'radial-gradient(circle at center, #03031a 0%, #000010 100%)',
        overflow: 'hidden'
      }}
    >
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        {/* Ljus */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 0, 10]} intensity={2} />
        <RealisticEarth />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </main>
  )
}
