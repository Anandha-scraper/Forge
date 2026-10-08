"use client";

import { useEffect, useRef, useState } from "react";
import "@/src/styles/components/animation/logo-loop.css";

/** Continuously wraps an independently measured wordmark sequence. */
export default function LogoLoop({ items = [] }) {
  const sequenceRef = useRef(null);
  const trackRef = useRef(null);
  const [sequenceWidth, setSequenceWidth] = useState(0);

  useEffect(() => {
    const measure = () => setSequenceWidth(sequenceRef.current?.getBoundingClientRect().width || 0);
    const observer = new ResizeObserver(measure);
    if (sequenceRef.current) observer.observe(sequenceRef.current);
    measure();
    return () => observer.disconnect();
  }, [items]);

  useEffect(() => {
    if (!sequenceWidth || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    let frame;
    let previous;
    let offset = 0;
    const move = (now) => {
      const elapsed = previous ? Math.min((now - previous) / 1000, 0.05) : 0;
      previous = now;
      offset = (offset + elapsed * 62) % sequenceWidth;
      if (trackRef.current) trackRef.current.style.transform = `translate3d(${-offset}px,0,0)`;
      frame = requestAnimationFrame(move);
    };
    frame = requestAnimationFrame(move);
    return () => cancelAnimationFrame(frame);
  }, [sequenceWidth]);

  const sequence = <div className="logo-loop__sequence" ref={sequenceRef}>{items.map((item, index) => <span key={`${item}-${index}`}>{item}</span>)}</div>;
  return <div className="logo-loop" aria-label="Organisation wordmarks"><div className="logo-loop__track" ref={trackRef}>{sequence}{[1,2,3].map((copy) => <div className="logo-loop__sequence" aria-hidden="true" key={copy}>{items.map((item, index) => <span key={`${copy}-${item}-${index}`}>{item}</span>)}</div>)}</div></div>;
}
