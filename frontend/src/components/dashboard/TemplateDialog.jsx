"use client";

import { useEffect, useRef } from "react";

export default function TemplateDialog({ title, children, onClose, size = "default" }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const previous = document.activeElement;
    const dialog = dialogRef.current;
    const items = () => [...dialog.querySelectorAll('button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href]')];
    items()[0]?.focus();
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab") return;
      const focusable = items();
      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => { document.removeEventListener("keydown", onKeyDown); previous?.focus?.(); };
  }, [onClose]);

  return (
    <div className="template-dialog-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section ref={dialogRef} className={`template-dialog template-dialog--${size}`} role="dialog" aria-modal="true" aria-labelledby="template-dialog-title">
        <header><h2 id="template-dialog-title">{title}</h2><button type="button" onClick={onClose} aria-label="Close dialog">×</button></header>
        {children}
      </section>
    </div>
  );
}
