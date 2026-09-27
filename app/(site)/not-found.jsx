import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main-content" className="status-page">
      <h1>الصفحة غير موجودة</h1>
      <p>قد يكون الرابط تغير أو المشروع غير منشور حاليًا.</p>
      <Link href="/projects" className="btn-view-all">
        عرض المشاريع
      </Link>
    </main>
  );
}
