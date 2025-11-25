'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Space_Grotesk } from 'next/font/google'
import { usePathname } from 'next/navigation'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['700'],
})

export default function NavBar() {
  const pathname = usePathname()

  const routes = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'Shop' },
    { href: '/about', label: 'About' },
  ]

  const activeIndex = routes.findIndex((r) => r.href === pathname)
  const safeIndex = activeIndex === -1 ? 0 : activeIndex
  const sideLinks = routes.filter((_, idx) => idx !== safeIndex)

  return (
    <div className={`nav-shell ${spaceGrotesk.className}`}>
      {/* Bakgrundskropp */}
      <svg
        className="nav-shell-bg"
        viewBox="0 0 360 150"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="metalBody" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6a4de0" />
            <stop offset="35%" stopColor="#39407c" />
            <stop offset="70%" stopColor="#152135" />
            <stop offset="100%" stopColor="#050811" />
          </linearGradient>

          <filter id="outerShadow" x="-20%" y="-30%" width="140%" height="180%">
            <feDropShadow
              dx="0"
              dy="18"
              stdDeviation="12"
              floodColor="rgba(0,0,0,0.95)"
            />
          </filter>
        </defs>

        <g filter="url(#outerShadow)">
          <path
            d="
              M16 60
              Q36 34 78 30
              L282 28
              Q318 32 344 50
              Q354 58 354 74
              Q354 90 342 102
              Q314 128 182 132
              Q52 128 26 102
              Q10 86 12 72
              Q14 64 16 60 Z
            "
            fill="url(#metalBody)"
          />

          <path
            d="
              M16 60
              Q6 66 6 76
              Q6 96 26 110
              Q52 128 90 122
              Q62 106 50 90
              Q32 72 24 60
              Z
            "
            fill="rgba(4,10,24,0.98)"
          />
          <path
            d="
              M344 60
              Q354 66 354 76
              Q354 96 334 110
              Q308 128 270 122
              Q298 106 310 90
              Q328 72 336 60
              Z
            "
            fill="rgba(4,10,24,0.98)"
          />

          <ellipse
            cx="180"
            cy="70"
            rx="112"
            ry="38"
            fill="rgba(20,80,120,0.42)"
            stroke="#46f0ff"
            strokeWidth="2.3"
          />
        </g>
      </svg>

      <header className="nav-inner">
        {/* Glas + sidoknappar */}
        <div className="nav-glass-layer">
          <div className="glass-center">
            <div className="glass-center-highlight" />
            <div className="glass-center-noise" />
          </div>

          <Link
            href={sideLinks[0].href}
            className="glass-side glass-left glass-link glass-left-unique"
          >
            <span className="glass-label">{sideLinks[0].label}</span>
          </Link>

          <Link
            href={sideLinks[1].href}
            className="glass-side glass-right glass-link glass-right-unique"
          >
            <span className="glass-label">{sideLinks[1].label}</span>
          </Link>
        </div>

        {/* Logo-pod */}
        <div className="nav-logo-wrapper">
          <div className="nav-logo-seat">
            <div className="nav-logo-seat-inner" />
            <Link
              href="/"
              aria-label="NextMomentia home"
              className="nav-logo-link"
            >
              <Image
                src="/icon.png"
                alt="NextMomentia Eye Logo"
                width={36}
                height={36}
                className="nav-logo-img"
              />
            </Link>
          </div>
        </div>

        {/* CTA + orbs */}
        <div className="nav-orbs-wrapper">
          <div className="nav-cta-stack">
            {/* Glas-modul under CTA */}
            <div className="nav-cta-glass" />

            <a
              href="https://www.youtube.com/@NextMomentia"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-cta-main"
            >
              Explore
            </a>

            <div className="nav-orbs-bar">
              <a
                href="https://www.youtube.com/@NextMomentia"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-orb-link"
                aria-label="Videos"
              >
                <span className="nav-orb orb-red" />
              </a>

              <Link href="/shop" className="nav-orb-link" aria-label="Shop">
                <span className="nav-orb orb-yellow" />
              </Link>

              <Link href="/about" className="nav-orb-link" aria-label="About">
                <span className="nav-orb orb-blue" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <style jsx global>{`
        .nav-shell {
            position: fixed;
  z-index: 20;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: min(560px, 94%);  /* ← fix: inte 96% längre */
  height: 130px;           /* lite högre så allt får plats snyggt */
  pointer-events: none;
        }

        .nav-shell-bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        .nav-inner {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: auto;
        }

        .nav-glass-layer {
          position: absolute;
          inset: 8px 18px;    /* mobil-look som bas */
        }

        .glass-center {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -52%);
          width: 80%;         /* mobil-look */
          height: 54%;        /* mobil-look */
          border-radius: 199px 199px 999px 999px;
          background:
            radial-gradient(
              circle at 30% 0%,
              rgba(255, 255, 255, 0.32),
              transparent 60%
            ),
            linear-gradient(
              180deg,
              rgba(60, 170, 190, 0.55),
              rgba(20, 60, 110, 0.88),
              rgba(4, 10, 24, 1)
            );
          border: 1.7px solid rgba(150, 230, 255, 0.58);
          box-shadow:
            inset 0 1px 7px rgba(255, 255, 255, 0.5),
            inset 0 -7px 16px rgba(0, 0, 0, 0.95);
          backdrop-filter: blur(26px);
          -webkit-backdrop-filter: blur(26px);
          overflow: hidden;
        }

        .glass-center-highlight {
          position: absolute;
          top: -10%;
          left: -5%;
          width: 110%;
          height: 48%;
          border-radius: 999px;
          background: radial-gradient(
            circle at 50% 0%,
            rgba(255, 255, 255, 0.32),
            rgba(255, 255, 255, 0) 70%
          );
        }

        .glass-center-noise {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(
            circle at 1px 1px,
            rgba(255, 255, 255, 0.1) 1px,
            transparent 0
          );
          background-size: 3px 3px;
          opacity: 0.35;
          mix-blend-mode: soft-light;
        }

        .glass-side {
          position: absolute;
          top: 50%;
          transform: translateY(-54%);
          width: 30%;         /* mobil-look */
          height: 40%;        /* mobil-look */
          border-radius: 999px;
          background:
            radial-gradient(
              circle at 30% 0%,
              rgba(255, 255, 255, 0.3),
              transparent 60%
            ),
            linear-gradient(
              150deg,
              rgba(125, 225, 230, 0.9),
              rgba(70, 145, 230, 0.9),
              rgba(20, 40, 80, 1)
            );
          border: 1.9px solid rgba(185, 245, 255, 0.85);
          box-shadow:
            inset 0 2px 7px rgba(255, 255, 255, 0.5),
            inset 0 -4px 12px rgba(0, 0, 0, 0.95);
          backdrop-filter: blur(22px);
          -webkit-backdrop-filter: blur(22px);
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition:
            transform 0.16s ease-out,
            box-shadow 0.16s ease-out,
            filter 0.16s ease-out;
        }

        .glass-left {
          left: 16%;          /* intryckta mot mitten */
        }

        .glass-right {
          right: 16%;
        }

        .glass-label {
  font-family: "Orbitron", sans-serif;
  font-weight: 700;
  font-size: 0.68rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;

  color: #f4f9ff;

  /* Embossed / upphöjd text */
  -webkit-text-stroke: 0.5px rgba(255, 255, 255, 0.22);

  text-shadow:
    /* topphighlight – gör texten “kupad” uppåt */
    0 -1px 1.5px rgba(255, 255, 255, 0.32),

    /* glow runt texten – samma språk som CTA */
    0 0 5px rgba(150, 230, 255, 0.6),
    0 0 11px rgba(100, 200, 255, 0.45),

    /* djup under texten */
    0 1.5px 2.5px rgba(0, 0, 0, 0.9),
    0 3px 4.5px rgba(0, 0, 0, 0.7);
}


        .glass-link:hover {
          filter: brightness(1.08)
            drop-shadow(0 0 8px rgba(150, 255, 255, 0.35));
          box-shadow:
            inset 0 2px 4px rgba(255, 255, 255, 0.4),
            inset 0 -3px 7px rgba(0, 0, 0, 1),
            0 10px 22px rgba(0, 0, 0, 1);
        }

        .nav-logo-wrapper {
  position: relative;
  z-index: 4;              /* loggan överst */
  transform: translateY(-4px);
}

        .nav-logo-seat {
          position: relative;
          width: 62px;
          height: 62px;
          border-radius: 999px;
          background:
            radial-gradient(
              circle at 30% 10%,
              #c3d4ff 0%,
              #6b59ff 35%,
              #26214f 70%,
              #050513 100%
            );
          box-shadow:
            inset 0 2px 4px rgba(255, 255, 255, 0.24),
            inset 0 -5px 9px rgba(0, 0, 0, 0.96),
            0 7px 16px rgba(0, 0, 0, 1);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .nav-logo-seat::before {
          content: '';
          position: absolute;
          inset: 5px;
          border-radius: 999px;
          background:
            radial-gradient(
              circle at 40% 18%,
              #ffffff 0%,
              #dde4ff 18%,
              #4953cf 55%,
              #050614 100%
            );
          box-shadow:
            inset 0 2px 3px rgba(255, 255, 255, 0.3),
            inset 0 -3px 6px rgba(0, 0, 0, 0.95);
        }

        .nav-logo-seat-inner {
          position: absolute;
          inset: 12px;
          border-radius: 999px;
          background: radial-gradient(
            circle at 30% 20%,
            rgba(255, 255, 255, 0.55),
            rgba(150, 210, 255, 0.3),
            rgba(0, 0, 0, 0.85)
          );
          opacity: 0.7;
          mix-blend-mode: screen;
        }

        .nav-logo-img {
          width: 34px;
          height: 34px;
          filter:
            drop-shadow(0 1px 2px rgba(0, 0, 0, 1))
            drop-shadow(0 0 14px rgba(255, 255, 255, 1));
          opacity: 0.98;
          mix-blend-mode: screen;
        }

        /* CTA + orbs */
        .nav-orbs-wrapper {
  position: absolute;
  top: 90px;               /* lite närmare cirkeln */
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;              /* hela Explore-blocket går bakom cirkeln */
}

        .nav-cta-stack {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
        }

        /* Modulen under CTA – mindre nu */
        .nav-cta-glass {
          position: absolute;
          top: 6px;
          left: 50%;
          transform: translateX(-50%);
          width: 110%;        /* lite bredare än CTA */
          height: 114%;       /* mindre än innan */
          border-radius: 290px 290px 999px 999px;
          background:
            radial-gradient(
              circle at 20% 0%,
              rgba(255, 255, 255, 0.25),
              transparent 60%
            ),
            linear-gradient(
              180deg,
              rgba(90, 200, 235, 0.85),
              rgba(40, 90, 170, 0.95),
              rgba(10, 20, 45, 1)
            );
          border: 1.8px solid rgba(185, 245, 255, 0.9);
          box-shadow:
            inset 0 2px 7px rgba(255, 255, 255, 0.5),
            inset 0 -5px 14px rgba(0, 0, 0, 0.95),
            0 10px 22px rgba(0, 0, 0, 0.9);
          backdrop-filter: blur(22px);
          -webkit-backdrop-filter: blur(22px);
          z-index: 0;
        }

        .nav-cta-main {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 0.5rem 2.6rem;
  border-radius: 299px 299px 999px 999px;

  font-family: "Orbitron", sans-serif;
  font-weight: 700;
  font-size: 0.72rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  text-decoration: none;
  color: #f4faff;

  /* -------- EMBOSSED EFFECT -------- */
  /* Inner bright stroke + lifted black shadow */
  -webkit-text-stroke: 0.6px rgba(255, 255, 255, 0.28);

  text-shadow:
    /* top highlight - pushes text "upwards" */
    0 -1px 2px rgba(255, 255, 255, 0.35),

    /* main outer glow – same vibe som About/Shop */
    0 0 6px rgba(150, 230, 255, 0.65),
    0 0 12px rgba(100, 200, 255, 0.45),

    /* subtle depth directly under text */
    0 2px 3px rgba(0, 0, 0, 0.85),

    /* deeper embossed shadow */
    0 3px 5px rgba(0, 0, 0, 0.65);

  /* ---------------------------------- */

  background:
    radial-gradient(
      circle at 30% 0%,
      rgba(255, 255, 255, 0.22),
      transparent 55%
    ),
    linear-gradient(
      150deg,
      rgba(130, 235, 240, 0.95),
      rgba(80, 155, 250, 0.95),
      rgba(18, 40, 90, 1)
    );

  border: 1.9px solid rgba(190, 245, 255, 0.9);
  box-shadow:
    inset 0 2px 6px rgba(255, 255, 255, 0.4),
    inset 0 -4px 9px rgba(0, 0, 0, 1),
    0 10px 22px rgba(0, 0, 0, 0.9);

  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);

  transition:
    transform 0.2s ease-out,
    box-shadow 0.2s ease-out,
    filter 0.2s ease-out;
}

.nav-cta-main:hover {
  transform: translateY(-1px) scale(1.03);
  filter: brightness(1.07);
  text-shadow:
    0 -1px 2px rgba(255, 255, 255, 0.4),
    0 0 8px rgba(170, 255, 255, 0.75),
    0 0 14px rgba(120, 240, 255, 0.55),
    0 2px 4px rgba(0, 0, 0, 1),
    0 4px 6px rgba(0, 0, 0, 0.9);
}

.nav-cta-main:active {
  transform: translateY(0) scale(0.97);
  filter: brightness(0.95);
  text-shadow:
    0 -0.5px 1.5px rgba(255, 255, 255, 0.25),
    0 0 4px rgba(150, 255, 255, 0.4),
    0 2px 2px rgba(0, 0, 0, 1),
    0 3px 4px rgba(0, 0, 0, 1);
}


.nav-cta-main:hover {
  transform: translateY(-1px) scale(1.03);
  filter: brightness(1.05);
  box-shadow:
    inset 0 2px 6px rgba(255, 255, 255, 0.42),
    inset 0 -4px 10px rgba(0, 0, 0, 1),
    0 14px 28px rgba(0, 0, 0, 0.9);
}

.nav-cta-main:active {
  transform: translateY(0) scale(0.97);
  box-shadow:
    inset 0 1px 3px rgba(255, 255, 255, 0.28),
    inset 0 -3px 7px rgba(0, 0, 0, 1),
    0 6px 16px rgba(0, 0, 0, 1);
  filter: brightness(0.96);
}


        .nav-orbs-bar {
          position: relative;
          z-index: 1;
          margin-top: 3px;
          padding: 3px 16px 4px;    /* mobil-look */
          border-radius: 99px 99px 999px 999px;
          background:
            radial-gradient(circle at 50% 0%, #ffffff, #dde3f3 40%, #8d96b2 90%),
            linear-gradient(180deg, #d5ddf2 0%, #676f8d 100%);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.98),
            inset 0 -2px 3px rgba(20, 22, 40, 0.95),
            0 3px 6px rgba(0, 0, 0, 0.9);
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .nav-orb-link {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2px;
        }

        .nav-orb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.95);
          box-shadow:
            inset 0 2px 3px rgba(255, 255, 255, 1),
            inset 0 -3px 4px rgba(0, 0, 0, 1),
            0 0 6px rgba(0, 0, 0, 1);
        }

        .orb-red {
          background: radial-gradient(circle, #ffe3e3, #ff3d47 45%, #7f0b18 95%);
        }
        .orb-yellow {
          background: radial-gradient(
            circle,
            #fff8d4,
            #ffd94a 45%,
            #9d6b00 95%
          );
        }
        .orb-blue {
          background: radial-gradient(
            circle,
            #e3f3ff,
            #4fb0ff 45%,
            #0a3d7c 95%
          );
        }

        .nav-orb-link:hover .nav-orb {
          box-shadow:
            inset 0 2px 3px rgba(255, 255, 255, 1),
            inset 0 -3px 4px rgba(0, 0, 0, 1),
            0 0 10px rgba(255, 255, 255, 0.95);
          transform: translateY(-1px);
        }

        /* Unika side-shapes */
        .glass-left-unique {
          border-radius: 299px 999px 299px 999px;
        }

        .glass-right-unique {
          border-radius: 999px 299px 999px 299px;
        }

        .glass-left-unique:hover,
        .glass-right-unique:hover {
          filter: brightness(1.05);
        }

        @media (max-width: 640px) {
          /* Behåll bara små tweaks här om du vill justera text senare */
        }
      `}</style>
    </div>
  )
}
