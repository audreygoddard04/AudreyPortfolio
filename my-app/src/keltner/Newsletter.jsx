"use client";
import { useId } from "react";
import useNewsletterSignup from "../components/useNewsletterSignup";
import styles from "./publication.module.css";
export default function Newsletter() {
  const id = useId();
  const { state, message, subscribe } = useNewsletterSignup();
  return (
    <section className={styles.newsletter} aria-labelledby={`${id}-title`}>
      <div>
        <p className={styles.eyebrow}>The occasional letter</p>
        <h2 id={`${id}-title`}>The KELTNER Newsletter</h2>
        <p>
          Stories, places, and things worth keeping, delivered to your inbox.
        </p>
      </div>
      <div className={styles.newsletterForm}>
        <form onSubmit={subscribe} aria-busy={state === "pending"}>
          <label className={styles.srOnly} htmlFor={`${id}-email`}>
            Your email address
          </label>
          <div className={styles.emailRow}>
            <input
              id={`${id}-email`}
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
              placeholder="Your email address"
              aria-describedby={`${id}-status`}
              disabled={state === "success"}
            />
            <button
              type="submit"
              disabled={state === "pending" || state === "success"}
            >
              {state === "pending"
                ? "Subscribing…"
                : state === "success"
                  ? "Subscribed"
                  : "Subscribe"}
            </button>
          </div>
          <p
            id={`${id}-status`}
            className={styles.formStatus}
            role="status"
            aria-live="polite"
          >
            {message ||
              "A little perspective, whenever you need it. Unsubscribe anytime."}
          </p>
        </form>
      </div>
    </section>
  );
}
