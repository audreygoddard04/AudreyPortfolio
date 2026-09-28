"use client";
import { useId } from "react";
import NewsletterIdentity from "../components/NewsletterIdentity";
import useNewsletterSignup from "../components/useNewsletterSignup";
import styles from "./NewsletterLanding.module.css";
export default function NewsletterLanding() {
  const id = useId();
  const { state, message, subscribe } = useNewsletterSignup({
    location: "newsletter_page",
  });
  return (
    <section className={styles.page}>
      <div className={styles.editorial}>
        <header>
          <h1>
            KELTNER <em>with you</em>
          </h1>
          <p>
            Stories, places, and things worth keeping, delivered to your inbox.
          </p>
        </header>
        <form
          onSubmit={subscribe}
          aria-busy={state === "pending"}
          className={styles.form}
        >
          <NewsletterIdentity disabled={state === "success"} />
          <div className={styles.emailRow}>
            <label htmlFor={`${id}-email`}>
              Email address
              <input
                id={`${id}-email`}
                name="email"
                type="email"
                autoComplete="email"
                maxLength={254}
                required
                disabled={state === "success"}
                aria-describedby={`${id}-status`}
              />
            </label>
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
          <p className={styles.note}>
            By subscribing, you agree to receive the KELTNER newsletter.
          </p>
          <p
            id={`${id}-status`}
            role="status"
            aria-live="polite"
            className={styles.status}
          >
            {message}
          </p>
        </form>
        <img
          className={styles.detail}
          src="/keltner/beautiful-estate-cover.png"
          alt="An elegant estate framed by garden greenery"
        />
      </div>
      <img
        className={styles.hero}
        src="/keltner/lake-como.png"
        alt="Lakeside architecture and gardens at Lake Como"
      />
    </section>
  );
}
