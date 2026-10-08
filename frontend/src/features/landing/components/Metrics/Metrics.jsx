import { landingContent } from "../../data/landing-content";
import CountUp from "@/src/components/animation/CountUp";
import "@/src/styles/pages/landing/metrics.css";
export default function Metrics(){return <section className="metrics section-frame">{landingContent.metrics.map(metric=><div key={metric.label}><strong><CountUp value={metric.value}/></strong><span>{metric.label}</span></div>)}</section>}
