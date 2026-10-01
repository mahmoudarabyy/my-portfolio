import { getResumeContent } from "../../../lib/resume-content";
import { resumeIcons } from "../../../lib/resume-icons";
import SiteImage from "../../../components/site-image";
import "./resume.css";

export const metadata = {
  title: "سيرتي الذاتية",
  description: "خبرات محمود عربي في تصميم تجربة المستخدم وواجهات المنتجات الرقمية، وأدواته ومهاراته وأبرز أعماله.",
  alternates: { canonical: "/resume" },
};

const tools = [
  ["فيجما", "تصميم الواجهات والنماذج التفاعلية", "figma"],
  ["فيج جام", "الأفكار وخرائط تجربة المستخدم", "figma"],
  ["فوتوشوب", "معالجة الصور والتصميم البصري", "adobe-photoshop"],
  ["إليستريتور", "الرسوم والعناصر المتجهة", "adobe-illustrator"],
  ["بريمير برو", "تحرير الفيديو", "adobe-premiere"],
  ["أفتر إفكتس", "الحركة والمؤثرات البصرية", "adobe-after-effects"],
];
const skills = ["تصميم المنتجات", "أبحاث المستخدم", "مقابلات المستخدمين", "رحلات المستخدم", "هندسة المعلومات", "تدفقات الاستخدام", "اختبارات قابلية الاستخدام", "أنظمة التصميم", "تصميم الواجهات", "النماذج التفاعلية", "التصميم المتجاوب", "إمكانية الوصول"];

export const revalidate = 60;

export default async function ResumePage() {
  const { experiences, highlights } = await getResumeContent();
  return (
    <main id="main-content" className="resume-page">
      <header className="resume-intro">
        <SiteImage src="/about-ui-designer.png" width={611} height={611} sizes="144px" className="resume-portrait" alt="محمود عربي" preload />
        <h1>سيرتي الذاتية</h1>
        <a className="resume-pdf" href="https://arabyux.tabbio.com/" target="_blank" rel="noopener noreferrer">
          سيرتي PDF
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M12 3v12m-5-5 5 5 5-5M5 16v5h14v-5" /></svg>
        </a>
        <p>أنا محمود عربي، مصمم تجربة وواجهة مستخدم بخبرة أكثر من ٤ سنوات. أحوّل الأفكار والأنظمة المعقدة إلى تجارب رقمية واضحة وسهلة الاستخدام.</p>
      </header>

      <section className="resume-section" aria-labelledby="experience-title">
        <h2 id="experience-title">الخبرات العملية</h2>
        <div>{experiences.map((item, i) => <article className="resume-experience" key={item._key}>
          {item.iconUrl || resumeIcons[item.company?.trim()] ? (
            <SiteImage src={item.iconUrl || resumeIcons[item.company.trim()]} width={44} height={44} sizes="44px" className="resume-company-icon" alt="" />
          ) : <span className="resume-index" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>}
          <div><h3>{item.role} <span>— {item.company}</span></h3><p className="resume-date">{item.period}</p>{item.text && <p>{item.text}</p>}</div>
        </article>)}</div>
      </section>

      <section className="resume-section" aria-labelledby="tools-title">
        <h2 id="tools-title">أدوات أستخدمها في عملي</h2>
        <div className="resume-tools">{tools.map(([name, description, icon]) => <div className="resume-tool" key={name}>
          <span className="resume-tool-icon" aria-hidden="true"><SiteImage src={`/tool-icons/${icon}.svg`} width={32} height={32} sizes="32px" alt="" className="resume-tool-logo" /></span><div><h3>{name}</h3><p>{description}</p></div>
        </div>)}</div>
      </section>

      <section className="resume-section" aria-labelledby="skills-title">
        <h2 id="skills-title">المهارات</h2>
        <ul className="resume-skills">{skills.map(skill => <li key={skill}>{skill}</li>)}</ul>
      </section>

      <section className="resume-section" aria-labelledby="highlights-title">
        <h2 id="highlights-title">أبرز الأعمال والإنجازات</h2>
        <div className="resume-highlights">{highlights.map(item => <article key={item._key}><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
      </section>
    </main>
  );
}
