"use client";

import { useMemo, useState } from "react";
import StatusPill from "@/src/components/dashboard/StatusPill";
import TemplateDataTable from "@/src/components/dashboard/TemplateDataTable";
import TemplateDialog from "@/src/components/dashboard/TemplateDialog";
import { useTemplatePreview } from "../../context/TemplatePreviewContext";
import "@/src/styles/pages/template/admin.css";

export default function AdminRegistrations() {
  const { registrations, events } = useTemplatePreview();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [selected, setSelected] = useState(null);
  const eventById = new Map(events.map((event) => [event.id, event]));
  const filtered = useMemo(() => registrations.filter((row) => {
    const haystack = `${row.participant} ${row.email} ${row.id} ${eventById.get(row.eventId)?.name}`.toLowerCase();
    return haystack.includes(query.toLowerCase()) && (status === "all" || row.status === status);
  }), [eventById, query, registrations, status]);

  const columns = [
    { key: "participant", label: "Participant", render: (row) => <div className="table-person"><strong>{row.participant}</strong><small>{row.email}</small></div> },
    { key: "event", label: "Event", render: (row) => eventById.get(row.eventId)?.name || "Event" },
    { key: "teamSize", label: "Team" },
    { key: "amount", label: "Amount", render: (row) => row.amount ? `₹${row.amount}` : "Free" },
    { key: "status", label: "Status", render: (row) => <StatusPill status={row.status} /> },
    { key: "action", label: "", render: (row) => <button type="button" className="template-link-button" onClick={() => setSelected(row)}>Details</button> },
  ];

  return (
    <div className="template-page">
      <div className="template-page-head"><div><span className="template-eyebrow">People and teams</span><h1>Registrations</h1><p>Search, filter and inspect every mock registration.</p></div><span className="template-count">{filtered.length} records</span></div>
      <section className="template-panel">
        <div className="template-filter-bar">
          <label><span>Search registrations</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Name, email, event or ID" /></label>
          <label><span>Status</span><select value={status} onChange={(event) => setStatus(event.target.value)}><option value="all">All statuses</option><option value="completed">Completed</option><option value="awaiting_approval">Awaiting approval</option><option value="draft">Draft</option><option value="rejected">Rejected</option></select></label>
        </div>
        <TemplateDataTable columns={columns} rows={filtered} />
      </section>
      {selected && <TemplateDialog title="Registration details" onClose={() => setSelected(null)}><div className="template-detail-grid"><Detail label="Registration ID" value={selected.id} /><Detail label="Participant" value={selected.participant} /><Detail label="Email" value={selected.email} /><Detail label="Phone" value={selected.phone} /><Detail label="Event" value={eventById.get(selected.eventId)?.name} /><Detail label="Team size" value={selected.teamSize} /><Detail label="Amount" value={selected.amount ? `₹${selected.amount}` : "Free"} /><Detail label="Allocation" value={selected.allocationCode} /></div><div className="template-dialog-actions"><StatusPill status={selected.status} /><button type="button" className="template-btn" onClick={() => setSelected(null)}>Done</button></div></TemplateDialog>}
    </div>
  );
}

function Detail({ label, value }) { return <div><span>{label}</span><strong>{value}</strong></div>; }
