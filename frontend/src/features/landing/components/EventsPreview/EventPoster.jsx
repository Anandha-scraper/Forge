"use client";

import { useState } from "react";
import { CalendarDays, Clock, Users, Wallet } from "lucide-react";
import ComicButton from "@/src/components/common/ComicButton";
import "@/src/styles/pages/landing/event-poster.css";
import "@/src/styles/pages/landing/event-poster-flip.css";

const dateText = (date) => date ? new Intl.DateTimeFormat("en", { day: "numeric", month: "short", year: "numeric" }).format(new Date(`${date}T00:00:00`)) : "Date TBA";
const timeText = (event) => event.start_time ? `${event.start_time}${event.end_time ? ` – ${event.end_time}` : ""}` : "Time TBA";

export default function EventPoster({ event, onRegister }) {
  const [showDetails, setShowDetails] = useState(false);
  const team = event.is_team_event ? `Team of ${event.team_min === event.team_max ? event.team_min : `${event.team_min}–${event.team_max}`}` : "Individual";

  return (
    <div className={`doodlepro${showDetails ? " is-flipped" : ""}`}>
      <button type="button" className="doodlepro__toggle" aria-pressed={showDetails} onClick={() => setShowDetails((value) => !value)}>
        <span aria-hidden="true" />
        {showDetails ? "Back" : "Details"}
      </button>
      <div className="doodlepro__flip">
        <article className="doodlepro__poster doodlepro__poster--front" aria-hidden={showDetails}>
          <i className="poster-tape poster-tape--one" />
          <i className="poster-tape poster-tape--two" />
          <i className="poster-star" />
          <span className="doodlepro__label">{event.category || "Event"}</span>
          <h3>{event.name || "YOUR EVENT"}</h3>
          <span className="poster-underline" />
          <ul>
            <li><CalendarDays size={16} />{dateText(event.date)}</li>
            <li><Clock size={16} />{timeText(event)}</li>
            <li><Wallet size={16} />{Number(event.fee) > 0 ? `₹${event.fee}${event.is_team_event ? " / person" : ""}` : "Free"}</li>
            <li><Users size={16} />{team}</li>
          </ul>
          <div className="poster-ribbon">YOUR EVENT · REGISTER NOW · YOUR EVENT · REGISTER NOW ·</div>
          <div className="poster-footer">
            <small>click here →</small>
            <ComicButton onClick={() => onRegister?.(event)}>Register</ComicButton>
          </div>
        </article>
        <article className="doodlepro__poster doodlepro__poster--back" aria-hidden={!showDetails}>
          <i className="poster-tape poster-tape--one" />
          <i className="poster-tape poster-tape--two" />
          <i className="poster-star" />
          <span className="doodlepro__label">Event details</span>
          <h3>{event.name || "YOUR EVENT"}</h3>
          <span className="poster-underline" />
          <div className="poster-details">
            <p>{event.description || "Add a short event description here."}</p>
            <p>{event.instructions || "Instructions will be shared soon."}</p>
          </div>
          <div className="poster-ribbon">EVENT DETAILS · EVENT DETAILS · EVENT DETAILS ·</div>
          <div className="poster-footer">
            <small>Use Back to return</small>
          </div>
        </article>
      </div>
    </div>
  );
}
