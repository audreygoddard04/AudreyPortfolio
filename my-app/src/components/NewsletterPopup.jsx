"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import GoldFrame from "./GoldFrame";
import useNewsletterSignup, { subscribedKey } from "./useNewsletterSignup";
import styles from "./NewsletterPopup.module.css";
const seenKey = "keltner-newsletter-popup-seen";
export default function NewsletterPopup() {
  const pathname = usePathname();
  const dialog = useRef(null);
  const shown = useRef(false);
  const [open, setOpen] = useState(false);
  const { state, message, subscribe } = useNewsletterSignup();
  useEffect(() => {
    if (pathname.startsWith("/studio")) return;
    const onSubscribed = () => {
      shown.current = true;
    };
    const onScroll = () => {
      if (shown.current) return;
      try {
        if (
          sessionStorage.getItem(seenKey) ||
          localStorage.getItem(subscribedKey)
        )
          return;
      } catch {
        /* Use in-memory frequency control if storage is unavailable. */
      }
      const distance =
        document.documentElement.scrollHeight - window.innerHeight;
      if (distance <= 0 || window.scrollY / distance < 0.3) return;
      shown.current = true;
      try {
        sessionStorage.setItem(seenKey, "true");
      } catch {
        /* Optional persistence. */
      }
      setOpen(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keltner:subscribed", onSubscribed);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keltner:subscribed", onSubscribed);
    };
  }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const element = dialog.current;
    const previousOverflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);
  return (
    <dialog
      ref={dialog}
      className={styles.dialog}
      aria-labelledby="classics-title"
      aria-describedby="classics-description"
      onCancel={() => setOpen(false)}
      onClose={() => setOpen(false)}
      onClick={(event) => {
        if (event.target !== dialog.current) return;
        const bounds = dialog.current.getBoundingClientRect();
        if (
          event.clientX < bounds.left ||
          event.clientX > bounds.right ||
          event.clientY < bounds.top ||
          event.clientY > bounds.bottom
        )
          setOpen(false);
      }}
    >
      <form
        onSubmit={subscribe}
        className={styles.form}
        aria-busy={state === "pending"}
      >
        <GoldFrame artwork>
          <button
            type="button"
            className={styles.close}
            aria-label="Close newsletter popup"
            onClick={() => setOpen(false)}
            autoFocus
          >
            ×
          </button>
          <h2 id="classics-title" className={styles.srOnly}>
            Join KELTNER Classics
          </h2>
          <p id="classics-description" className={styles.srOnly}>
            Stay in the loop
          </p>
          <div className={`${styles.field} ${styles.nameField}`}>
            <label htmlFor="classics-name">
              <span className={styles.srOnly}>First Name</span>
            </label>
            <input
              id="classics-name"
              name="firstName"
              autoComplete="given-name"
              maxLength={80}
              disabled={state === "success"}
            />
          </div>
          <div className={`${styles.field} ${styles.emailField}`}>
            <label htmlFor="classics-email">
              <span className={styles.srOnly}>Email Address</span>
            </label>
            <input
              id="classics-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
              aria-describedby="classics-status"
              disabled={state === "success"}
            />
          </div>
        </GoldFrame>
        <div className={styles.actions}>
          <button
            type="submit"
            className={styles.subscribe}
            disabled={state === "pending" || state === "success"}
          >
            {state === "pending"
              ? "Subscribing…"
              : state === "success"
                ? "Subscribed"
                : "Join the list"}
          </button>
          <p id="classics-status" className={styles.status} role="status">
            {message || "Unsubscribe anytime."}
          </p>
        </div>
      </form>
    </dialog>
  );
}
