'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <header className="site-header">
      <Link href="/">
        <Image
          src="/assets/icons/family-forge-logo.png"
          alt="Family Forge Logo"
          width={48}
          height={48}
          className="logo"
        />
      </Link>

      <button className="hamburger" onClick={toggleMenu} aria-label="Menu">
        <span />
        <span />
        <span />
      </button>

      <ul className={`nav-menu ${isOpen ? 'open' : ''}`}>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/products">Products</Link></li>
        <li><Link href="/about-us">About Us</Link></li>
        <li><Link href="/contact-us">Contact Us</Link></li>
      </ul>
    </header>
  );
}
