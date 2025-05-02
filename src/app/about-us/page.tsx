// src/app/about/page.tsx
'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import styles from './aboutus.module.css';

export default function AboutUsPage() {
  // ─── STATIC VIEWPORT HEIGHT ───────────────────────────────
  useEffect(() => {
    const setVh = () =>
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    setVh();
    window.addEventListener('orientationchange', setVh);
    return () => window.removeEventListener('orientationchange', setVh);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroOverlay}>
          <h1 className={styles.heroTitle}>About Us</h1>
        </div>
      </section>

      {/* Content Section */}
      <section className={styles.contentSection}>
        <div className={styles.textContainer}>
          <h2>Caleb and Declan</h2>
          <p>
            The Family Forge is a dynamic business based in Fort Myers, Florida, founded by Declan and Caleb Donnelly,
            twins who have called this place home since birth. As young entrepreneurs, they’ve always been drawn to the
            exciting worlds of technology, business, and community service.
          </p>
          <p>
            From a young age, Declan and Caleb have been tinkering with all things tech, from robots to 3D printers.
            Their adventure began with a laser engraver, initially a hobby, which quickly sparked into a thriving
            business opportunity. The brothers have a longstanding history of entrepreneurial spirit, previously selling
            3D prints to friends and colleagues. The Family Forge emerged from what was once a casual pastime to a
            successful enterprise, offering unique opportunities to many.
          </p>
          <p>
            Declan and Caleb are deeply committed to their community in Fort Myers. They dedicate much of their time to
            a local food bank and contribute a percentage of The Family Forge’s profits to a local military foundation.
            For them, the most rewarding aspect of their business is the chance to support local organizations,
            believing that this is where they can make the most significant impact.
          </p>
          <p>
            Contact us:<br />
            239-224-0553<br />
            239-224-8998
          </p>
          <p className={styles.footerText}>
            <em>
              At The Family Forge we accept cash, checks, Venmo, Apple Pay, and credit cards.
            </em>
          </p>
        </div>

        <div className={styles.imageContainer}>
          <img
            src="/assets/photos/caleb-and-declan.webp"
            alt="Caleb and Declan"
            className={styles.profileImage}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <Link href="/terms" className={styles.ctaButton}>
          Terms And Conditions
        </Link>
      </section>
    </>
  );
}
