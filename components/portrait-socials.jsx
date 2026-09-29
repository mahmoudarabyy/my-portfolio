const socials = [
  { name: "Instagram", icon: "instagram", href: "https://www.instagram.com/mahmoudarabby/" },
  { name: "LinkedIn", icon: "linkedin", href: "https://www.linkedin.com/in/arabux/" },
  { name: "Behance", icon: "behance", href: "https://www.behance.net/mahmoudaraby4" },
  { name: "Dribbble", icon: "dribbble", href: "https://dribbble.com/mahmoudaraby702" },
  { name: "X", icon: "x", href: "https://x.com/araby_mahm70016" },
];

export default function PortraitSocials() {
  return (
    <div className="portrait-socials" role="group" aria-label="حساباتي على السوشيال ميديا" dir="ltr">
      {socials.map(({ name, icon, href }) => {
        const logo = <span className="portrait-social-logo" style={{ "--social-icon": `url('/social-icons/${icon}.svg')` }} aria-hidden="true" />;
        return href ? (
          <a key={icon} className="portrait-social" href={href} target="_blank" rel="noopener noreferrer" aria-label={name}>
            {logo}
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
