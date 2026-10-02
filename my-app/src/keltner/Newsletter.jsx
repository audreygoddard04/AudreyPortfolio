"use client";
import { usePathname } from "next/navigation";
import { newsletterLocation } from "../lib/analytics.mjs";
import { useId } from "react";
import useNewsletterSignup from "../components/useNewsletterSignup";
import NewsletterIdentity from "../components/NewsletterIdentity";
import styles from "./publication.module.css";
export default function Newsletter({ location } = {}) {
  const id = useId();
  const pathname = usePathname();
  const { state, message, subscribe } = useNewsletterSignup({
    location: location || newsletterLocation(pathname),
  });
  if (["/keltner/newsletter", "/newsletter"].includes(pathname)) return null;
  return (
    <section className={styles.newsletter} aria-labelledby={`${id}-title`}>
      <div>
        <h2 id={`${id}-title`}>KELTNER <em>for you</em></h2>
        <p>
          Stories, places, and things worth your time.
        </p>
      </div>
      <div className={styles.newsletterForm}>
        <form onSubmit={subscribe} aria-busy={state === "pending"}>
          {state !== "success" && (
            <>
              <NewsletterIdentity disabled={state === "success"} />
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
            </>
          )}
          <p
            id={`${id}-status`}
            className={styles.formStatus}
            role="status"
            aria-live="polite"
          >
            {message}
          </p>
        </form>
      </div>
    </section>
  );
}
