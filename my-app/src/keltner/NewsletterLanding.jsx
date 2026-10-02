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
            KELTNER <em>for you</em>
          </h1>
          <p>
            Stories, places, and things worth your time.
          </p>
        </header>
        <form
          onSubmit={subscribe}
          aria-busy={state === "pending"}
          className={styles.form}
        >
          {state !== "success" && (
            <>
              <NewsletterIdentity disabled={state === "success"} />
              <div className={styles.emailRow}>
                <label htmlFor={`${id}-email`}>
                  Email address
                  <input
                    id={`${id}-email`}
                    name="email"
                    type="email"
                    autoComplete="new-password"
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
            </>
          )}
          <p
            id={`${id}-status`}
            role="status"
            aria-live="polite"
            className={styles.status}
          >
            {message}
          </p>
        </form>
      </div>
      <img
        className={styles.hero}
        src="/keltner/italyBoat.png"
        alt="A wooden boat approaching a lakeside villa beneath the Italian mountains"
      />
    </section>
  );
}
