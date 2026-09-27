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
          أضف مشاريعك وصورها وانشرها من هنا بدون تعديل الكود، بعد ربط حسابك مرة
          واحدة.
        </p>
        <ol>
          <li>افتح Sanity وسجّل الدخول، ثم أنشئ مشروعًا باسم البورتفوليو.</li>
          <li>
            أنشئ Dataset باسم <code>production</code> واختر Public للمحتوى
            المنشور على الموقع.
          </li>
          <li>انسخ Project ID واسم Dataset لإكمال الربط.</li>
          <li>
            من API ثم CORS Origins أضف <code>http://127.0.0.1:3111</code> ورابط
            موقعك، مع Allow credentials.
          </li>
        </ol>
        <p>
          بعد الربط ستجد خانات للاسم، والكارت، ونصوص دراسة الحالة، وصورة كل قسم،
          ومعرض الصور. استخدم Publish للنشر وUnpublish للإخفاء.
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
