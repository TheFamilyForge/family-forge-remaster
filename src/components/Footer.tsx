// src/components/Footer.tsx
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <a
        href="https://www.instagram.com/familyforge1/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="/assets/icons/ig-logo.webp"
          alt="Instagram"
          className={styles.instagramLogo}
        />
      </a>
      <p>© 2025 The Family Forge. All Rights Reserved.</p>
    </footer>
  );
}
