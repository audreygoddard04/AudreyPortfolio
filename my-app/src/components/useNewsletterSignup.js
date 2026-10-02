"use client";
import { useEffect, useRef, useState } from "react";
import { trackEvent } from "../lib/analytics.mjs";
export const successMessage = "Thank you kindly, you'll stay caught up";
export const alreadySubscribedMessage =
  "You're already signed up for the KELTNER newsletter. Keep an eye on your inbox for your next read.";
export const subscribedKey = "keltner-newsletter-subscribed";
export default function useNewsletterSignup({ location = "footer" } = {}) {
  const submission = useRef("idle");
  const [state, setState] = useState("idle");
  const [message, setMessage] = useState("");
  useEffect(() => {
    const showThanks = (event) => {
      submission.current = "success";
      setState("success");
      setMessage(
        event.detail?.alreadySubscribed
          ? alreadySubscribedMessage
          : successMessage,
      );
    };
    // Confirmation is temporary. Every full reload starts with a fresh form.
    // The stored flag is used only to suppress the automatic popup.
    window.addEventListener("keltner:subscribed", showThanks);
    return () => window.removeEventListener("keltner:subscribed", showThanks);
  }, []);
  async function subscribe(event) {
    event.preventDefault();
    if (submission.current === "pending" || submission.current === "success")
      return;
    const form = event.currentTarget;
    const data = new FormData(form);
    submission.current = "pending";
    setState("pending");
    setMessage("");
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.get("email"),
          firstName: data.get("firstName"),
          lastName: data.get("lastName"),
          gender: data.get("gender"),
        }),
      });
      const result = await response.json();
      if (!response.ok || result?.success !== true)
        throw new Error(
          result?.error || "We couldn’t subscribe you. Please try again.",
        );
      submission.current = "success";
      setState("success");
      if (!result.alreadySubscribed)
        trackEvent("newsletter_signup", { signup_location: location });
      setMessage(
        result.alreadySubscribed ? alreadySubscribedMessage : successMessage,
      );
      form.reset();
      try {
        localStorage.setItem(subscribedKey, "true");
      } catch {
        /* Storage can be disabled. */
      }
      window.dispatchEvent(
        new CustomEvent("keltner:subscribed", {
          detail: { alreadySubscribed: result.alreadySubscribed === true },
        }),
      );
    } catch (error) {
      submission.current = "idle";
      setState("error");
      setMessage(
        error instanceof TypeError
          ? "We couldn’t connect. Please try again."
          : error.message,
      );
    }
  }
  return { state, message, subscribe };
}
