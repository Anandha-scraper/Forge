"use client";

import { useState } from "react";
import Link from "next/link";
import { CalendarDays, CheckCircle2, Clock, MapPin, Users, Wallet } from "lucide-react";
import StatusPill from "@/src/components/dashboard/StatusPill";
import TemplateDialog from "@/src/components/dashboard/TemplateDialog";
import { useTemplatePreview } from "../../context/TemplatePreviewContext";
import { templateContent } from "../../data/template-content";
import "@/src/styles/pages/template/event-detail.css";

export default function ParticipantEventDetail({ eventId }) {
  const { events, registrations, registerForEvent } = useTemplatePreview();
  const [confirming, setConfirming] = useState(false);
  const [success, setSuccess] = useState(false);
  const event = events.find((item) => item.id === eventId);
  const user = templateContent.previewUsers.participant;
  const registration = registrations.find((item) => item.participantId === user.id && item.eventId === eventId);

  if (!event) return <div className="template-page"><section className="template-panel template-not-found"><h1>Event not found</h1><p>This mock event may have been reset or removed.</p><Link className="template-btn" href="/template/participant">Return to events</Link></section></div>;
  const completeRegistration = () => { registerForEvent(event.id); setConfirming(false); setSuccess(true); };

  return (
    <div className="template-page event-detail-page">
      <Link className="template-back-link" href="/template/participant">← Back to events</Link>
      <section className="event-detail-hero"><div><span className="template-tag">{event.category}</span><h1>{event.name}</h1><p>{event.description}</p><div className="event-detail-meta"><span><CalendarDays size={17} />{event.date}</span><span><Clock size={17} />{event.startTime}–{event.endTime}</span><span><MapPin size={17} />{event.venue}</span><span><Users size={17} />{event.teamMax > 1 ? `${event.teamMin}–${event.teamMax} members` : "Individual"}</span><span><Wallet size={17} />{event.fee ? `₹${event.fee} per entry` : "Free"}</span></div></div><aside><small>Registration</small><strong>{event.registrationOpen ? "Open" : "Closed"}</strong>{registration ? <><StatusPill status={registration.status} /><Link className="template-btn" href="/template/participant/registrations">View registration</Link></> : <button className="template-btn" disabled={!event.registrationOpen} onClick={() => setConfirming(true)}>Register now</button>}</aside></section>
      {success && <div className="event-success"><CheckCircle2 size={20} /><div><strong>Mock registration created.</strong><span>Open My Registrations to see the participant status flow.</span></div><button type="button" onClick={() => setSuccess(false)} aria-label="Dismiss">×</button></div>}
      <div className="event-detail-grid"><section className="template-panel"><span className="template-eyebrow">What to expect</span><h2>Event details</h2><p>{event.description}</p><p>This frontend-only preview demonstrates where an organisation can add eligibility, judging criteria, prizes and submission requirements.</p></section><section className="template-panel"><span className="template-eyebrow">Before you arrive</span><h2>Instructions</h2><ol className="instruction-list">{event.instructions.map((instruction, index) => <li key={instruction}><span>{String(index + 1).padStart(2, "0")}</span><p>{instruction}</p></li>)}</ol></section></div>
      {confirming && <TemplateDialog title={`Register for ${event.name}`} onClose={() => setConfirming(false)}><div className="registration-confirm"><p>This demonstrates the hand-off into a registration flow. No account, payment or backend call will be made.</p><dl><div><dt>Participant</dt><dd>{user.name}</dd></div><div><dt>Entry</dt><dd>{event.teamMax > 1 ? `Team of ${event.teamMin}–${event.teamMax}` : "Individual"}</dd></div><div><dt>Amount</dt><dd>{event.fee ? `₹${event.fee}` : "Free"}</dd></div></dl><div className="template-form-actions"><button className="template-btn" type="button" onClick={completeRegistration}>Create mock registration</button><button className="template-btn template-btn--ghost" type="button" onClick={() => setConfirming(false)}>Cancel</button></div></div></TemplateDialog>}
    </div>
  );
}
