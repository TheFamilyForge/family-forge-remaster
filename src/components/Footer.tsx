// src/components/Footer.tsx
import Image from 'next/image'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <a
        href="https://www.instagram.com/familyforge1/"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.instaLink}
      >
        <Image
          src="/assets/icons/ig-logo.webp"
          alt="Instagram"
          width={50}                   // fixed square container
          height={50}
          style={{ objectFit: 'contain' }}
          priority={false}             // footer is below the fold
        />
      </a>
      <p className={styles.footerText}>
        © 2025 The Family Forge. All rights reserved.
      </p>
    </footer>
  )
}
