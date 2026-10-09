"use client";

import { useState } from "react";
import SplitFlapText from "@/src/components/animation/SplitFlapText";
import BracketButton from "@/src/components/common/BracketButton";
import EventNotice from "./EventNotice";
import EventPoster from "./EventPoster";
import TrackCard from "./TrackCard";
import { landingContent } from "../../data/landing-content";
import "@/src/styles/pages/landing/events-preview.css";

export default function EventsPreview({ onRegister }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const tracks = landingContent.eventCategories.map((label, index) => ({
    label,
    ...landingContent.trackMeta[index],
  }));
  const selectedTrack = tracks.find((track) => track.label === selectedCategory);
  const selectedEvents = landingContent.events.filter((event) => event.category === selectedCategory);

  const toggleCategory = (category) => {
    setSelectedCategory((current) => current === category ? null : category);
  };

  return (
    <section id="events" className="template-section events-template">
      <div className="template-section-inner">
        <div className="events-top">
          <SplitFlapText text="EVENTS" />
          <BracketButton>Choose a category</BracketButton>
        </div>
        <EventNotice />
        <div className={`events-lineup${selectedCategory ? " events-lineup--selected" : ""}`}>
          {selectedCategory ? (
            <>
              <TrackCard
                {...selectedTrack}
                selected
                onClick={() => toggleCategory(selectedCategory)}
              />
              <div className="events-poster-grid" aria-label={`${selectedCategory} events`}>
                {selectedEvents.map((event) => (
                  <EventPoster key={event.id} event={event} onRegister={onRegister} />
                ))}
              </div>
            </>
          ) : (
            tracks.map((track) => (
              <TrackCard key={track.label} {...track} onClick={() => toggleCategory(track.label)} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
