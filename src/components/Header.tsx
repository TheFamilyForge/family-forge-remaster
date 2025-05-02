// src/components/Header.tsx
'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const pathname = usePathname();
  const onContactPage = pathname === '/contact-us';

  const [isOpen, setIsOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(onContactPage);

  // 1) watch scroll for header styling
  useEffect(() => {
    if (onContactPage) {
      setScrolled(true);
      return;
    }
    setScrolled(false);
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [onContactPage]);

  // 2) blur background when menu is open (optional)
  useEffect(() => {
    document.body.classList.toggle('menu-open', isOpen);
    return () => document.body.classList.remove('menu-open');
  }, [isOpen]);

  const toggleMenu = () => setIsOpen((o) => !o);
  const closeMenu  = () => setIsOpen(false);

  return (
    <>
      <header
        className={`site-header ${scrolled ? 'scrolled' : ''} ${
          onContactPage ? 'no-shadow' : ''
        }`}
      >
        {/* logo */}
        <Link href="/">
          <Image
            src={
              scrolled
                ? '/assets/icons/family-forge-logo-black.png'
                : '/assets/icons/family-forge-logo.png'
            }
            alt="Family Forge Logo"
            width={scrolled ? 36 : 48}
            height={scrolled ? 36 : 48}
            className="logo"
          />
        </Link>

        {/* ► DESKTOP NAV (only shown on ≥769px) */}
        <ul className="nav-menu">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/products">Products</Link></li>
          <li><Link href="/about-us">About Us</Link></li>
          <li><Link href="/contact-us">Contact Us</Link></li>
        </ul>

        {/* ► MOBILE TOGGLE */}
        <button
          className={`hamburger ${isOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      {/* ► MOBILE FULL-SCREEN OVERLAY */}
      <div
        className={`menu-overlay ${isOpen ? 'open' : ''}`}
        onClick={closeMenu}
      >
        <ul
          className="nav-menu mobile"
          onClick={(e) => e.stopPropagation()}
        >
          <li><Link href="/" onClick={closeMenu}>Home</Link></li>
          <li><Link href="/products" onClick={closeMenu}>Products</Link></li>
          <li><Link href="/about-us" onClick={closeMenu}>About Us</Link></li>
          <li><Link href="/contact-us" onClick={closeMenu}>Contact Us</Link></li>
        </ul>
      </div>
    </>
  );
}
