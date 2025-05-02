// src/components/Footer.tsx
import Image from 'next/image'              // ← replaces the <img> tag
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <a
        href="https://www.instagram.com/familyforge1/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src="/assets/icons/ig-logo.webp"
          alt="Instagram"
          width={50}         /* use your logo’s real pixel size */
          height={55}
          className={styles.instagramLogo}
          priority={false}   /* footer is below the fold */
        />
      </a>
      <p>© 2025 The Family Forge. All rights reserved.</p>
    </footer>
  )
}
