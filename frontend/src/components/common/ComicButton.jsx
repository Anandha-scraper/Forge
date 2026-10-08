import "@/src/styles/components/comic-button.css";
export default function ComicButton({ children, ...props }) { return <button className="comic-button" {...props}>{children}</button> }
