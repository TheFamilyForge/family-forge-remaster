// src/app/contact-us/page.tsx
'use client';

import React, { useState, useEffect, FormEvent } from 'react';
import Image from 'next/image';
import styles from './contactus.module.css';

export default function ContactUsPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  // ─── SCROLL TO TOP ON MOUNT ───────────────────────────────
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      name:    formData.get('name')?.toString()    || '',
      email:   formData.get('email')?.toString()   || '',
      subject: formData.get('subject')?.toString() || '',
      message: formData.get('message')?.toString() || '',
    };

    try {
      const res = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(data),
      });
      setStatus(res.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className={styles.page}>
      <main className={styles.container}>
        <div className={styles.formWrapper}>
          {/* Logo above the heading */}
          <Image
            src="/assets/icons/family-forge-logo-black.png"
            alt="Family Forge Logo"
            width={80}
            height={80}
            className={styles.logo}
          />

          <h2 className={styles.heading}>Email Us</h2>

          <form onSubmit={handleSubmit} className={styles.form}>
            <input name="name"    type="text"     placeholder="Name *"    required />
            <input name="email"   type="email"    placeholder="Email *"   required />
            <input name="subject" type="text"     placeholder="Subject *" required />
            <textarea name="message" placeholder="Your Message *" required />

            <button
              type="submit"
              className={styles.submitButton}
              disabled={status === 'sending'}
            >
              {status === 'sending' ? 'Sending…' : 'Send'}
            </button>
          </form>

          {status === 'sent'  && <p>✅ Message sent!</p>}
          {status === 'error' && <p>❌ Something went wrong.</p>}
        </div>
      </main>
    </div>
  );
}
