import StudioClient from "../../../../components/studio-client";
export default function StudioPage() {
  if (
    !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
    !process.env.NEXT_PUBLIC_SANITY_DATASET
  ) {
    return (
      <main
        dir="rtl"
        style={{
          maxWidth: 700,
          margin: "80px auto",
          padding: 24,
          lineHeight: 1.9,
        }}
      >
        <h1>لوحة إدارة المشاريع جاهزة للربط</h1>
        <p>
          أنشئ مشروع Sanity، ثم أضف Project ID واسم Dataset إلى إعدادات المشروع
          وأعد النشر. اتبع الدليل SANITY_SETUP.md المرفق مع الكود.
        </p>
        <p>الموقع يعرض المشاريع الحالية حتى يتم توصيل حسابك.</p>
        <a
          href="https://www.sanity.io/manage"
          target="_blank"
          rel="noopener noreferrer"
        >
          فتح حساب Sanity
        </a>
        <br />
        <a href="/">العودة إلى الموقع</a>
      </main>
    );
  }
  return (
    <div
      id="sanity-root"
      style={{ height: "100dvh", width: "100%", overflow: "auto" }}
    >
      <StudioClient />
    </div>
  );
}
