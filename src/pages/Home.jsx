import { useState } from 'react'
import { Link } from 'react-router'
import { SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react'
import reactLogo from '@/assets/react.svg'
import viteLogo from '@/assets/vite.svg'
import heroImg from '@/assets/hero.png'

function Home() {
  const [count, setCount] = useState(0)

  return (
    <div id="home-page" className="relative overflow-hidden">
      {/* Decorative toon circles */}
      <div className="toon-deco-circle w-64 h-64 bg-toon-yellow -top-20 -right-20" />
      <div className="toon-deco-circle w-48 h-48 bg-toon-lavender -bottom-16 -left-16" />

      <section id="center" className="relative z-10 pt-16 pb-12">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>

        <div className="mt-6 flex flex-col items-center gap-3">
          <span className="toon-chip bg-toon-yellow text-toon-dark">✦ Creative Pipeline</span>
          <h1 className="text-4xl md:text-5xl text-toon-dark" style={{ fontFamily: 'var(--font-display)', fontWeight: 900 }}>
            ART REFERENCER
          </h1>
          <p className="text-sm text-toon-dark/60 max-w-md mx-auto leading-relaxed mt-1 font-nunito-sans">
            Generate customized concept art, material guides, and lighting reference boards directly from your 3D viewport.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <SignedIn>
            <Link to="/dashboard" className="toon-btn-primary no-underline inline-block text-center">
              Access Dashboard
            </Link>
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <button type="button" className="toon-btn-primary">
                Sign In / Sign Up
              </button>
            </SignInButton>
          </SignedOut>

          <button
            type="button"
            className="toon-btn-secondary"
            onClick={() => setCount((count) => count + 1)}
          >
            Ping Counter: {count}
          </button>
        </div>
      </section>

      <div className="ticks"></div>

      <section id="next-steps" className="relative z-10">
        <div id="docs" className="toon-card bg-white p-0">
          <div className="p-6">
            <svg className="icon size-5 mb-3" role="presentation" aria-hidden="true">
              <use href="/icons.svg#documentation-icon"></use>
            </svg>
            <h2 className="text-lg mb-2" style={{ fontFamily: 'var(--font-display)' }}>Documentation</h2>
            <p className="text-xs text-toon-dark/60 mb-4 font-nunito-sans">Your questions, answered</p>
            <ul>
              <li>
                <a href="https://vite.dev/" target="_blank">
                  <img className="logo" src={viteLogo} alt="" />
                  Explore Vite
                </a>
              </li>
              <li>
                <a href="https://react.dev/" target="_blank">
                  <img className="button-icon" src={reactLogo} alt="" />
                  Learn more
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div id="social" className="toon-card bg-white p-0">
          <div className="p-6">
            <svg className="icon size-5 mb-3" role="presentation" aria-hidden="true">
              <use href="/icons.svg#social-icon"></use>
            </svg>
            <h2 className="text-lg mb-2" style={{ fontFamily: 'var(--font-display)' }}>Connect with us</h2>
            <p className="text-xs text-toon-dark/60 mb-4 font-nunito-sans">Join the Vite community</p>
            <ul>
              <li>
                <a href="https://github.com/vitejs/vite" target="_blank">
                  <svg
                    className="button-icon"
                    role="presentation"
                    aria-hidden="true"
                  >
                    <use href="/icons.svg#github-icon"></use>
                  </svg>
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://chat.vite.dev/" target="_blank">
                  <svg
                    className="button-icon"
                    role="presentation"
                    aria-hidden="true"
                  >
                    <use href="/icons.svg#discord-icon"></use>
                  </svg>
                  Discord
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </div>
  )
}

export default Home
