import { useState } from "react";
import { useClient } from "sanity";
import { buildEnglishImportPlan } from "../lib/english-import-plan.mjs";

export default function ImportEnglish() {
  const client = useClient({ apiVersion: "2025-02-19" });
  const [busy, setBusy] = useState(false),
    [message, setMessage] = useState("");
  async function publishTranslations() {
    setBusy(true);
    setMessage("جاري مراجعة المحتوى والترجمات…");
    try {
      const docs = await client.fetch(
        '*[_type in ["project","article","faq","testimonial","resumeContent"]]',
        {},
        { perspective: "raw" },
      );
      const plan = buildEnglishImportPlan(docs);
      let transaction = client.transaction();
      for (const doc of plan.create)
        transaction = transaction.createIfNotExists(doc);
      for (const patch of plan.patches)
        transaction = transaction.patch(patch.id, (p) =>
          p.ifRevisionId(patch.ifRevisionID).set(patch.set),
        );
      await transaction.commit();
      setMessage(
        `تم نشر الترجمة الإنجليزية لـ ${plan.publishedCount} سجل. تم الحفاظ على النصوص العربية والصور والترتيب.${plan.skippedDrafts.length ? " تم ترك " + plan.skippedDrafts.length + " مسودة مختلفة دون تغيير." : ""}`,
      );
    } catch (error) {
      setMessage("لم يتم نشر الترجمة: " + error.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <div
      dir="rtl"
      style={{ padding: 32, maxWidth: 800, margin: "auto", lineHeight: 1.9 }}
    >
      <h1>نشر ترجمة المحتوى الحالي</h1>
      <p>
        ترجمة كاملة للمحتوى العربي المنشور: ٤ مشاريع، ٣ كتابات بأقسامها، ٥ أسئلة
        شائعة، ٣ آراء، والسيرة الذاتية الحالية.
      </p>
      <p>
        يضيف النصوص إلى حقول English ويفعّل ظهورها في النسخة الإنجليزية. الصور
        والفيديو والتواريخ والترتيب والنصوص العربية تظل محفوظة. الآراء التوضيحية
        تحتفظ بعلامتها الحالية.
      </p>
      <p>
        هذه ترجمة للمحتوى الحالي فقط، وليست ترجمة تلقائية للمشاريع الجديدة.
        يتوقف النشر إذا تغيّر المحتوى العربي، وتُحفظ المسودات المختلفة دون
        نشرها.
      </p>
      <button
        disabled={busy}
        onClick={publishTranslations}
        style={{ padding: "12px 24px", cursor: busy ? "wait" : "pointer" }}
      >
        {busy ? "جاري النشر…" : "نشر الترجمات الإنجليزية الحالية"}
      </button>
      <p role="status">{message}</p>
    </div>
  );
}
