"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, ClipboardList, CreditCard, LayoutDashboard, LogOut, PanelLeft, Ticket } from "lucide-react";
import { templateContent } from "@/src/features/template-preview/data/template-content";

const icons = {
  overview: LayoutDashboard,
  registrations: ClipboardList,
  payment: CreditCard,
  events: CalendarDays,
  schedule: CalendarDays,
  ticket: Ticket,
};

export default function TemplateSidebar({ role }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const navigation = templateContent.navigation[role];
  const user = templateContent.previewUsers[role];

  return (
    <>
      <aside className="template-sidebar" data-open={open || undefined}>
        <div className="template-sidebar__head">
          <button type="button" className="template-sidebar__toggle" aria-label={open ? "Collapse menu" : "Expand menu"} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
            <PanelLeft size={19} aria-hidden="true" />
          </button>
          <Link className="template-sidebar__brand" href="/" onClick={() => setOpen(false)}>
            <span className="template-sidebar__logo">{templateContent.brand.shortName}</span>
            <span className="template-sidebar__brand-copy"><strong>{templateContent.brand.eventName}</strong><small>{role} preview</small></span>
          </Link>
        </div>
        <nav className="template-sidebar__nav" aria-label={`${role} template sections`}>
          {navigation.map((item) => {
            const Icon = icons[item.icon] || LayoutDashboard;
            const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href} className="template-sidebar__link" data-active={active || undefined} title={item.label} onClick={() => setOpen(false)}>
                <Icon size={18} aria-hidden="true" />
                <span className="template-sidebar__label">{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="template-sidebar__foot">
          <div className="template-sidebar__user">
            <span className="template-sidebar__avatar">{user.initials}</span>
            <span className="template-sidebar__user-copy"><strong>{user.name}</strong><small>{user.email}</small></span>
          </div>
          <Link className="template-sidebar__link template-sidebar__exit" href="/">
            <LogOut size={18} aria-hidden="true" />
            <span className="template-sidebar__label">Exit preview</span>
          </Link>
        </div>
      </aside>
      <button type="button" className="template-sidebar__scrim" aria-label="Close menu" tabIndex={open ? 0 : -1} onClick={() => setOpen(false)} />
    </>
  );
}
