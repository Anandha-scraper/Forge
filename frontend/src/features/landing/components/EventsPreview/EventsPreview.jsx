"use client";
import SplitFlapText from "@/src/components/animation/SplitFlapText";
import BracketButton from "@/src/components/common/BracketButton";
import TrackCard from "./TrackCard";
import EventNotice from "./EventNotice";
import { landingContent } from "../../data/landing-content";
import "./events-preview.css";

export default function EventsPreview({ onRegister }) {
  const tracks = landingContent.eventCategories.map((label, index) => ({ label, ...landingContent.trackMeta[index] }));
  return <section id="events" className="template-section events-template"><div className="template-section-inner">
    <div className="events-top"><SplitFlapText text="EVENTS"/><BracketButton>Tap a card to flip for details</BracketButton></div>
    <EventNotice/>
    <div className="events-lineup">{tracks.map(track => <TrackCard key={track.label} {...track} events={landingContent.events.filter(event => event.category === track.label)} onRegister={onRegister}/>)}</div>
  </div></section>;
}
