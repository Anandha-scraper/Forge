"use client";

import Link from "next/link";
import { Clock, MapPin } from "lucide-react";
import { useTemplatePreview } from "../../context/TemplatePreviewContext";
import { templateContent } from "../../data/template-content";
import "@/src/styles/pages/template/participant.css";

const dateText = (date) => new Intl.DateTimeFormat("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(new Date(`${date}T00:00:00`));

export default function ParticipantSchedule() {
  const { events, registrations } = useTemplatePreview();
  const user = templateContent.previewUsers.participant;
  const registeredIds = new Set(registrations.filter((item) => item.participantId === user.id).map((item) => item.eventId));
  const mine = events.filter((event) => registeredIds.has(event.id)).sort((a, b) => `${a.date}${a.startTime}`.localeCompare(`${b.date}${b.startTime}`));
  const days = mine.reduce((result, event) => { const day = result.find((item) => item.date === event.date); if (day) day.events.push(event); else result.push({ date: event.date, events: [event] }); return result; }, []);

  return (
    <div className="template-page participant-page">
      <div className="template-page-head"><div><span className="template-eyebrow">Plan your visit</span><h1>My schedule</h1><p>A day-by-day view of every event on your pass.</p></div><Link className="template-btn template-btn--ghost" href="/template/participant">Browse events</Link></div>
      <section className="template-panel participant-schedule">
        {days.map((day, index) => <div className="participant-schedule__day" key={day.date}><aside><strong>Day {index + 1}</strong><span>{dateText(day.date)}</span></aside><ol>{day.events.map((event) => <li key={event.id}><div><span className="template-tag">{event.category}</span><h2>{event.name}</h2><p><span><Clock size={14} />{event.startTime}–{event.endTime}</span><span><MapPin size={14} />{event.venue}</span></p></div><Link href={`/template/participant/events/${event.id}`}>View event →</Link></li>)}</ol></div>)}
      </section>
    </div>
  );
}
