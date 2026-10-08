import Link from "next/link";
import { MapPin } from "lucide-react";
import StatusPill from "./StatusPill";

const dateText = (date) => new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" }).format(new Date(`${date}T00:00:00`));

export default function TemplateEventCard({ event, registration }) {
  return (
    <article className="template-event-card">
      <div className="template-event-card__top"><span className="template-tag">{event.category}</span><span><MapPin size={13} />{event.venue}</span></div>
      <div className="template-event-card__title"><h3>{event.name}</h3><small>{event.startTime}–{event.endTime}</small></div>
      <div className="template-event-card__meta"><span>{dateText(event.date)}</span><strong>{event.fee ? `₹${event.fee}` : "Free"}</strong></div>
      <footer>{registration ? <StatusPill status={registration.status} /> : <span /> }<Link className="template-btn template-btn--small" href={`/template/participant/events/${event.id}`}>{registration ? "View" : "Register"}</Link></footer>
    </article>
  );
}
