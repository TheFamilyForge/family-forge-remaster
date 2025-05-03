// src/app/contact-us/page.tsx
'use client';

import React, { useState, useEffect, FormEvent } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './contactus.module.css';

export default function ContactUsPage() {
  const router = useRouter();
  const [status, setStatus] = useState<'idle'|'sending'|'sent'|'error'>('idle');

  // scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // after successful send, redirect home after 5s
  useEffect(() => {
    if (status === 'sent') {
      const timer = setTimeout(() => router.push('/'), 5000);
      return () => clearTimeout(timer);
    }
  }, [status, router]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name:    formData.get('name')?.toString()    ?? '',
      email:   formData.get('email')?.toString()   ?? '',
      subject: formData.get('subject')?.toString() ?? '',
      message: formData.get('message')?.toString() ?? '',
    };

    try {
      const res = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
      });
      const json = await res.json();
      if (res.ok && json.ok) {
        form.reset();
        setStatus('sent');
      } else {
        throw new Error(json.error || 'Submission failed');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className={styles.page}>
      <main className={styles.container}>
        <div className={styles.formWrapper}>
          <Image
            src="/assets/icons/family-forge-logo-black.png"
            alt="Family Forge Logo"
            width={80}
            height={80}
            className={styles.logo}
          />
          <h2 className={styles.heading}>Email Us</h2>

          <form onSubmit={handleSubmit} className={styles.form}>
            <input name="name"    type="text"   placeholder="Name *"    required />
            <input name="email"   type="email"  placeholder="Email *"   required />
            <input name="subject" type="text"   placeholder="Subject *" required />
            <textarea name="message" placeholder="Your Message *" required />

            <button
              type="submit"
              className={styles.submitButton}
              disabled={status === 'sending'}
            >
              {status === 'sending' ? 'Sending…' : 'Send'}
            </button>
          </form>

          {status === 'sent' && (
            <p className={styles.feedback}>
              ✅ Thanks for reaching out!<br/>
              Redirecting you home in 5 seconds…
            </p>
          )}
          {status === 'error' && (
            <p className={styles.feedbackError}>
              ❌ Oops—something went wrong.<br/>
              Please try again or email us directly at <a href="mailto:contact@familyforgedesigns.com">contact@familyforgedesigns.com</a>.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
