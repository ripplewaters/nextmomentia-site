import Image from "next/image";

export default function Home() {
  return (
    <main style={{
      backgroundColor: '#060345',
      color: '#fff',
      fontFamily: '"Century Gothic", CenturyGothic, AppleGothic, sans-serif',
      fontWeight: 'bold',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '3rem', letterSpacing: '2px' }}>⚡ NextMomentia</h1>
      <p style={{ fontSize: '1.2rem', maxWidth: '600px', opacity: 0.8 }}>
        DON'T JUST WATCH. REACT.
      </p>
      <a 
        href="https://www.youtube.com/@NextMomentia" 
        target="_blank" 
        rel="noopener noreferrer"
        style={{
          marginTop: '2rem',
          background: '#e50914',
          padding: '12px 24px',
          borderRadius: '8px',
          color: '#fff',
          textDecoration: 'none',
          fontWeight: 'bold',
          transition: '0.2s ease-in-out'
        }}
      >
        🔴 Watch on YouTube
      </a>
    </main>
  )
}
