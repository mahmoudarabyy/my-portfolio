import "server-only";
import { cache } from "react";

const faqs = [
  {
    _id: "duration",
    question: "ما المدة المناسبة لتنفيذ مشروعي؟",
    answer:
      "المدة تعتمد على عدد الشاشات وحجم البحث والتفاصيل المطلوبة. نحدد الجدول الزمني بعد فهم الفكرة والاتفاق على نطاق العمل.",
  },
  {
    _id: "existing",
    question: "هل يمكن تطوير تصميم موجود بالفعل؟",
    answer:
      "نبدأ بمراجعة التجربة الحالية وتحديد ما يحتاج إلى تحسين، مع مراعاة الهوية البصرية والأجزاء التي تعمل جيدًا.",
  },
  {
    _id: "process",
    question: "كيف تبدأ رحلة التصميم؟",
    answer:
      "بفهم أهداف المنتج واحتياجات مستخدميه، ثم ترتيب الرحلات والشاشات قبل الانتقال إلى التفاصيل البصرية ومراجعتها معك.",
  },
  {
    _id: "handoff",
    question: "ماذا يحدث بعد الانتهاء من التصميم؟",
    answer:
      "نتفق من البداية على ملفات التسليم والتوثيق المطلوب، وأي مساعدة يحتاجها فريق التطوير أو تعديلات لاحقة.",
  },
  {
    _id: "privacy",
    question: "كيف نتفق على السرية وحقوق الملفات؟",
    answer:
      "نوضح شروط استخدام الملفات وملكية المخرجات وإمكانية عرض العمل في معرض المشاريع ضمن اتفاق المشروع، قبل البدء.",
  },
];
const testimonials = [
  {
    _id: "demo-1",
    name: "أحمد محمد",
    role: "صاحب منتج رقمي",
    quote:
      "التجربة أصبحت أوضح، والوصول للخطوات الأساسية أسهل. أعجبني الاهتمام بالتفاصيل وترتيب الأفكار أثناء العمل.",
    sample: true,
  },
  {
    _id: "demo-2",
    name: "سارة علي",
    role: "مديرة مشروع",
    quote:
      "تحولت الأفكار الأولية إلى شاشات منظمة وسهلة الفهم، مع مساحة لمناقشة الملاحظات وتطوير الحل خطوة بخطوة.",
    sample: true,
  },
  {
    _id: "demo-3",
    name: "عمر خالد",
    role: "مؤسس شركة ناشئة",
    quote:
      "أكثر ما أعجبني هو الربط بين شكل الواجهة واحتياجات المستخدم، والوضوح في عرض القرارات التصميمية.",
    sample: true,
  },
];
export const getHomeContent = cache(async () => {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  if (!projectId && !dataset) return { faqs, testimonials };
  if (
    !/^[a-z0-9]+$/.test(projectId || "") ||
    !/^[a-z0-9_-]+$/.test(dataset || "")
  )
    throw new Error("Invalid Sanity configuration");
  const query =
    '{"faqs": *[_type == "faq"] | order(order asc, _createdAt asc) {_id, question, answer}, "testimonials": *[_type == "testimonial"] | order(order asc, _createdAt asc) {_id, name, role, quote, rating, sample}}';
  const response = await fetch(
    `https://${projectId}.api.sanity.io/v2025-02-19/data/query/${dataset}?${new URLSearchParams({ query, perspective: "published" })}`,
    {
      next: { revalidate: 60, tags: ["home-content"] },
      signal: AbortSignal.timeout(10000),
    },
  );
  if (!response.ok)
    throw new Error(`Unable to load home content (${response.status})`);
  const { result } = await response.json();
  return {
    faqs: result.faqs.length ? result.faqs : faqs,
    testimonials: result.testimonials.length
      ? result.testimonials
      : testimonials,
  };
});
