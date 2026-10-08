"use client";
import { useState } from "react";
import SplitFlapText from "@/src/components/animation/SplitFlapText";
import BracketButton from "@/src/components/common/BracketButton";
import Loader from "@/src/components/common/Loader";
import TrackCard from "./TrackCard";
import EventPoster from "./EventPoster";
import EventNotice from "./EventNotice";
import { landingContent } from "../../data/landing-content";
import "./events-preview.css";
export default function EventsPreview({ onRegister }) { const [selected,setSelected]=useState(null); const [loading,setLoading]=useState(false); const eventsFor=category=>landingContent.events.filter(event=>event.category===category); const toggle=category=>{const next=selected===category?null:category;setSelected(next);if(next){setLoading(true);window.setTimeout(()=>setLoading(false),350)}}; const tracks=landingContent.eventCategories.map((label,index)=>({label,...landingContent.trackMeta[index]})); const shownTracks=selected?tracks.filter(track=>track.label===selected):tracks; return <section id="events" className="template-section events-template"><div className="template-section-inner"><div className="events-top"><SplitFlapText text="EVENTS"/><BracketButton>Tap a category to see events</BracketButton></div><EventNotice/><div className="events-lineup">{shownTracks.map(track=><TrackCard key={track.label} {...track} expanded={selected===track.label} onClick={()=>toggle(track.label)}/>) }{selected&&<div className={`events-scatter${loading?" events-scatter--status":""}`}>{loading?<Loader label="Loading events"/>:eventsFor(selected).map(event=><EventPoster key={event.id} event={event} onRegister={onRegister}/>)}</div>}</div></div></section> }
