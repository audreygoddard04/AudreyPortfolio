"use client";
export default function PublicationError({ reset }) {
  return (
    <section style={{ padding: "60px 0" }}>
      <h1>The journal is temporarily unavailable.</h1>
      <p>Please try again shortly.</p>
      <button onClick={() => reset()}>Try again</button>
    </section>
  );
}
