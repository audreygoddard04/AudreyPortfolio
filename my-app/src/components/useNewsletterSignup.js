"use client";
import { useState } from "react";
export const subscribedKey = "keltner-newsletter-subscribed";
export default function useNewsletterSignup() {
  const [state, setState] = useState("idle");
  const [message, setMessage] = useState("");
  async function subscribe(event) {
    event.preventDefault();
    if (state === "pending" || state === "success") return;
    const form = event.currentTarget;
    const data = new FormData(form);
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
      if (!response.ok)
        throw new Error(
          result.error || "We couldn’t subscribe you. Please try again.",
        );
      setState("success");
      setMessage("Thank you. You’re on the list.");
      form.reset();
      try {
        localStorage.setItem(subscribedKey, "true");
      } catch {
        /* Storage can be disabled. */
      }
      window.dispatchEvent(new Event("keltner:subscribed"));
    } catch (error) {
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
