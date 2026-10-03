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
      <section className="hero-section">
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
          <div className="hero-sticker hero-sticker-photo" aria-hidden="true">
            <SiteImage
              src="/Hero/صورتي.png"
              alt="محمود عربي"
              className="sticker-img"
            />
          </div>
          <div
            className="hero-sticker hero-sticker-component"
            aria-hidden="true"
          >
            <SiteImage
              src="/Hero/Component.png"
              alt="Component You & Me"
              className="sticker-img"
            />
          </div>
        </div>
        <div className="hero-container">
          <div className="hero-title-wrapper">
            <div className="hero-sticker hero-sticker-fire" aria-hidden="true">
              <SiteImage
                src="/Hero/Fire.png"
                alt="Fire"
                className="sticker-img"
              />
            </div>
            <div className="hero-sticker hero-sticker-me" aria-hidden="true">
              <SiteImage src="/Hero/Me.png" alt="Me" className="sticker-img" />
            </div>
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
