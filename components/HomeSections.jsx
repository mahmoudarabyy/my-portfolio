import Link from "next/link";
import Reveal from "./reveal";
import SiteImage from "./site-image";
import { ServiceCard } from "./interactions";
export default function HomeSections() {
  return (
    <>
      <Reveal as="section" className="about-section" id="about">
        <div className="about-frame-container" aria-hidden="true">
          <div className="about-stripe about-stripe-right">
            <SiteImage
              src="/Hero/شريط جانبي rightt.svg"
              alt=""
              className="stripe-svg"
            />
          </div>
          <div className="about-stripe about-stripe-left">
            <SiteImage
              src="/Hero/شريط جانبي laft.svg"
              alt=""
              className="stripe-svg"
            />
          </div>
        </div>
        <div className="about-container">
          <div className="about-content-column">
            <div className="about-logo-wrapper">
              <SiteImage
                src="/Logo.png"
                alt="عربي"
                className="about-brand-logo"
              />
            </div>
            <div className="about-statement-text">
              <p className="about-statement-lead">
                {
                  "\n            أنا محمود عربي، مصمم UX/UI بخبرة أكثر من 4 سنوات في تصميم المنتجات والتجارب الرقمية، من المواقع الإلكترونية وتطبيقات الموبايل إلى لوحات التحكم والأنظمة الرقمية.\n          "
                }
              </p>
              <p className="about-statement-desc">
                {
                  "\n            أحب تحويل الأفكار والمشكلات المعقدة إلى تجارب بسيطة، واضحة وسهلة الاستخدام، مع الاهتمام بالتفاصيل البصرية وجودة تجربة المستخدم.\n          "
                }
              </p>
              <p className="about-statement-desc">
                {
                  "\n            بالنسبة لي، التصميم ليس مجرد شكل، لكنه طريقة لخلق منتج يخدم المستخدم ويحقق أهدافه بشكل فعّال.\n          "
                }
              </p>
            </div>
            <div className="about-stats-row">
              <div className="about-stat-item">
                <span className="stat-number">{"20"}</span>
                <span className="stat-label">{"عميل سعيد"}</span>
              </div>
              <div className="about-stat-item">
                <span className="stat-number">{"25"}</span>
                <span className="stat-label">{"مشروع مكتمل"}</span>
              </div>
              <div className="about-stat-item">
                <span className="stat-number">{"+4"}</span>
                <span className="stat-label">{"سنوات خبرة"}</span>
              </div>
            </div>
            <div className="about-cv-wrapper">
              <a
                href="https://arabyux.tabbio.com/"
                className="btn-about-cv"
                target="_blank"
                rel="noopener"
                aria-label="السيرة الذاتية"
              >
                <span>{"السيرة الذاتية"}</span>
                <svg
                  className="cv-arrow-icon"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 12H5"></path>
                  <path d="M12 19l-7-7 7-7"></path>
                </svg>
              </a>
            </div>
          </div>
          <div className="about-visual-column">
            <div className="about-portrait-card">
              <SiteImage
                src="/من انا/Container.png"
                alt="محمود عربي - UX/UI Designer"
                className="about-portrait-img"
              />
            </div>
          </div>
        </div>
      </Reveal>
      <Reveal as="section" className="services-section" id="services">
        <div className="services-frame-container" aria-hidden="true">
          <div className="services-stripe services-stripe-right">
            <SiteImage
              src="/خدماتي/شريط جانبي rightt.svg"
              alt=""
              className="stripe-svg"
            />
          </div>
          <div className="services-stripe services-stripe-left">
            <SiteImage
              src="/خدماتي/شريط جانبي laft.svg"
              alt=""
              className="stripe-svg"
            />
          </div>
        </div>
        <div className="services-container">
          <div className="services-header">
            <h2 className="services-title">{"خدماتي"}</h2>
            <p className="services-subtitle">
              {
                "مجموعة متنوعة من البرامج المتخصصة التي تلبي اهتمامات مختلفة وتقدم محتوى هادف ومميز"
              }
            </p>
          </div>
          <div className="services-grid">
            <ServiceCard className="service-card" data-service="1">
              <div className="service-badge">{"01"}</div>
              <div className="service-mockup-wrap">
                <SiteImage
                  src="/خدماتي/Pro Display XDR6547567.png"
                  alt="تصميم تجربة المستخدم"
                  className="service-mockup-img"
                />
              </div>
              <div className="service-content">
                <h3 className="service-title">{"تصميم تجربة المستخدم"}</h3>
                <p className="service-description">
                  {
                    "\n              نحن نصنع هويات علامات تجارية تتجاوز الشعارات والألوان، من نبرة الصوت إلى التوجيه البصري، نشكل العلامات التجارية التي تبرز.\n            "
                  }
                </p>
              </div>
            </ServiceCard>
            <ServiceCard className="service-card" data-service="2">
              <div className="service-badge">{"02"}</div>
              <div className="service-mockup-wrap">
                <SiteImage
                  src="/خدماتي/Pro Display XDR.png"
                  alt="تصميم واجهة المستخدم"
                  className="service-mockup-img"
                />
              </div>
              <div className="service-content">
                <h3 className="service-title">{"تصميم واجهة المستخدم"}</h3>
                <p className="service-description">
                  {
                    "\n              نحن نصنع هويات علامات تجارية تتجاوز الشعارات والألوان، من نبرة الصوت إلى التوجيه البصري، نشكل العلامات التجارية التي تبرز.\n            "
                  }
                </p>
              </div>
            </ServiceCard>
            <ServiceCard className="service-card" data-service="3">
              <div className="service-badge">{"03"}</div>
              <div className="service-mockup-wrap">
                <SiteImage
                  src="/خدماتي/Pro Display XDR7568.png"
                  alt="تصميم الهوية البصرية"
                  className="service-mockup-img"
                />
              </div>
              <div className="service-content">
                <h3 className="service-title">{"تصميم الهوية البصرية"}</h3>
                <p className="service-description">
                  {
                    "\n              نحن نصنع هويات علامات تجارية تتجاوز الشعارات والألوان، من نبرة الصوت إلى التوجيه البصري، نشكل العلامات التجارية التي تبرز.\n            "
                  }
                </p>
              </div>
            </ServiceCard>
            <ServiceCard className="service-card" data-service="4">
              <div className="service-badge">{"04"}</div>
              <div className="service-mockup-wrap">
                <SiteImage
                  src="/خدماتي/90890-ب.png"
                  alt="التطوير البرمجي"
                  className="service-mockup-img"
                />
              </div>
              <div className="service-content">
                <h3 className="service-title">{"التطوير"}</h3>
                <p className="service-description">
                  {
                    "\n              نحن نصنع هويات علامات تجارية تتجاوز الشعارات والألوان، من نبرة الصوت إلى التوجيه البصري، نشكل العلامات التجارية التي تبرز.\n            "
                  }
                </p>
              </div>
            </ServiceCard>
          </div>
        </div>
      </Reveal>
      <Reveal as="section" className="articles-section" id="articles">
        <div className="articles-frame-container" aria-hidden="true">
          <div className="articles-stripe articles-stripe-right">
            <SiteImage
              src="/Hero/شريط جانبي rightt.svg"
              alt=""
              className="stripe-svg"
            />
          </div>
          <div className="articles-stripe articles-stripe-left">
            <SiteImage
              src="/Hero/شريط جانبي laft.svg"
              alt=""
              className="stripe-svg"
            />
          </div>
        </div>
        <div className="articles-container">
          <div className="articles-header">
            <h2 className="articles-title">{"كتاباتي"}</h2>
            <div className="article-sticker-sayless" aria-hidden="true">
              <SiteImage
                src="/كتباتي/say less.png"
                alt="Say less"
                className="sayless-img"
              />
            </div>
          </div>
          <div className="articles-grid">
            <article className="article-card">
              <a href="#" className="article-card-link" aria-label="اسم المقال">
                <div className="article-cover-wrap">
                  <SiteImage
                    src="/كتباتي/Link.png"
                    alt="تصميم تجارب الأجهزة القابلة للارتداء"
                    className="article-cover-img"
                  />
                </div>
                <div className="article-body">
                  <span className="article-category">{"تجربة المستخدم"}</span>
                  <h3 className="article-heading">
                    {"اسم المقاال هنااااااااااااااا"}
                  </h3>
                  <span className="article-date">{"2025 ,6 اكتوبر"}</span>
                </div>
              </a>
            </article>
            <article className="article-card">
              <a href="#" className="article-card-link" aria-label="اسم المقال">
                <div className="article-cover-wrap">
                  <SiteImage
                    src="/كتباتي/FCkTyHkAV9pj8bYHP0WRjHJhGP8.avif"
                    alt="تبسيط رحلات المستخدم المعقدة"
                    className="article-cover-img"
                  />
                </div>
                <div className="article-body">
                  <span className="article-category">{"تجربة المستخدم"}</span>
                  <h3 className="article-heading">
                    {"اسم المقاال هنااااااااااااااا"}
                  </h3>
                  <span className="article-date">{"2025 ,6 اكتوبر"}</span>
                </div>
              </a>
            </article>
            <article className="article-card card-last-article">
              <a href="#" className="article-card-link" aria-label="اسم المقال">
                <div className="article-cover-wrap">
                  <SiteImage
                    src="/كتباتي/Link-1.png"
                    alt="التصميم العاطفي والارتباط بالمنتج"
                    className="article-cover-img"
                  />
                </div>
                <div className="article-body">
                  <span className="article-category">{"تجربة المستخدم"}</span>
                  <h3 className="article-heading">
                    {"اسم المقاال هنااااااااااااااا"}
                  </h3>
                  <span className="article-date">{"2025 ,6 اكتوبر"}</span>
                </div>
              </a>
              <div className="article-middle-btn-wrap">
                <a href="#" className="btn-all-articles">
                  <span>{"جميع كتاباتي"}</span>
                </a>
              </div>
            </article>
          </div>
        </div>
      </Reveal>
    </>
  );
}
