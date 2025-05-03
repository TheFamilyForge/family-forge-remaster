// src/app/page.tsx
'use client'

import { useEffect } from 'react'
import EmblaCarousel from '@components/carousel/EmblaCarousel'
import type { EmblaOptionsType } from 'embla-carousel'
import HeroAnimation from '@components/HeroAnimation'
import styles from './home.module.css'

export default function Home() {
  /* — 100 vh mobile fix — */
  useEffect(() => {
    const setVh = () => {
      document.documentElement.style.setProperty(
        '--vh',
        `${window.innerHeight * 0.01}px`
      )
    }
    setVh()
    window.addEventListener('orientationchange', setVh)
    return () => window.removeEventListener('orientationchange', setVh)
  }, [])

  /* — header shadow on scroll — */
  useEffect(() => {
    const header = document.querySelector('.site-header')
    const onScroll = () => {
      header?.classList.toggle('scrolled', window.scrollY > 50)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* — carousel data — */
  const photos = [
    {
      src: '/assets/photos/american-bald-eagle-charcuterie-board-bottom-home-page.webp',
      title: 'Perfect for Any Occasion or Holiday',
      alt: 'American Bald Eagle Charcuterie Board',
    },
    {
      src: '/assets/photos/loggerhead-cay-sanibel-florida-charcuterie-board.webp',
      title: 'Commemorate Special Events',
      alt: 'Loggerhead Cay Charcuterie Board',
    },
    {
      src: '/assets/photos/blue-fox-crystals-cutting-board-steaks.webp',
      title: 'Blue Fox Crystals Board',
      alt: 'Blue Fox Crystals Cutting Board',
    },
    {
      src: '/assets/photos/wurst-family-charcuterie-board.webp',
      title: 'The Wurst Family Board',
      alt: 'Wurst Family Charcuterie Board',
    },
    {
      src: '/assets/photos/gift-basket-charcuterie-board.webp',
      title: 'Gourmet Gift Basket Board',
      alt: 'Gift Basket Charcuterie Board',
    },
  ]

  const emblaOptions: Partial<EmblaOptionsType> = {
    align: 'center',
    loop: true,
    containScroll: 'trimSnaps',
  }

  return (
    <>
      {/* ─── Hero ───────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.animationOverlay}>
          <HeroAnimation />
        </div>
      </section>

      {/* ─── Feature Grid ───────────────────────────────── */}
      <section className={styles.featureGrid}>
        {[
          {
            src: '/assets/photos/american-bald-eagle-charcuterie-board-bottom-home-page.webp',
            alt: 'Crafted in Florida',
            title: 'Crafted in Southwest Florida',
            desc: 'Custom Charcuterie Boards with soul from The Family Forge',
          },
          {
            src: '/assets/photos/blue-fox-crystals-cutting-board-3.webp',
            alt: 'Engraved Cutting Boards',
            title: 'Artisan Engraved Cutting Boards',
            desc: 'Elevate your culinary game with our custom laser boards',
          },
          {
            src: '/assets/photos/the-wurst-family-charcuterie-board-our-products-page.webp',
            alt: 'Personalized Boards',
            title: 'Personalized Charcuterie Boards',
            desc: 'Enhance your experience with one-of-a-kind pieces',
          },
        ].map((item, i) => (
          <div key={i} className={styles.card}>
            <img
              src={item.src}
              alt={item.alt}
              width={500}
              height={350}
              style={{ borderRadius: '5px', width: '100%', height: 'auto' }}
            />
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </section>

      {/* ─── Laser Feature ──────────────────────────────── */}
      <section className={styles.laserFeature}>
        <div className={styles.laserBackground}>
          <div className={styles.laserContent}>
            <img
              src="/assets/photos/charcuterie-board-oils.webp"
              alt="Board Oils"
              width={650}
              height={425}
              className={styles.oilImage}
            />
            <div className={styles.oilText}>
              <h2>Dedication to quality</h2>
              <p>
                At The Family Forge, we are dedicated to the quality of our handcrafted charcuterie
                boards. To ensure product safety and satisfaction, two brands of oil are applied in
                layers: Howard cutting board oil and John Taylor butcher block oil.
              </p>
              <p>These layers allow the board to repel water, be splinter‑proof, and safe to wash.</p>
              <p>
                Customers are our number one priority. If our services ever fall short, please
                contact us at{' '}
                <a href="mailto:contact@familyforgedesigns.com">
                  contact@familyforgedesigns.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Engraved your way ─────────────────────────── */}
      <section className={styles.engravingSection}>
        <div className={styles.engravingContent}>
          <div className={styles.engravingTextBlock}>
            <h2>Engraved your way</h2>
            <p>
              Welcome to our custom engraving haven, where your imagination meets our craftsmanship.
              Specializing in{' '}
              <a href="/products">laser‑engraved cutting &amp; charcuterie boards</a>, we transform
              wood into a personalized masterpiece.
            </p>
            <p>
              From monograms to quotes and images, our laser engraving process ensures precision and
              beauty. Share your idea and watch us bring it to life.
            </p>
          </div>
          <div className={styles.engravingImageBlock}>
            <div className={styles.engravingImageWrapper}>
              <img
                src="/assets/photos/laser-engraving-setup-1.webp"
                alt="Engraving Machine Setup"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '8px',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Carousel ───────────────────────────────────── */}
      <section className={styles.occasionSection}>
        <EmblaCarousel slides={photos} options={emblaOptions} />
      </section>
    </>
  )
}
