"use client";
import { useEffect, useRef, useState } from "react";
import { trackEvent } from "../lib/analytics.mjs";
export const successMessage = "Thank you, you'll stay caught up xx";
export const subscribedKey = "keltner-newsletter-subscribed";
export default function useNewsletterSignup({ location = "footer" } = {}) {
  const submission = useRef("idle");
  const [state, setState] = useState("idle");
  const [message, setMessage] = useState("");
  useEffect(() => {
    const showThanks = () => {
      submission.current = "success";
      setState("success");
      setMessage(successMessage);
    };
    try {
      if (localStorage.getItem(subscribedKey) === "true") showThanks();
    } catch {
      /* Storage is optional. */
    }
    const sync = (event) => {
      if (event.key === subscribedKey && event.newValue === "true")
        showThanks();
    };
    window.addEventListener("keltner:subscribed", showThanks);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("keltner:subscribed", showThanks);
      window.removeEventListener("storage", sync);
    };
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
      trackEvent("newsletter_signup", { signup_location: location });
      setMessage(successMessage);
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
