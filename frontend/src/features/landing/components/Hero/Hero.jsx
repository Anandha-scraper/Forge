import { Building2, CalendarDays, LogIn, MapPin, QrCode, Users } from "lucide-react";
import { landingContent } from "../../data/landing-content";
import LogoLoop from "@/src/components/animation/LogoLoop";
import ComicButton from "@/src/components/common/ComicButton";
import "./hero.css";

const stepIcons = [LogIn, CalendarDays, Users, QrCode];

export default function Hero({ onRequest }) {
  const { brand, event, registrationSteps } = landingContent;
  return <section id="top" className="template-hero"><div className="template-pastels" aria-hidden="true"><i/><i/><i/><i/></div><div className="template-veil"/><div className="template-wordmarks"><LogoLoop items={landingContent.wordmarks}/></div><div className="hero-card"><header className="hero-card-header"><strong>{brand.name} · {event.name} {event.year}</strong><span>▣ {event.type}</span></header><div className="hero-card-body"><p className="hero-kicker">{event.type}</p><p className="hero-description">{event.tagline} {event.description}</p><div className="hero-meta"><Meta icon={CalendarDays} text={event.dates}/><Meta icon={MapPin} text={event.location}/><Meta icon={Building2} text={event.department}/></div><h2>How to get started</h2><div className="registration-steps">{registrationSteps.map((step,i)=>{const Icon=stepIcons[i];return <article key={step.number}><b>{step.number}</b><span><Icon size={18}/></span><p>{step.title}</p></article>})}</div><div className="hero-cta"><ComicButton onClick={onRequest}>Get started</ComicButton></div></div></div></section>
}
function Meta({ icon: Icon, text }) { return <span><Icon size={15}/>{text}</span> }
