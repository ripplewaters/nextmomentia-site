import { Space_Grotesk } from 'next/font/google'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['700'],
})


'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei'

export default function Home() {
  return (
    <main style={{
      width: '100vw',
      height: '100vh',
      backgroundColor: '#040224', // din nya bakgrundsfärg
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      fontFamily: '"Century Gothic", CenturyGothic, AppleGothic, sans-serif',
      overflow: 'hidden'
    }}>
      <h1 className={spaceGrotesk.className} style={{
        position: 'absolute',
        top: '6%',
        textAlign: 'center',
        letterSpacing: '3px',
        fontSize: '3rem',
        fontWeight: '700'
      }}>
        NextMomentia
      </h1>

      <Canvas camera={{ position: [0, 0, 3.5] }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1.5} />
        <Sphere args={[1, 64, 64]} scale={1.3}>
          <MeshDistortMaterial
            color="#ffffff"          // vit glob
            emissive="#ffffff"       // ljusutsläpp
            emissiveIntensity={0.9}  // hur starkt den glöder
            wireframe
            speed={2}
            distort={0}
          />
        </Sphere>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.3} />
      </Canvas>

      <p style={{
        position: 'absolute',
        bottom: '8%',
        opacity: 0.8,
        letterSpacing: '0.5px'
      }}>
        Delivering the internet’s most powerful moments 🌐
      </p>
    </main>
  )
}
