import SiteImage from "./site-image";

const socials = [
  { name: "Instagram", icon: "instagram", href: "https://www.instagram.com/mahmoudarabby/" },
  { name: "LinkedIn", icon: "linkedin", href: "https://www.linkedin.com/in/arabux/" },
  { name: "Behance", icon: "behance", href: "https://www.behance.net/mahmoudaraby4" },
  { name: "Dribbble", icon: "dribbble", href: "https://dribbble.com/mahmoudaraby702" },
  { name: "X", icon: "x", href: "https://x.com/araby_mahm70016" },
];

export default function PortraitSocials() {
  return (
    <div className="about-social-grid" role="group" aria-label="صورتي وحساباتي على السوشيال ميديا" dir="rtl">
      <div className="about-social-portrait">
        <SiteImage src="/about-ui-designer.png" alt="محمود عربي" width={611} height={611} className="about-social-photo" sizes="(max-width: 768px) 30vw, 180px" />
      </div>
      {socials.map(({ name, icon, href }) => {
        const logo = <span className="portrait-social-logo" style={{ "--social-icon": `url('/social-icons/${icon}.svg')` }} aria-hidden="true" />;
        return href ? (
          <a key={icon} className="portrait-social" href={href} target="_blank" rel="noopener noreferrer" aria-label={name}>
            {logo}
            <span className="about-social-name">{name}</span>
          </a>
        ) : (
          <span key={icon} className="portrait-social" role="img" aria-label={`${name} — الرابط قريبًا`} title={`${name} — الرابط قريبًا`}>
            {logo}
          </span>
        );
      })}
    </div>
  );
}
