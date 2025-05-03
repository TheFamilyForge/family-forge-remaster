// src/app/about/page.tsx
'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './aboutus.module.css'

export default function AboutUsPage() {
  /* ── STATIC MOBILE‑100vh FIX ─────────────────────────── */
  useEffect(() => {
    const setVh = () =>
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`)
    setVh()
    window.addEventListener('orientationchange', setVh)
    return () => window.removeEventListener('orientationchange', setVh)
  }, [])

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className={styles.heroSection}>
        <div className={styles.heroOverlay}>
          <h1 className={styles.heroTitle}>About Us</h1>
        </div>
      </section>

      {/* ── Content ─────────────────────────────────────── */}
      <section className={styles.contentSection}>
        <div className={styles.textContainer}>
          <h2>Caleb and Declan</h2>

          <p>
            The Family Forge is a dynamic business based in Fort Myers, Florida, founded by Declan
            and Caleb Donnelly, twins who have called this place home since birth. As young
            entrepreneurs, they’ve always been drawn to technology, business, and community service.
          </p>

          <p>
            From a young age they tinkered with everything tech—from robots to 3D printers. A laser
            engraver—initially a hobby—quickly sparked a thriving business. The Family Forge grew
            from a pastime into a successful enterprise, offering unique opportunities to many.
          </p>

          <p>
            Declan and Caleb are deeply committed to their community. They volunteer at a local food
            bank and donate a percentage of profits to a nearby military foundation—believing local
            impact matters most.
          </p>

          <p>
            Contact us:<br />
            239‑224‑0553<br />
            239‑224‑8998
          </p>

          <p className={styles.footerText}>
            <em>We accept cash, checks, Venmo, Apple Pay, and credit cards.</em>
          </p>
        </div>

        {/* Photo */}
        <div className={styles.imageContainer}>
          <Image
            src="/assets/photos/caleb-and-declan-about-us.webp"
            alt="Caleb and Declan"
            width={1200}
            height={800}
            sizes="(max-width: 768px) 90vw, 45vw"
            priority
            className={styles.profileImage}
          />
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────── */}
      <section className={styles.ctaSection}>
        <Link href="/terms" className={styles.ctaButton}>
          Terms and Conditions
        </Link>
      </section>
    </>
  )
}
