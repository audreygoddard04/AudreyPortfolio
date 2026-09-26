"use client";
import { useId } from "react";
import useNewsletterSignup from "./useNewsletterSignup";
import styles from "./FooterNewsletter.module.css";

export default function FooterNewsletter() {
  const id = useId();
  const { state, message, subscribe } = useNewsletterSignup();
  return (
    <section className={styles.signup} aria-labelledby={`${id}-title`}>
      <h3 id={`${id}-title`}>The KELTNER Newsletter</h3>
      <form onSubmit={subscribe} aria-busy={state === "pending"}>
        <label className={styles.label} htmlFor={`${id}-email`}>Email address</label>
        <div className={styles.row}>
          <input id={`${id}-email`} name="email" type="email" autoComplete="email"
            placeholder="Your email address" maxLength={254} required
            disabled={state === "success"} aria-describedby={`${id}-status`} />
          <button type="submit" disabled={state === "pending" || state === "success"}>
            {state === "pending" ? "Joining…" : state === "success" ? "Subscribed" : "Subscribe"}
          </button>
        </div>
        <p id={`${id}-status`} role="status" aria-live="polite">
          {message || "The occasional letter. Unsubscribe anytime."}
        </p>
      </form>
    </section>
  );
}
