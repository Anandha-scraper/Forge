"use client";

import { useState } from "react";
import { CalendarDays, MapPin, Pencil, Plus, Users } from "lucide-react";
import TemplateDialog from "@/src/components/dashboard/TemplateDialog";
import { useTemplatePreview } from "../../context/TemplatePreviewContext";
import "@/src/styles/pages/template/admin.css";

const blankEvent = { id: "", name: "", category: "Technical", date: "2026-09-27", startTime: "09:00", endTime: "10:00", venue: "", fee: 0, teamMin: 1, teamMax: 1, description: "", instructions: ["Add participant instructions here."], registrationOpen: true };

export default function AdminEvents() {
  const { events, saveEvent } = useTemplatePreview();
  const [editing, setEditing] = useState(null);
  const openNew = () => setEditing({ ...blankEvent });
  const save = (event) => { event.preventDefault(); saveEvent(editing); setEditing(null); };
  const set = (key, value) => setEditing((current) => ({ ...current, [key]: value }));

  return (
    <div className="template-page">
      <div className="template-page-head"><div><span className="template-eyebrow">Programme setup</span><h1>Events</h1><p>Create and edit the experiences participants see.</p></div><button type="button" className="template-btn" onClick={openNew}><Plus size={17} /> Add event</button></div>
      <div className="admin-event-grid">
        {events.map((event) => <article className="admin-event-card" key={event.id}><header><span className="template-tag">{event.category}</span><span className={event.registrationOpen ? "event-open" : "event-closed"}>{event.registrationOpen ? "Open" : "Closed"}</span></header><h2>{event.name}</h2><p>{event.description}</p><ul><li><CalendarDays size={15} />{event.date} · {event.startTime}–{event.endTime}</li><li><MapPin size={15} />{event.venue}</li><li><Users size={15} />{event.teamMax > 1 ? `${event.teamMin}–${event.teamMax} members` : "Individual"}</li></ul><footer><strong>{event.fee ? `₹${event.fee}` : "Free"}</strong><button type="button" className="template-btn template-btn--ghost template-btn--small" onClick={() => setEditing({ ...event, instructions: [...event.instructions] })}><Pencil size={14} /> Edit</button></footer></article>)}
      </div>
      {editing && <TemplateDialog title={editing.id ? "Edit event" : "Add event"} size="wide" onClose={() => setEditing(null)}><form className="template-event-form" onSubmit={save}><label className="template-field-wide"><span>Event name</span><input required value={editing.name} onChange={(event) => set("name", event.target.value)} /></label><label><span>Category</span><select value={editing.category} onChange={(event) => set("category", event.target.value)}><option>Technical</option><option>Non-Technical</option><option>Hackathon</option><option>Workshop</option></select></label><label><span>Venue</span><input required value={editing.venue} onChange={(event) => set("venue", event.target.value)} /></label><label><span>Date</span><input type="date" required value={editing.date} onChange={(event) => set("date", event.target.value)} /></label><label><span>Fee</span><input type="number" min="0" value={editing.fee} onChange={(event) => set("fee", Number(event.target.value))} /></label><label><span>Start time</span><input type="time" value={editing.startTime} onChange={(event) => set("startTime", event.target.value)} /></label><label><span>End time</span><input type="time" value={editing.endTime} onChange={(event) => set("endTime", event.target.value)} /></label><label><span>Minimum team size</span><input type="number" min="1" value={editing.teamMin} onChange={(event) => set("teamMin", Number(event.target.value))} /></label><label><span>Maximum team size</span><input type="number" min={editing.teamMin} value={editing.teamMax} onChange={(event) => set("teamMax", Number(event.target.value))} /></label><label className="template-field-wide"><span>Description</span><textarea required rows="3" value={editing.description} onChange={(event) => set("description", event.target.value)} /></label><label className="template-checkbox template-field-wide"><input type="checkbox" checked={editing.registrationOpen} onChange={(event) => set("registrationOpen", event.target.checked)} /><span>Registration is open</span></label><div className="template-form-actions template-field-wide"><button className="template-btn" type="submit">Save event</button><button className="template-btn template-btn--ghost" type="button" onClick={() => setEditing(null)}>Cancel</button></div></form></TemplateDialog>}
    </div>
  );
}
