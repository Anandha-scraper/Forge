"use client";

import { useState } from "react";
import { CalendarDays, Clock, MapPin, QrCode } from "lucide-react";
import StatusPill from "@/src/components/dashboard/StatusPill";
import TemplateDialog from "@/src/components/dashboard/TemplateDialog";
import { useTemplatePreview } from "../../context/TemplatePreviewContext";
import { templateContent } from "../../data/template-content";
import "@/src/styles/pages/template/participant.css";

export default function ParticipantRegistrations() {
  const { events, registrations } = useTemplatePreview();
  const [selected, setSelected] = useState(null);
  const user = templateContent.previewUsers.participant;
  const mine = registrations.filter((item) => item.participantId === user.id);
  const eventById = new Map(events.map((event) => [event.id, event]));

  return (
    <div className="template-page participant-page">
      <div className="template-page-head"><div><span className="template-eyebrow">Passes and payments</span><h1>My registrations</h1><p>Track confirmation, payment review and entry passes.</p></div><span className="template-count">{mine.length} registrations</span></div>
      <div className="registration-card-grid">
        {mine.map((registration) => { const event = eventById.get(registration.eventId); return <article className="registration-card" key={registration.id}><header><div><span className="template-tag">{event?.category}</span><h2>{event?.name}</h2></div><StatusPill status={registration.status} /></header><div className="registration-card__meta"><span><CalendarDays size={15} />{event?.date}</span><span><Clock size={15} />{event?.startTime}–{event?.endTime}</span><span><MapPin size={15} />{event?.venue}</span></div><div className="registration-card__id"><span>Registration ID</span><strong>{registration.id}</strong></div><footer><div><small>{registration.status === "completed" ? "Your pass is ready" : "Organiser review in progress"}</small><strong>{registration.allocationCode}</strong></div><button type="button" className="template-btn template-btn--small" onClick={() => setSelected(registration)}>{registration.status === "completed" ? <><QrCode size={15} /> View pass</> : "View details"}</button></footer></article>; })}
      </div>
      {selected && <TemplateDialog title={selected.status === "completed" ? "Your event pass" : "Registration status"} onClose={() => setSelected(null)}><Pass registration={selected} event={eventById.get(selected.eventId)} /></TemplateDialog>}
    </div>
  );
}

function Pass({ registration, event }) {
  if (registration.status !== "completed") return <div className="pending-pass"><StatusPill status={registration.status} /><h3>Payment proof is being reviewed.</h3><p>This mock state shows the participant experience before an organiser confirms their registration.</p><dl><div><dt>Event</dt><dd>{event?.name}</dd></div><div><dt>Amount</dt><dd>₹{registration.amount}</dd></div><div><dt>Registration</dt><dd>{registration.id}</dd></div></dl></div>;
  return <div className="digital-pass"><div className="digital-pass__qr" aria-label="Decorative mock QR code"><span /></div><div><span className="template-eyebrow">Personal QR pass</span><h3>{event?.name}</h3><p>{event?.date} · {event?.startTime}<br />{event?.venue}</p><dl><div><dt>Participant</dt><dd>{registration.participant}</dd></div><div><dt>Allocation</dt><dd>{registration.allocationCode}</dd></div><div><dt>Registration</dt><dd>{registration.id}</dd></div></dl></div></div>;
}
