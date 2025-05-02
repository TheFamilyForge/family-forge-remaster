// src/components/HeroAnimation.tsx
'use client';

import { useRef, useEffect } from 'react';
import styles from '../app/home.module.css'; // adjust the import path if needed

export default function HeroAnimation() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current!;
    v.muted = true;
    v.playsInline = true;
    v.loop = false;
    v.play().catch(() => {});
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      playsInline
      loop={false}
      className={styles.heroAnimation}
    >
      {/* desktop source, only used when viewport ≥769px */}
      <source
        src="/assets/hero/hero-animation-desktop-complete.mp4"
        type="video/mp4"
        media="(min-width: 769px)"
      />

      {/* mobile source, only used when viewport ≤768px */}
      <source
        src="/assets/hero/hero-animation-mobile-complete_2.mp4"
        type="video/mp4"
        media="(max-width: 768px)"
      />

      {/* ultimate fallback text */}
      Your browser does not support this video.
    </video>
  );
}
