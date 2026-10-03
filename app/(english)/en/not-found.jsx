import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main-content" className="writing-shell">
      <h1>Page not available</h1>
      <p>This page may not have an English translation yet.</p>
      <Link href="/en" className="btn-view-all">
        Back to home
      </Link>
    </main>
  );
}
