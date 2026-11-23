import SiteImage from "./site-image";
import HeroTitle from "./hero-title";
import Reveal from "./reveal";
export default function HomeHero({ lang = "ar", content }) {
  return (
    <>
      <div className="ambient-glow purple-glow"></div>
      <div className="ambient-glow top-glow"></div>
      <div className="grid-overlay" aria-hidden="true">
        <div className="grid-line"></div>
        <div className="grid-line"></div>
        <div className="grid-line"></div>
        <div className="grid-line"></div>
        <div className="grid-line"></div>
      </div>
      <section className="hero-section hero-section-simple">
        <div className="hero-frame-container">
          <div className="hero-stripe hero-stripe-right" aria-hidden="true">
            <SiteImage
              src="/Hero/شريط جانبي rightt.svg"
              alt=""
              className="stripe-svg"
            />
          </div>
          <div className="hero-stripe hero-stripe-left" aria-hidden="true">
            <SiteImage
              src="/Hero/شريط جانبي laft.svg"
              alt=""
              className="stripe-svg"
            />
          </div>


        </div>
        <div className="hero-container">
          <div className="hero-portrait">
            <SiteImage src="/Hero/صورتي.png" alt={lang === "en" ? "Mahmoud Araby" : "محمود عربي"} sizes="(max-width: 768px) 150px, 180px" preload />
          </div>
          <div className="hero-title-wrapper">


            <HeroTitle lang={lang} title={content.heroTitle} />
          </div>
          <Reveal as="p" delay={120} className="hero-description">
            {content.heroDescription}
          </Reveal>
        </div>
        <div className="hero-sticker hero-sticker-duck" aria-hidden="true">
          <SiteImage src="/Hero/duck.png" alt="Duck" className="sticker-img" />
        </div>
      </section>
    </>
  );
}
