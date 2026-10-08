import { BarChart3, CreditCard, Palette, QrCode, ShieldCheck, UsersRound } from "lucide-react";
import { landingContent } from "../../data/landing-content";
import SplitFlapText from "@/src/components/animation/SplitFlapText";
import "./feature-grid.css";
const icons=[UsersRound,CreditCard,QrCode,BarChart3,Palette,ShieldCheck];
export default function FeatureGrid(){return <section id="platform" className="features section-frame"><div className="section-intro"><p className="eyebrow">One platform, all the moving parts</p><SplitFlapText text="PLATFORM"/><h2>Built around how events <span>actually work.</span></h2></div><div className="feature-grid">{landingContent.features.map((feature,i)=>{const Icon=icons[i];return <article className="feature-card" key={feature.eyebrow}><span className="feature-no">{feature.eyebrow}</span><Icon size={22}/><h3>{feature.title}</h3><p>{feature.text}</p><span className="feature-link">Explore capability ↗</span></article>})}</div></section>}
