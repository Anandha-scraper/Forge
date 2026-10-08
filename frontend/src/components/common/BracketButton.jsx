import "@/src/styles/components/bracket-button.css";
export default function BracketButton({ children, ...props }) { return <button className="bracket-button" {...props}><span>{children}</span></button> }
