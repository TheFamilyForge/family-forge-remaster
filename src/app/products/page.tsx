// src/app/products/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import styles from './products.module.css'

/* -- 1. THUMBNAIL DATA ------------------------------------- */
const cutouts = [
  { src: '/assets/photos/funny-bbq-charcuterie-board-engraving-n.webp', alt: 'Funny BBQ Charcuterie Board' },
  { src: '/assets/photos/true-love-has-four-paws-pet-lover-cutting-board-reduced-glare-n.webp', alt: 'True Love Has Four Paws Cutting Board' },
  { src: '/assets/photos/sweet-dreams-are-made-of-brie-charcuterie-board.webp', alt: 'Sweet Dreams Are Made of Brie Charcuterie Board' },
  { src: '/assets/photos/victory-at-sea-cutting-board.webp', alt: 'Victory at Sea' },
  { src: '/assets/photos/blue-fox-crystals-cutting-board.webp', alt: 'Blue Fox Crystals Cutting Board' },
  { src: '/assets/photos/L-initial-custom-cutting-board.webp', alt: 'Custom Initial Cutting Board' },
  { src: '/assets/photos/cat-lover-charcuterie-board.webp', alt: 'Cat Lover Charcuterie Board' },
  { src: '/assets/photos/naples-florida-cutting-board-n.webp', alt: 'Naples Florida Cutting Board' },
  { src: '/assets/photos/my-cooking-is-fabulous-my-smoke-detector-cheers-me-on-cutting-board-n.webp', alt: 'My Cooking Is Fabulous Cutting Board' },
  { src: '/assets/photos/florida-cutting-board-n.webp', alt: 'Florida Cutting Board' },
  { src: '/assets/photos/snacks-are-gone-charcuterie-board-n.webp', alt: 'Snacks Are Gone Charcuterie Board' },
  { src: '/assets/photos/custom-family-name-charcuterie-board.webp', alt: 'Custom Family Name Charcuterie Board' },
  { src: '/assets/photos/what-happens-at-grandmas-house.webp', alt: 'What Happens at Grandma’s House Charcuterie Board' },
  { src: '/assets/photos/culinary-gangster-charcuterie-board.webp', alt: 'Culinary Gangster Cutting Board' },
  { src: '/assets/photos/holiday-snowman-charcuterie-board-n.webp', alt: 'Holiday Snowman Charcuterie Board' },
  { src: '/assets/photos/fall-pumpkin-charcuterie-board-n.webp', alt: 'Fall Pumpkin Charcuterie Board' },
  { src: '/assets/photos/easter-charcuterie-boards-triple-photo.webp', alt: 'Easter Charcuterie Boards' },
  { src: '/assets/photos/hurricane-ian-christmas-ornaments-n.webp', alt: 'Hurricane Ian Christmas Ornaments' },
  { src: '/assets/photos/martini-cutting-board.webp', alt: 'Martini Cutting Board' },
  { src: '/assets/photos/butchers-cow-diagram-cutting-board.webp', alt: 'Butchers Cow Diagram Cutting Board' },
  { src: '/assets/photos/new-york-city-lazy-susan-n.webp', alt: 'New York City Lazy Susan' },
  { src: '/assets/photos/metal-business-card-our-products-page.webp', alt: 'Custom Metal Business Card' }
]

export default function ProductsPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number>(-1)

  /* -- 2. STATIC MOBILE 100‑vh FIX --------------------------- */
  useEffect(() => {
    const setVh = () =>
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`)
    setVh()
    window.addEventListener('orientationchange', setVh)
    return () => window.removeEventListener('orientationchange', setVh)
  }, [])

  return (
    <>
      {/* ─── 1) HERO ─────────────────────────────────────────── */}
      <section className={styles.heroSection}>
        <div className={styles.heroOverlay}>
          <h1 className={styles.heroTitle}>Products</h1>
        </div>
      </section>

      {/* ─── 2) CONTENT ─────────────────────────────────────── */}
      <section className={styles.contentSection}>
        <div className={styles.contentContainer}>
          {/* Laser‑shot photo */}
          <div className={styles.contentImage} style={{ position: 'relative', width: '100%', height: '65vh' }}>
            <Image
              src="/assets/photos/our-products-laser-shot.webp"
              alt="Laser Engraving Machine"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          {/* Text copy */}
          <div className={styles.contentText}>
            <h2 className={styles.contentHeading}>Our Products</h2>
            <p>
              At The Family Forge we specialize in paddle boards and rectangular boards with rounded
              edges—both include easy‑to‑hang holes or slits. We also take fully custom surfaces.
            </p>
            <p>
              We can engrave any wooden cutting board or ornamental piece within reason. By default
              we provide the board; on special request you may supply your own.
            </p>
            <p>
              Our square bamboo cutting board—pictured here with its handle—starts at <b>$20</b>.
              Custom engraving is an additional <b>$5</b>.
            </p>
          </div>

          <hr className={styles.sectionDividerDark} />
        </div>
      </section>

      {/* ─── 3) CUT‑OUT GRID + LIGHTBOX ─────────────────────── */}
      <section className={styles.newGridSection}>
        <div className={styles.newGrid}>
          {cutouts.map(({ src, alt }, i) => (
            <div
              key={src}
              className={styles.newGridItem}
              style={{ position: 'relative', cursor: 'pointer' }}
              onClick={() => setLightboxIndex(i)}
            >
              <Image
                src={src}
                alt={alt}
                fill
                style={{ objectFit: 'contain' }}
                sizes="(max-width: 768px) 45vw, 30vw"
              />
            </div>
          ))}
        </div>

        <p className={styles.extraLine}>
          Also available: Lazy Susans, Metal Business Cards, and much more!
        </p>
      </section>

      {/* ─── LIGHTBOX ───────────────────────────────────────── */}
      <Lightbox
        className={styles.lightboxOverride}
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={cutouts.map(({ src, alt }) => ({ src, title: alt }))}
        controller={{ closeOnBackdropClick: true }}
        on={{ click: () => setLightboxIndex(-1) }}
        styles={{ container: { backgroundColor: 'rgba(0,0,0,0.9)' } }}
      />
    </>
  )
}
