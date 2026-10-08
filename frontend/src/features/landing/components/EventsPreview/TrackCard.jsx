"use client";
import { useRef, useState } from "react";
import { CalendarDays, Clock, MapPin, Users, Wallet } from "lucide-react";
import "@/src/styles/pages/landing/event-poster.css";
const icons = { Technical: "⌘", "Non-Technical": "✦", Hackathon: "⚑", Workshop: "⌁" };
const dateText = date => date ? new Intl.DateTimeFormat("en", { day: "numeric", month: "short", year: "numeric" }).format(new Date(`${date}T00:00:00`)) : "Date TBA";

export default function TrackCard({ label, image, accent, tint, events = [], onRegister }) {
  const [flipped, setFlipped] = useState(false);
  const front = useRef(null);
  const back = useRef(null);
  const flip = next => {
    setFlipped(next);
    requestAnimationFrame(() => (next ? back : front).current?.focus());
  };
  const header = <div className="track-header"><span className="track-icon">{icons[label] || "✦"}</span><p>{label}</p></div>;
  return <div className={`track-flip${flipped ? " is-flipped" : ""}`} style={{ "--track-tint": tint, "--track-accent": accent }}>
    <div className="track-flip-inner">
      <button ref={front} type="button" className="track-card track-face track-face--front" aria-label={`Show ${label} event details`} aria-expanded={flipped} aria-hidden={flipped} {...(flipped ? { inert: true } : {})} onClick={() => flip(true)}>
        {header}<div className="track-card-art"><img src={image} alt={`${label} category artwork`} loading="lazy"/></div>
      </button>
      <div className="track-card track-face track-face--back doodlepro" onClick={() => flip(false)} aria-hidden={!flipped} {...(!flipped ? { inert: true } : {})} onKeyDown={event => { if (event.key === "Escape") flip(false); }}>
        <div className="track-details doodlepro__poster">
          <i className="poster-tape poster-tape--one"/><i className="poster-tape poster-tape--two"/><i className="poster-star"/>
          <button ref={back} type="button" className="track-back-button" onClick={() => flip(false)} aria-label={`Flip ${label} back to artwork`}>← Back to card</button>
          {events.length ? events.map(event => <article className="track-event" key={event.id}>
            <span className="doodlepro__label">{label}</span>
            <h3>{event.name}</h3><span className="poster-underline"/>
            <ul><li><CalendarDays size={14}/>{dateText(event.date)}</li><li><Clock size={14}/>{event.start_time ? `${event.start_time}${event.end_time ? ` – ${event.end_time}` : ""}` : "Time TBA"}</li><li><MapPin size={14}/>{event.venue_name || "Venue TBA"}</li><li><Wallet size={14}/>{Number(event.fee) > 0 ? `₹${event.fee}${event.is_team_event ? " / person" : ""}` : "Free"}</li><li><Users size={14}/>{event.is_team_event ? `Team of ${event.team_min === event.team_max ? event.team_min : `${event.team_min}–${event.team_max}`}` : "Individual"}</li></ul>
            <p>{event.instructions || "Instructions will be shared soon."}</p>
            <div className="poster-ribbon">YOUR EVENT · REGISTER NOW · YOUR EVENT ·</div>
            <button type="button" className="track-register" onClick={onRegister}>Register →</button>
          </article>) : <p>Events will be announced soon.</p>}
        </div>
      </div>
    </div>
  </div>;
}
