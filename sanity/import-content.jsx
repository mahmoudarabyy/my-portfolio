import { useState } from "react";
import { useClient } from "sanity";
import { sampleArticles } from "../lib/sample-articles";
import { faqs, testimonials } from "../lib/home-defaults";
import { resumeDefaults } from "../lib/resume-defaults";
import { resumeIcons } from "../lib/resume-icons";

export default function ImportContent() {
  const client = useClient({ apiVersion: "2025-02-19" });
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  async function importContent() {
    setBusy(true);
    setMessage("جاري قراءة المحتوى الموجود…");
    try {
      const existing = await client.fetch('*[_type in ["article", "faq", "testimonial", "resumeContent"]]{_id,_type,slug,question,name} ', {}, { perspective: "raw" });
      const ids = new Set(existing.map(doc => doc._id.replace(/^drafts\./, "")));
      const uploaded = new Map();
      async function asset(src, kind = "file") {
        const key = kind + src;
        if (uploaded.has(key)) return uploaded.get(key);
        const response = await fetch(src);
        if (!response.ok) throw new Error("تعذر تحميل الصورة: " + src);
        const doc = await client.assets.upload(kind, await response.blob(), { filename: src.split("/").pop() });
        const value = { _type: kind, asset: { _type: "reference", _ref: doc._id } };
        uploaded.set(key, value);
        return value;
      }
      const docs = [];
      for (const article of sampleArticles) {
        const id = `article-${article.id}`;
        if (ids.has(id) || existing.some(doc => doc._type === "article" && doc.slug?.current === article.id)) continue;
        const { id: slug, sample, cover, sections, ...fields } = article;
        setMessage("جاري تجهيز الكتابات والصور…");
        const importedSections = [];
        for (const section of sections) importedSections.push({ ...section, _type: "articleSection", media: section.media ? await asset(section.media) : undefined });
        docs.push({ ...fields, _id: id, _type: "article", slug: { _type: "slug", current: slug }, cover: await asset(cover), sections: importedSections });
      }
      faqs.forEach((item, order) => {
        const id = `faq-${item._id}`;
        if (!ids.has(id) && !existing.some(doc => doc._type === "faq" && doc.question === item.question))
          docs.push({ ...item, _id: id, _type: "faq", order });
      });
      testimonials.forEach((item, order) => {
        const id = `testimonial-${item._id}`;
        if (!ids.has(id) && !existing.some(doc => doc._type === "testimonial" && doc.name === item.name))
          docs.push({ ...item, _id: id, _type: "testimonial", order, rating: 5 });
      });
      if (!ids.has("resume-content")) {
        const experiences = [];
        for (const item of resumeDefaults.experiences) experiences.push({ ...item, icon: resumeIcons[item.company] ? await asset(resumeIcons[item.company], "image") : undefined });
        docs.push({ ...resumeDefaults, experiences, _id: "resume-content", _type: "resumeContent" });
      }
      let transaction = client.transaction();
      docs.forEach(doc => { transaction = transaction.createIfNotExists(doc); });
      transaction = transaction.createIfNotExists({ _id: "portfolio-content-import-v1", _type: "contentImport", completed: true });
      await transaction.commit();
      setMessage(`تم الاستيراد: ${docs.length} سجل جديد. افتح إدارة المحتوى لتعديل الكتابات والأسئلة والآراء والسيرة. تم الحفاظ على السجلات الموجودة.`);
    } catch (error) {
      setMessage("لم يكتمل الاستيراد. يمكنك إعادة المحاولة بدون تكرار السجلات. " + error.message);
    } finally { setBusy(false); }
  }
  return <div dir="rtl" style={{ padding: 32, maxWidth: 760, margin: "auto", lineHeight: 1.9 }}>
    <h1>استيراد محتوى الموقع الحالي</h1>
    <p>ينقل الكتابات بصورها وأقسامها، والأسئلة الشائعة، وآراء العملاء الحالية، والسيرة الذاتية إلى لوحة التحكم. السجلات الموجودة وتعديلاتك عليها لن تُستبدل.</p>
    <p>آراء العملاء الحالية نماذج توضيحية كما هي في الموقع، وستظل معلّمة كنماذج في الإدارة.</p>
    <button type="button" disabled={busy} onClick={importContent} style={{ padding: "12px 24px", cursor: busy ? "wait" : "pointer" }}>{busy ? "جاري الاستيراد…" : "استيراد المحتوى الحالي"}</button>
    <p role="status">{message}</p>
  </div>;
}
