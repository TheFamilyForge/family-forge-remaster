// src/app/page.tsx
'use client';

import React, { useEffect } from 'react';
import HeroAnimation from '@components/HeroAnimation';
import EmblaCarousel from '@components/carousel/EmblaCarousel';
import styles from './home.module.css';
import type { EmblaOptionsType } from 'embla-carousel';

export default function Home() {
  // ─── 1) STATIC VIEWPORT HEIGHT ──────────────────────────────
  useEffect(() => {
    const setVh = () =>
      document.documentElement.style.setProperty(
        '--vh',
        `${window.innerHeight * 0.01}px`
      );
    setVh();
    window.addEventListener('orientationchange', setVh);
    return () => window.removeEventListener('orientationchange', setVh);
  }, []);

  // ─── 2) THROTTLED SCROLL FOR HEADER ─────────────────────────
  useEffect(() => {
    const header = document.querySelector('.site-header');
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          header?.classList.toggle('scrolled', window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ─── 3) YOUR PHOTOS & EMBLA OPTIONS ─────────────────────────
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
  ];

  const emblaOptions: Partial<EmblaOptionsType> = {
    align: 'center',
    loop: true,
    containScroll: 'trimSnaps',
  };

  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.animationOverlay}>
          <HeroAnimation />
        </div>
        <div className={styles.overlay}>
          <img
            src="/assets/hero/hero-title.png"
            alt="The Family Forge Title"
            className={styles.heroTitleImage}
          />
        </div>
      </section>

      {/* Feature Grid */}
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
            <img src={item.src} alt={item.alt} />
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </section>

      {/* Dedication to quality */}
      <section className={styles.laserFeature}>
        <div className={styles.laserBackground}>
          <div className={styles.laserContent}>
            <img
              src="/assets/photos/charcuterie-board-oils.webp"
              alt="Board Oils"
              className={styles.oilImage}
            />
            <div className={styles.oilText}>
              <h2>Dedication to quality</h2>
              <p>
                At The Family Forge, we are dedicated to the quality of our
                handcrafted charcuterie boards. To ensure product safety and
                satisfaction, two brands of oil are applied in layers: Howard
                cutting board oil and John Taylor butcher block oil.
              </p>
              <p>
                These layers allow the board to repel water, be splinter-proof,
                and safe to wash.
              </p>
              <p>
                Customers are our number one priority. If our services ever
                fall short, please contact us at{' '}
                <a href="mailto:familyforge91@gmail.com">
                  familyforge91@gmail.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Engraved your way */}
      <section className={styles.engravingSection}>
        <div className={styles.engravingContent}>
          <div className={styles.engravingTextBlock}>
            <h2>Engraved your way</h2>
            <p>
              Welcome to our custom engraving haven, where your imagination
              meets our craftsmanship. Specializing in{' '}
              <a href="/products">
                laser-engraved cutting & charcuterie boards
              </a>
              , we transform wood into a personalized masterpiece.
            </p>
            <p>
              From monograms to quotes and images, our laser engraving process
              ensures precision and beauty. Share your idea and watch us bring
              it to life.
            </p>
          </div>
          <div className={styles.engravingImageBlock}>
            <img
              src="/assets/photos/laser-engraving-setup-1.webp"
              alt="Engraving Machine Setup"
              className={styles.engravingImage}
            />
          </div>
        </div>
      </section>

      {/* ▶️ Special Occasions Carousel */}
      <section className={styles.occasionSection}>
        <EmblaCarousel slides={photos} options={emblaOptions} />
      </section>
    </>
  );
}
