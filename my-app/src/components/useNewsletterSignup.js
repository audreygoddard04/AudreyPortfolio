"use client";
import { useRef, useState } from "react";
import { trackEvent } from "../lib/analytics.mjs";
export const subscribedKey = "keltner-newsletter-subscribed";
export default function useNewsletterSignup({ location = "footer" } = {}) {
  const submission = useRef("idle");
  const [state, setState] = useState("idle");
  const [message, setMessage] = useState("");
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
          ...(data.get("firstName")
            ? { firstName: data.get("firstName") }
            : {}),
        }),
      });
      const result = await response.json();
      if (!response.ok || result?.success !== true)
        throw new Error(
          result?.error || "We couldn’t subscribe you. Please try again.",
        );
      submission.current = "success";
      setState("success");
      trackEvent("newsletter_signup", { signup_location: location });
      setMessage("Thank you. You’re on the list.");
      form.reset();
      try {
        localStorage.setItem(subscribedKey, "true");
      } catch {
        /* Storage can be disabled. */
      }
      window.dispatchEvent(new Event("keltner:subscribed"));
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
