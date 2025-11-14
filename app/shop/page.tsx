'use client'

import { motion } from 'framer-motion'
import NavBar from '../components/NavBar'

export default function ShopPage() {
  // Storlekar för vänster, mitten, höger
  const textureSizes = [70, 300, 70] // justera fritt
  const textures = ['/textures/text1.png', '/textures/text2.png', '/textures/text3.png']

  return (
    <main
      id="shop-page"
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#000',
        color: '#fff',
        fontFamily: '"Space Grotesk", sans-serif',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* 🌌 Bakgrundsvideo */}
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
          zIndex: 0,
          opacity: 0.35,
        }}
      >
        <source src="/videos/shop_bg_earth.mp4" type="video/mp4" />
      </video>

      <NavBar />

      {/* 🔆 Mjuk oval glow */}
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 'min(80vw, 550px)',
          height: 'min(60vw, 350px)',
          background:
            'radial-gradient(ellipse at center, rgba(255,180,80,0.2) 0%, rgba(30,10,0,0.05) 80%)',
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          filter: 'blur(35px)',
          zIndex: 1,
        }}
      />

      {/* 🧩 Tre loggor bredvid varandra */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2.5rem',
          zIndex: 5,
          marginBottom: '3rem',
        }}
      >
        {textures.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Texture ${i}`}
            style={{
              width: textureSizes[i],
              height: 'auto',
              objectFit: 'contain',
              opacity: i === 1 ? 1 : 0.8,
              filter:
                'drop-shadow(0 0 20px rgba(255,255,255,0.2)) drop-shadow(0 0 60px rgba(255,255,255,0.1))',
            }}
          />
        ))}
      </div>

      {/* 🧡 COMING SOON */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{
          fontSize: '1.9rem',
          fontWeight: 700,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          zIndex: 10,
          color: '#fff',
          textShadow: '0 0 15px rgba(255,255,255,0.3)',
        }}
      >
        Coming soon
      </motion.h1>
    </main>
  )
}
