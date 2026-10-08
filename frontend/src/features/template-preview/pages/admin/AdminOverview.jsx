"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import StatCard from "@/src/components/dashboard/StatCard";
import StatusPill from "@/src/components/dashboard/StatusPill";
import TemplateDataTable from "@/src/components/dashboard/TemplateDataTable";
import { useTemplatePreview } from "../../context/TemplatePreviewContext";
import { templateContent } from "../../data/template-content";
import "@/src/styles/pages/template/admin.css";

const ParticipationChart = dynamic(() => import("@/src/components/dashboard/ParticipationChart"), { ssr: false });

export default function AdminOverview() {
  const { registrations, events } = useTemplatePreview();
  const { overview } = templateContent;
  const eventById = new Map(events.map((event) => [event.id, event]));
  const recent = registrations.slice(-5).reverse();
  const columns = [
    { key: "participant", label: "Participant", render: (row) => <div className="table-person"><strong>{row.participant}</strong><small>{row.email}</small></div> },
    { key: "event", label: "Event", render: (row) => eventById.get(row.eventId)?.name || "Event" },
    { key: "amount", label: "Amount", render: (row) => row.amount ? `₹${row.amount}` : "Free" },
    { key: "status", label: "Status", render: (row) => <StatusPill status={row.status} /> },
  ];

  return (
    <div className="template-page">
      <div className="template-page-head"><div><span className="template-eyebrow">Admin overview</span><h1>Good morning, Avery.</h1><p>Here is the event operation at a glance.</p></div><Link className="template-btn" href="/template/admin/events">Manage events</Link></div>
      <section className="template-overview-grid">
        <div className="template-stat-grid">
          <StatCard label="Signed-in users" value={overview.signedUsers} />
          <StatCard label="Registered users" value={overview.registeredUsers} tone="sage" />
          <StatCard label="Checked in" value={overview.checkedIn} tone="success" />
          <StatCard label="Revenue collected" value={overview.revenue} prefix="₹" tone="orange" />
        </div>
        <article className="template-panel participation-panel">
          <div className="template-panel-head"><div><span className="template-eyebrow">Live mix</span><h2>Participation by event</h2></div><Link href="/template/admin/registrations">View all</Link></div>
          <ParticipationChart data={overview.participation} />
        </article>
      </section>
      <section className="template-panel">
        <div className="template-panel-head"><div><span className="template-eyebrow">Latest activity</span><h2>Recent registrations</h2></div><Link href="/template/admin/registrations">Open registrations</Link></div>
        <TemplateDataTable columns={columns} rows={recent} />
      </section>
      <section className="template-panel">
        <div className="template-panel-head"><div><span className="template-eyebrow">Operations</span><h2>Venue readiness</h2></div><span>{overview.venues.length} active venues</span></div>
        <TemplateDataTable columns={[
          { key: "name", label: "Venue", render: (row) => <strong>{row.name}</strong> },
          { key: "event", label: "Event" },
          { key: "registrations", label: "Registrations" },
          { key: "checkedIn", label: "Checked in" },
          { key: "volunteer", label: "Volunteer" },
        ]} rows={overview.venues} />
      </section>
    </div>
  );
}
