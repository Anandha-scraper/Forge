"use client";
import { landingContent } from "../../data/landing-content";
import PillNav from "@/src/components/animation/PillNav";
import StaggeredMenu from "@/src/components/animation/StaggeredMenu";
import "@/src/styles/pages/landing/navbar.css";
export default function Navbar() { return <header className="template-navbar"><a className="template-brand" href="#top" aria-label="Back to top"><span>{landingContent.brand.shortName}</span><b>{landingContent.brand.name}</b></a><div className="template-desktop"><PillNav items={landingContent.navigation}/></div><div className="template-mobile"><StaggeredMenu items={landingContent.navigation}/></div></header> }
