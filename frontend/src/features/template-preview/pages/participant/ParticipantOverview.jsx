"use client";

import Link from "next/link";
import TemplateEventCard from "@/src/components/dashboard/TemplateEventCard";
import { useTemplatePreview } from "../../context/TemplatePreviewContext";
import { templateContent } from "../../data/template-content";
import "@/src/styles/pages/template/participant.css";

export default function ParticipantOverview() {
  const { events, registrations } = useTemplatePreview();
  const user = templateContent.previewUsers.participant;
  const mine = registrations.filter((item) => item.participantId === user.id);
  const registrationByEvent = new Map(mine.map((item) => [item.eventId, item]));
  const registered = events.filter((event) => registrationByEvent.has(event.id));
  const open = events.filter((event) => !registrationByEvent.has(event.id));

  return (
    <div className="template-page participant-page">
      <div className="participant-welcome"><div><span className="template-eyebrow">Participant overview</span><h1>Welcome back, Taylor.</h1><p>Your events, confirmations and next steps are all in one place.</p></div><div className="participant-summary"><strong>{mine.length}</strong><span>active registrations</span><Link href="/template/participant/registrations">View passes →</Link></div></div>
      {!!registered.length && <section className="template-panel"><div className="template-panel-head"><div><span className="template-eyebrow">Your programme</span><h2>You’re registered for</h2></div><Link href="/template/participant/schedule">Open schedule</Link></div><div className="template-event-grid">{registered.map((event) => <TemplateEventCard key={event.id} event={event} registration={registrationByEvent.get(event.id)} />)}</div></section>}
      <section className="template-panel"><div className="template-panel-head"><div><span className="template-eyebrow">Discover</span><h2>More events</h2></div><span>{open.length} available</span></div><div className="template-event-grid">{open.map((event) => <TemplateEventCard key={event.id} event={event} />)}</div></section>
    </div>
  );
}
