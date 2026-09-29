import Reveal from "./reveal";

export default function ClientTestimonials({ testimonials }) {
  const items = testimonials.every(item => item.sample)
    ? testimonials.slice(0, 2)
    : testimonials;
  if (!items.length) return null;
  return (
    <Reveal as="section" className="client-voices" id="testimonials">
      <div className="feedback-container">
        <header className="client-voices-heading">
          <p>آراء عملائي</p>
          <h2>ماذا قالوا عن تجربتهم؟</h2>
        </header>
        <div className="client-voices-grid">
          {items.map(item => {
            const rating = Number.isInteger(item.rating) && item.rating >= 1 && item.rating <= 5
              ? item.rating : item.sample ? 5 : null;
            return <figure className="client-voice" key={item._id}>
              {rating && <div className="client-voice-stars" role="img" aria-label={`التقييم ${rating} من 5`}>
                {Array.from({ length: 5 }, (_, index) => <svg key={index} viewBox="0 0 24 24" aria-hidden="true" className={index < rating ? "" : "star-empty"}><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8-6.2-3.2L5.8 21 7 14.2 2 9.3l6.9-1z" /></svg>)}
              </div>}
              <blockquote>«{item.quote}»</blockquote>
              <figcaption><strong>{item.name}</strong><span>{item.role}</span></figcaption>
              {item.sample && <small>نموذج تجريبي — ليس تقييمًا حقيقيًا</small>}
            </figure>;
          })}
        </div>
      </div>
    </Reveal>
  );
}
