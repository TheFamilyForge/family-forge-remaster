'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  /* ─── PAGE CONTEXT ───────────────────────────── */
  const pathname      = usePathname();
  const onContactPage = pathname === '/contact-us';

  /* ─── UI STATE ──────────────────────────────── */
  const [menuOpen, setMenuOpen]  = useState(false);
  const [scrolled, setScrolled]  = useState(onContactPage);
  const [hidden,   setHidden]    = useState(false);   // auto‑hide header

  /* ─── SCROLL + STICKY + AUTO‑HIDE ───────────── */
  useEffect(() => {
    let lastY     = window.scrollY;
    let ticking   = false;
    const threshold = 25;  // px to trigger hide/reveal

    // reset state on page change
    if (onContactPage) {
      setScrolled(true);
      setHidden(false);
    } else {
      setScrolled(window.scrollY > 50);
      setHidden(false);
    }

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const y  = window.scrollY;
          const dy = y - lastY;

          // 1) sticky style after 50px (unless on contact page)
          if (!onContactPage) setScrolled(y > 50);

          // 2) auto‑hide / reveal (ignore on contact page & while menu is open)
          if (!onContactPage && !menuOpen) {
            if (dy > threshold && y > 80) setHidden(true);
            else if (dy < -threshold)    setHidden(false);
          }

          lastY   = y;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [menuOpen, onContactPage]);

  /* ─── BODY BLUR / SCROLL LOCK WHEN MENU OPEN ── */
  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    document.documentElement.style.overflowY = menuOpen ? 'hidden' : '';
    return () => {
      document.body.classList.remove('menu-open');
      document.documentElement.style.overflowY = '';
    };
  }, [menuOpen]);

  /* ─── HELPERS ───────────────────────────────── */
  const toggleMenu = () => setMenuOpen(o => !o);
  const closeMenu  = () => setMenuOpen(false);

  /* ─── RENDER ────────────────────────────────── */
  return (
    <>
      <header
        id="site-header"
        className={`site-header${scrolled ? ' scrolled' : ''}${hidden ? ' hide' : ''}${onContactPage ? ' no-shadow' : ''}`}
      >
        {/* left logo */}
        <Link href="/" className="siteLogo" onClick={closeMenu}>
          <Image
            src={scrolled
              ? '/assets/icons/family-forge-logo-black.png'
              : '/assets/icons/family-forge-logo.png'}
            alt="Family Forge Logo"
            width={40}
            height={40}
            priority
            className="logo"
          />
        </Link>

        {/* desktop nav */}
        <ul className="nav-menu">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/products">Products</Link></li>
          <li><Link href="/about-us">About&nbsp;Us</Link></li>
          <li><Link href="/contact-us">Contact&nbsp;Us</Link></li>
        </ul>

        {/* hamburger (right) */}
        <button
          className={`hamburger${menuOpen ? ' open' : ''}`}
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <span /><span /><span />
        </button>
      </header>

      {/* full‑screen overlay menu (mobile) */}
      <div
        className={`menu-overlay${menuOpen ? ' open' : ''}`}
        onClick={closeMenu}
      >
        <ul
          className="nav-menu mobile"
          onClick={(e) => e.stopPropagation()}
        >
          <li><Link href="/"          onClick={closeMenu}>Home</Link></li>
          <li><Link href="/products"  onClick={closeMenu}>Products</Link></li>
          <li><Link href="/about-us"  onClick={closeMenu}>About&nbsp;Us</Link></li>
          <li><Link href="/contact-us"onClick={closeMenu}>Contact&nbsp;Us</Link></li>
        </ul>
      </div>
    </>
  );
}
