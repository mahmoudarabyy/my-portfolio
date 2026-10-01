import Link from "next/link";
import ArticleCard from "./article-card";
import { getArticles } from "../lib/articles";
import { getHomeContent } from "../lib/home-content";
import HomeFeedback from "./home-feedback";
import ClientTestimonials from "./client-testimonials";
import Reveal from "./reveal";
import SiteImage from "./site-image";
import PortraitSocials from "./portrait-socials";
import { ServiceCard, ServicesGrid } from "./interactions";
export default async function HomeSections() {
  const [allArticles, homeContent] = await Promise.all([
    getArticles(),
    getHomeContent(),
  ]);
  const articles = allArticles.slice(0, 3);
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
              <Link
                href="/resume"
                className="btn-about-cv"
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
              </Link>
            </div>
          </div>
          <div className="about-visual-column">
            <PortraitSocials />
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
          <ServicesGrid>
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
          </ServicesGrid>
        </div>
      </Reveal>
      <ClientTestimonials testimonials={homeContent.testimonials} />
      <HomeFeedback {...homeContent} />
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
            <p className="articles-description">
              أفكار وتجارب عن تصميم المنتجات الرقمية وتجربة المستخدم، من فهم
              المشكلة إلى تفاصيل الواجهة.
            </p>
          </div>
          <div className="articles-grid">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
          {!articles.length && (
            <p className="writing-empty">كتابات جديدة قريبًا.</p>
          )}
          <div className="programs-footer">
            <Link href="/articles" className="btn-view-all">
              جميع كتاباتي
            </Link>
          </div>
        </div>
      </Reveal>
    </>
  );
}
