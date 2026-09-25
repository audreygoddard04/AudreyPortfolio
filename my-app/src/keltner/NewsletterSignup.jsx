'use client';

import { useId, useRef, useState } from 'react';
import styles from './newsletter.module.css';

export default function NewsletterSignup({ compact = false, headingLevel = 'h2' }) {
  const id = useId();
  const busy = useRef(false);
  const [state, setState] = useState('idle');
  const [error, setError] = useState('');
  const Heading = headingLevel;

  async function subscribe(event) {
    event.preventDefault();
    if (busy.current) return;
    busy.current = true;
    const values = new FormData(event.currentTarget);
    setState('loading');
    setError('');
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 20_000);
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: values.get('email'), website: values.get('website') }),
        signal: controller.signal,
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || !result?.success) throw new Error(result?.error || 'Unable to subscribe right now. Please try again.');
      setState('success');
    } catch (problem) {
      setError(problem.name === 'AbortError' ? 'The request took too long. Please try again.' : problem.message || 'Unable to connect. Please try again.');
      setState('error');
    } finally {
      clearTimeout(timer);
      busy.current = false;
    }
  }

  return (
    <section className={`${styles.signup} ${compact ? styles.compact : ''}`} aria-labelledby={`${id}-title`}>
      <Heading id={`${id}-title`}>The KELTNER Newsletter</Heading>
      <p id={`${id}-description`}>Stories, places, and things worth keeping, delivered to your inbox.</p>
      <form onSubmit={subscribe} aria-describedby={`${id}-description`} aria-busy={state === 'loading'}>
        <label htmlFor={`${id}-email`}>Email address</label>
        <div className={styles.fields}>
          <input id={`${id}-email`} name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@example.com" aria-describedby={`${id}-feedback`} disabled={state === 'loading' || state === 'success'} />
          <button type="submit" disabled={state === 'loading' || state === 'success'}>{state === 'loading' ? 'Subscribing…' : 'Subscribe'}</button>
        </div>
        <div className={styles.trap} aria-hidden="true">
          <label htmlFor={`${id}-website`}>Leave this field empty</label>
          <input id={`${id}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
        <p className={styles.consent}>By subscribing, you agree to receive the KELTNER newsletter. Unsubscribe at any time.</p>
        <p id={`${id}-feedback`} className={styles.feedback} role="status" aria-live="polite" aria-atomic="true">{state === 'success' ? "You're on the list." : state === 'error' ? error : ''}</p>
      </form>
    </section>
  );
}
