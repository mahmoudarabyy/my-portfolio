import Link from "next/link";

export default function DetailClose({ href, label }) {
  return (
    <Link href={href} className="detail-close" aria-label={label} title={label}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
        <path d="m6 6 12 12M18 6 6 18" />
      </svg>
    </Link>
  );
}
