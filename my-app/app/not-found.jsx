import Link from "next/link";
export default function NotFound() {
  return (
    <main
      style={{
        maxWidth: 720,
        margin: "80px auto",
        padding: 24,
        fontFamily: "Georgia,serif",
      }}
    >
      <h1>Page not found</h1>
      <p>This page does not exist.</p>
      <Link href="/">Return to Audrey’s portfolio</Link>
    </main>
  );
}
