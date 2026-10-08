"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "@/src/styles/components/animation/staggered-menu.css";

/** Full-width mobile drawer with the SpringFest staggered link entrance. */
export default function StaggeredMenu({ items = [] }) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return undefined;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const links = panel.querySelectorAll(".sm-panel-itemLabel");
    if (prefersReduced) {
      gsap.set(panel, { xPercent: open ? 0 : 100, autoAlpha: open ? 1 : 0 });
      return undefined;
    }
    if (open) {
      gsap.set(panel, { autoAlpha: 1 });
      gsap.timeline().fromTo(panel, { xPercent: 100 }, { xPercent: 0, duration: 0.58, ease: "power4.out" })
        .fromTo(links, { yPercent: 140, rotate: 10 }, { yPercent: 0, rotate: 0, duration: 0.82, stagger: 0.09, ease: "power4.out" }, "-=.3");
    } else {
      gsap.to(panel, { xPercent: 100, duration: 0.3, ease: "power3.in", onComplete: () => gsap.set(panel, { autoAlpha: 0 }) });
    }
  }, [open]);

  return <div className="staggered-menu-wrapper"><button ref={toggleRef} className="sm-toggle" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="landing-mobile-menu"><span className="sm-toggle-textWrap"><span className="sm-toggle-textInner"><span>{open ? "Close" : "Menu"}</span></span></span><span className="sm-icon" aria-hidden="true"><i className="sm-icon-line"/><i className="sm-icon-line sm-icon-line--vertical"/></span></button><nav ref={panelRef} id="landing-mobile-menu" className="staggered-menu-panel" aria-label="Mobile navigation"> <ul className="sm-panel-list">{items.map((item, index) => <li key={item.href}><a className="sm-panel-item" href={item.href} onClick={() => setOpen(false)}><span className="sm-panel-itemLabel">{item.label}</span><sup>{String(index + 1).padStart(2, "0")}</sup></a></li>)}</ul></nav></div>;
}
