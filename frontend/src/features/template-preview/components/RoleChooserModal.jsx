"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, LayoutDashboard, Ticket } from "lucide-react";
import { templateContent } from "../data/template-content";
import "@/src/styles/components/template/role-chooser.css";
import "@/src/styles/components/template/role-chooser-register.css";

const icons = { admin: LayoutDashboard, participant: Ticket };

export default function RoleChooserModal({ onClose }) {
  const dialogRef = useRef(null);
  const copy = templateContent.chooser;

  useEffect(() => {
    const previous = document.activeElement;
    const dialog = dialogRef.current;
    const focusable = () => [...dialog.querySelectorAll('a[href], button:not([disabled])')];
    focusable()[0]?.focus();

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab") return;
      const items = focusable();
      if (!items.length) return;
      const first = items[0];
      const last = items.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previous?.focus?.();
    };
  }, [onClose]);

  return (
    <div className="role-chooser-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section ref={dialogRef} className="role-chooser" role="dialog" aria-modal="true" aria-labelledby="role-chooser-title">
        <button type="button" className="role-chooser__close" onClick={onClose} aria-label="Close template chooser">×</button>
        <p className="role-chooser__eyebrow">{copy.eyebrow}</p>
        <h2 id="role-chooser-title">{copy.title}</h2>
        <p className="role-chooser__intro">{copy.description}</p>
        <div className="role-chooser__grid">
          {copy.roles.map(({ key, title, description, href }) => {
            const Icon = icons[key];
            return (
              <Link key={key} className={`role-choice role-choice--${key}`} href={href} onClick={onClose}>
                <span className="role-choice__icon"><Icon size={22} aria-hidden="true" /></span>
                <strong>{title}</strong>
                <small>{description}</small>
                <span className="role-choice__action">Open preview <ArrowRight size={16} aria-hidden="true" /></span>
              </Link>
            );
          })}
        </div>
        <button type="button" className="role-chooser__register" disabled>
          {copy.registerButtonLabel}
        </button>
      </section>
    </div>
  );
}
