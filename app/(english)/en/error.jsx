"use client";
export default function ErrorPage({ reset }) {
  return (
    <main id="main-content" className="writing-shell">
      <h1>Unable to load this page</h1>
      <p>Please try again in a moment.</p>
      <button onClick={reset} className="btn-view-all">
        Try again
      </button>
    </main>
  );
}
