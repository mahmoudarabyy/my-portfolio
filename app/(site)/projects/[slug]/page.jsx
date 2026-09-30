import { notFound } from "next/navigation";
import {
  getProject,
  getProjects,
  isSanityConfigured,
} from "../../../../lib/projects";
import SiteImage from "../../../../components/site-image";
import CaseGallery from "../../../../components/case-gallery";
import { getCaseStudy } from "../../../../lib/case-study.mjs";
import { contactEmail } from "../../../../lib/site";
import "./case-study.css";

import ProjectIcon from "../../../../components/project-icon";
import ProjectLinks from "../../../../components/project-links";
import ProjectCard from "../../../../components/project-card";
import Reveal from "../../../../components/reveal";

export const revalidate = 60;
export async function generateStaticParams() {
  return isSanityConfigured
    ? []
    : (await getProjects()).map((project) => ({ slug: project.id }));
}
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();
  const shareImage =
    [project.coverImage, project.cardImage].find(
      (src) => src && !/\.(mp4|webm)(?:[?#]|$)/i.test(src),
    ) || "/project-placeholder.svg";
  return {
    title: project.mainTitle,
    description: project.summary,
    alternates: { canonical: `/projects/${project.id}` },
    openGraph: {
      title: project.mainTitle,
      description: project.summary,
      images: [{ url: shareImage, alt: project.mainTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: project.mainTitle,
      description: project.summary,
      images: [shareImage],
    },
  };
}
function ReadMore({ text }) {
  if (!text) return null;
  return (
    <details className="study-more">
      <summary>
        <span className="more-open">اقرأ المزيد</span>
        <span className="more-close">عرض أقل</span>
        <span aria-hidden="true">＋</span>
      </summary>
      <p>{text}</p>
    </details>
  );
}
function Media({ src, title, cover = false }) {
  if (!src) return null;
  return (
    <Reveal className={`study-media ${cover ? "study-cover" : ""}`}>
      <SiteImage
        src={src}
        alt={title}
        sizes={cover ? "100vw" : "(max-width: 1200px) 100vw, 1120px"}
        preload={cover}
      />
    </Reveal>
  );
}
function Editorial({ label, title, children, id, className = "" }) {
  return (
    <section id={id} className={`study-editorial ${className}`}>
      {label && <p className="study-label">{label}</p>}
      <Reveal className="study-editorial-body">
        {title && <h2>{title}</h2>}
        {children}
      </Reveal>
    </section>
  );
}
export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();
  const projects = await getProjects();
  const study = getCaseStudy(project);
  const related = projects.filter((item) => item.id !== project.id).slice(0, 3);
  const roadmap = [
    {
      title: "البحث والاستكشاف",
      items: [
        "فهم المشكلة والمستخدم",
        "مراجعة التجارب المشابهة",
        "تحديد الأولويات",
      ],
    },
    {
      title: "تجربة المستخدم",
      items: ["تنظيم المحتوى", "تدفقات الاستخدام", "تصور الشاشات"],
    },
    {
      title: "تصميم الواجهات",
      items: ["الاتجاه البصري", "تفاصيل التفاعل", "عرض التصميم النهائي"],
    },
  ];
  return (
    <main id="main-content" className="project-study">
      <header className="study-hero study-shell">
        <Reveal className="study-heading">
          <ProjectIcon project={project} large />
          <h1>{project.mainTitle}</h1>
          <ProjectLinks project={project} />
        </Reveal>
        <dl className="study-hero-meta">
          {[
            ["المجال", project.field],
            [
              "الفترة",
              [project.year, project.timeline].filter(Boolean).join(" · "),
            ],
            ["العميل", project.client],
          ]
            .filter(([, value]) => value)
            .map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          {study.awards.length > 0 && (
            <div>
              <dt>الجوائز</dt>
              <dd>{study.awards.map((award) => award.title).join(" · ")}</dd>
            </div>
          )}
        </dl>
      </header>

      <div className="study-shell">
        <Media
          src={project.coverImage}
          title={`${project.mainTitle} — غلاف المشروع`}
          cover
        />
      </div>

      <div className="study-shell">
        <section
          className="study-editorial study-overview"
          aria-label="نطاق المشروع"
        >
          <div className="study-overview-grid">
            <div>
              <p className="study-label">الخدمات</p>
              <p>{project.role || "تصميم تجربة وواجهة المستخدم"}</p>
            </div>
            <div>
              <p className="study-label">نطاق المشروع</p>
              <div className="study-tags">
                {project.categories.map((category) => (
                  <span key={category}>
                    {{
                      mobile: "تطبيق جوال",
                      web: "موقع إلكتروني",
                      dashboard: "لوحة تحكم",
                      gov: "خدمات حكومية",
                    }[category] || category}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
        {study.awards.length > 0 && (
          <Editorial label="التقدير والجوائز" className="study-awards">
            {study.awards.map((award, i) => (
              <div key={i}>
                <h3>{award.title}</h3>
                {award.description && <p>{award.description}</p>}
              </div>
            ))}
          </Editorial>
        )}

        <Editorial title="عن المشروع" id="overview" className="study-about">
          <p className="study-summary">{project.summary}</p>
        </Editorial>
        <Media
          src={project.aboutImg || study.images[0]}
          title={`${project.mainTitle} — عن المشروع`}
        />
        {(project.problemLead || project.problemExtra) && (
          <>
            <Editorial label="التحدي" title="المشكلة التي يعالجها المشروع">
              <div className="study-prose">
                <p>{project.problemLead}</p>
                <ReadMore text={project.problemExtra} />
              </div>
            </Editorial>
            <Media
              src={project.problemImg || study.images[1] || study.images[0]}
              title={`${project.mainTitle} — تفاصيل الواجهة`}
            />
          </>
        )}

        <Editorial label="الحل" title="كيف تعاملت مع المشروع" id="approach">
          <div className="study-prose">
            <p>{project.researchLead || project.solutionLead}</p>
            <ReadMore text={project.researchExtra} />
          </div>
          <div className="study-inline-media study-image-pair">
            <Media
              src={project.researchImg || study.images[0]}
              title={`${project.mainTitle} — تجربة المستخدم`}
            />
            <Media
              src={
                project.researchSecondImg ||
                study.images.find(
                  (src) => src !== (project.researchImg || study.images[0]),
                ) ||
                project.coverImage
              }
              title={`${project.mainTitle} — تفاصيل الحل`}
            />
          </div>
        </Editorial>
        {(study.requirements || project.requirementsExtra) && (
          <>
            <Editorial title="ما الذي احتاجته التجربة؟" id="requirements">
              <div className="study-prose">
                {study.requirements && <p>{study.requirements}</p>}
                <ReadMore text={project.requirementsExtra} />
              </div>
            </Editorial>
            <Media
              src={project.requirementsImg || project.aboutImg || project.coverImage}
              title={`${project.mainTitle} — متطلبات التجربة`}
            />
          </>
        )}
        <Editorial id="process">
          {study.workingModel && (
            <div className="study-prose study-text-block">
              <h2>طريقة العمل</h2>
              <p>{study.workingModel}</p>
            </div>
          )}
          <div className="study-text-block">
            <h2>خارطة الطريق</h2>
            <p className="study-prose">
              من فهم المشكلة إلى عرض الواجهات والتفاصيل النهائية.
            </p>
          </div>
          <div className="study-roadmap">
            {roadmap.map((step, index) => (
              <div key={step.title}>
                <span className="study-step-number">0{index + 1}</span>
                <h3>{step.title}</h3>
                <ul>
                  {step.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {project.timeline && (
            <p className="study-duration">
              مدة المشروع <strong>{project.timeline}</strong>
            </p>
          )}
        </Editorial>
        <Media
          src={project.solutionImg || study.images.at(-1)}
          title={`${project.mainTitle} — بعد خارطة الطريق`}
        />

        <Editorial label="نتيجة المشروع" title={study.resultTitle} id="result">
          <div className="study-prose">
            <p>{study.resultBody}</p>
          </div>
        </Editorial>
        <Media
          src={project.resultImg || project.coverImage}
          title={`${project.mainTitle} — نتيجة المشروع`}
        />
        {study.awards.length > 0 && (
          <Editorial label="الجوائز والتقدير" title="تقدير العمل">
            {study.awards.map((award, i) => (
              <div className="study-award" key={i}>
                <h3>{award.title}</h3>
                <p>{award.description}</p>
              </div>
            ))}
          </Editorial>
        )}

        <section className="study-contact" id="project-contact">
          <div>
            <p className="study-label">تواصل معي</p>
            <h2>نبدأ مشروعك القادم؟</h2>
            <p>اختار الطريقة المناسبة وشاركني تفاصيل فكرتك.</p>
          </div>
          <div className="study-contact-options">
            <a
              href="https://cal.com/araby.ux/intro"
              className="study-contact-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              حجز استشارة <span className="study-arrow-icon" aria-hidden="true" />
            </a>
            <a href={`mailto:${contactEmail}`}>
              تواصل عبر البريد <span className="study-arrow-icon" aria-hidden="true" />
            </a>
            <p>
              الاستشارة تفتح نموذج التفاصيل، ويمكنك متابعة الإرسال عبر برنامج
              البريد.
            </p>
          </div>
        </section>

        <section className="study-all-screens" aria-labelledby="all-screens-heading">
          <h2 id="all-screens-heading">اكتشف جميع الشاشات</h2>
          <CaseGallery images={study.images} title={project.mainTitle} />
        </section>

        {related.length > 0 && (
          <section className="study-related">
            <h2>مشاريع أخرى</h2>
            <div className="portfolio-project-grid">
              {related.map((item, index) => (
                <ProjectCard key={item.id} project={item} slot={index + 1} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
