import "@/src/styles/components/loader.css";
export default function Loader({ label="Loading" }) { return <div className="system-loader" role="status"><span/><span/><span/><small>{label}</small></div> }
