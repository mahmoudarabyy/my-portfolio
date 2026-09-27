"use client";
export default function ErrorPage({ reset }) {
  return (
    <main id="main-content" className="status-page">
      <h1>تعذر تحميل المحتوى</h1>
      <p>حاول مرة أخرى بعد قليل.</p>
      <button type="button" className="btn-view-all" onClick={reset}>
        إعادة المحاولة
      </button>
    </main>
  );
}
