import { landingContent } from "../../data/landing-content";
import LogoLoop from "@/src/components/animation/LogoLoop";
import "@/src/styles/pages/landing/trusted-organisations.css";
export default function TrustedOrganisations(){return <section className="trusted section-frame"><p>Powering the next generation of event organisations</p><LogoLoop items={landingContent.organisations}/></section>}
