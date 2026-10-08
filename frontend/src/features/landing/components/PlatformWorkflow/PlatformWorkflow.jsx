import { ArrowDown, ArrowRight } from "lucide-react";
import SplitFlapText from "@/src/components/animation/SplitFlapText";
import { landingContent } from "../../data/landing-content";
import "@/src/styles/pages/landing/platform-workflow.css";
export default function PlatformWorkflow(){return <section id="workflow" className="workflow section-frame"><div className="section-intro"><p className="eyebrow">From idea to operating platform</p><SplitFlapText text="WORKFLOW"/><h2>A clear path to <span>launch day.</span></h2><p>Every organisation starts with a clean workspace. EventForge handles the heavy lifting so your team can focus on the experience.</p></div><div className="workflow-grid">{landingContent.workflowSteps.map((step,i)=><div className="workflow-step" key={step.number}><div className="step-number">{step.number}</div><h3>{step.title}</h3><p>{step.text}</p>{i<3&&<ArrowRight className="step-arrow" size={18}/>}</div>)}</div></section>}
