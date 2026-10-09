import { Info } from "lucide-react";
import { landingContent } from "../../data/landing-content";

export default function EventNotice() {
  const points = landingContent.eventNotice || [];

  if (!points.length) return null;

  return (
    <aside className="event-notice" aria-label="Before you register">
      <div className="event-notice__head">
        <Info size={17} />
        <h3>Before you register</h3>
      </div>
      <div className="event-notice__grid">
        {points.map((notice, index) => (
          <article className="notice-card" key={index}>
            {notice.title && <p className="notice-card__title">{notice.title}</p>}
            {notice.text && <p className="notice-card__text">{notice.text}</p>}
          </article>
        ))}
      </div>
    </aside>
  );
}
