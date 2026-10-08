import { Cloud, Database, KeyRound, Server } from "lucide-react";
import { landingContent } from "../../data/landing-content";
import "./infrastructure.css";
const icons=[Server,Database,Cloud,KeyRound];
export default function Infrastructure(){return <section id="infrastructure" className="infra section-frame"><div className="infra-copy"><p className="eyebrow">The foundation underneath</p><h2>Infrastructure that is <span>ready when you are.</span></h2><p>Launch each organisation with a predictable, isolated foundation. No shared spreadsheets. No mystery configuration. No infrastructure fire drills.</p><a href="#pricing" className="text-link">See how it works <span>↗</span></a></div><div className="infra-list">{landingContent.infrastructureItems.map((item,i)=>{const Icon=icons[i];return <div className="infra-item" key={item.title}><Icon size={19}/><div><h3>{item.title}</h3><p>{item.text}</p></div><span>0{i+1}</span></div>})}</div></section>}
