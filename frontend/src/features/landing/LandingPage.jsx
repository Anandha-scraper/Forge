"use client";
import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import EventsPreview from "./components/EventsPreview/EventsPreview";
import Schedule from "./components/Schedule/Schedule";
import Footer from "./components/Footer/Footer";
import ClickSpark from "@/src/components/animation/ClickSpark";
import PageBoundary from "@/src/components/common/PageBoundary";
import { landingContent } from "./data/landing-content";
import "./landing.css";
export default function LandingPage() { const [modal, setModal] = useState(false); return <ClickSpark><div className="site-shell"><Navbar /><main><PageBoundary><Hero onRequest={() => setModal(true)} /><EventsPreview onRegister={() => setModal(true)} /><Schedule /></PageBoundary></main><Footer onRequest={() => setModal(true)} />{modal && <RequestModal onClose={() => setModal(false)} />}</div></ClickSpark>; }
function RequestModal({ onClose }) { const [done, setDone] = useState(false); const copy = landingContent.actions; return <div className="modal-backdrop" role="presentation" onMouseDown={e => e.target === e.currentTarget && onClose()}><div className="request-modal" role="dialog" aria-modal="true" aria-labelledby="request-title"><button className="modal-close" onClick={onClose} aria-label="Close">×</button>{done ? <><span className="success-mark">✓</span><h2>{copy.successTitle}</h2><p>{copy.successDescription}</p><button className="button button-primary" onClick={onClose}>Close</button></> : <><p className="eyebrow">{copy.eyebrow}</p><h2 id="request-title">{copy.title}</h2><p>{copy.description}</p><form onSubmit={e => { e.preventDefault(); setDone(true); }}><input required placeholder={copy.organisationPlaceholder} /><input required type="email" placeholder={copy.emailPlaceholder} /><button className="button button-primary">{copy.submitLabel} <span>↗</span></button></form></>}</div></div>; }
