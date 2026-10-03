import { ui } from "../lib/ui";
import Reveal from "./reveal";
import SiteImage from "./site-image";
import { whatsappUrl } from "../lib/site";

function SectionRulers() {
  return (
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
  );
}

export default function HomeFeedback({ faqs, lang = "ar" }) {
  const t = (text) => ui(lang, text);
  return (
    <>
      <Reveal as="section" className="home-faq" id="faq">
        <SectionRulers />
        <div className="feedback-container faq-layout">
          <header className="feedback-heading">
            <h2>{t("أسئلة قبل أن نبدأ")}</h2>
            <p>
              {t("إجابات تساعدك تعرف الخطوة الجاية.")}
              <br />
              {t("ولو عندك سؤال مختلف، يسعدني أسمعه.")}
            </p>
            <a
              href="https://cal.com/araby.ux/intro"
              className="faq-contact"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("احجز استشارة")}{" "}
              <span className="booking-icon" aria-hidden="true">
                <span className="study-arrow-icon" />
                <svg
                  className="booking-meet-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  focusable="false"
                >
                  <path fill="#00832D" d="m16 9 6-4v14l-6-4z" />
                  <path fill="#0066DA" d="M2 7h5v10H2z" />
                  <path fill="#E94235" d="m2 7 5-5v5z" />
                  <path fill="#2684FC" d="M2 17h5v5H4a2 2 0 0 1-2-2z" />
                  <path fill="#00AC47" d="M7 17h9v5H7z" />
                  <path fill="#FFBA00" d="M7 2h7a2 2 0 0 1 2 2v5h-4V7H7z" />
                  <path fill="#00AC47" d="M12 9h4v8h-4z" />
                </svg>
              </span>
            </a>
          </header>
          <a
            href={whatsappUrl}
            className="faq-mascot"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("كلمني بسرعة على واتساب")}
          >
            <span className="faq-mascot-bubble" aria-hidden="true">
              {t("كلمني بسرعة")}
            </span>
            <span className="faq-mascot-person">
              <SiteImage
                src="/faq-mascot-full.png"
                alt=""
                width={1024}
                height={1536}
                sizes="220px"
                className="faq-mascot-image"
              />
            </span>
          </a>
          <div className="faq-list">
            {!faqs.length && lang === "en" && (
              <p>
                Have a question about your project? Book a call and let’s talk.
              </p>
            )}
            {faqs.map((item, index) => (
              <details className="faq-item" key={item._id} name="portfolio-faq">
                <summary>
                  <span className="faq-number" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{item.question}</span>
                  <span className="faq-plus" aria-hidden="true" />
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </Reveal>
    </>
  );
}
