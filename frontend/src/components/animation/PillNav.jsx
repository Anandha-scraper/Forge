"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "@/src/styles/components/animation/pill-nav.css";

/** SpringFest-style desktop navigation, kept data-driven for tenant pages. */
export default function PillNav({ items = [] }) {
  const circleRefs = useRef([]);
  const timelines = useRef([]);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion.current) return undefined;

    const layout = () => {
      circleRefs.current.forEach((circle, index) => {
        const pill = circle?.parentElement;
        if (!pill) return;
        const { width, height } = pill.getBoundingClientRect();
        const radius = ((width * width) / 4 + height * height) / (2 * height);
        const diameter = Math.ceil(2 * radius) + 2;
        const inset = Math.ceil(radius - Math.sqrt(Math.max(0, radius * radius - (width * width) / 4))) + 1;
        circle.style.width = `${diameter}px`;
        circle.style.height = `${diameter}px`;
        circle.style.bottom = `-${inset}px`;
        const label = pill.querySelector(".pill-label");
        const hover = pill.querySelector(".pill-label-hover");
        gsap.set(circle, { xPercent: -50, scale: 0, transformOrigin: `50% ${diameter - inset}px` });
        gsap.set(label, { y: 0 });
        gsap.set(hover, { y: height + 16, opacity: 0 });
        timelines.current[index]?.kill();
        timelines.current[index] = gsap.timeline({ paused: true })
          .to(circle, { scale: 1.2, xPercent: -50, duration: 1.2, ease: "power3.out" }, 0)
          .to(label, { y: -(height + 8), duration: 1.2, ease: "power3.out" }, 0)
          .to(hover, { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }, 0);
      });
    };
    layout();
    window.addEventListener("resize", layout);
    return () => {
      window.removeEventListener("resize", layout);
      timelines.current.forEach((timeline) => timeline?.kill());
    };
  }, [items]);

  const animate = (index, open) => {
    if (reducedMotion.current) return;
    const timeline = timelines.current[index];
    if (timeline) timeline.tweenTo(open ? timeline.duration() : 0, { duration: open ? 0.28 : 0.2, ease: "power3.out" });
  };

  return <nav className="pill-nav" aria-label="Primary navigation"><ul className="pill-list">{items.map((item, index) => <li key={item.href}><a className="pill" href={item.href} onMouseEnter={() => animate(index, true)} onMouseLeave={() => animate(index, false)}><span className="hover-circle" aria-hidden="true" ref={(element) => { circleRefs.current[index] = element; }}/><span className="label-stack"><span className="pill-label">{item.label}</span><span className="pill-label-hover" aria-hidden="true">{item.label}</span></span></a></li>)}</ul></nav>;
}
