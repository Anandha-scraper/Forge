const icons = { Technical: "⌘", "Non-Technical": "✦", Hackathon: "⚑", Workshop: "⌁" };

export default function TrackCard({ label, image, accent, tint, selected = false, onClick }) {
  return (
    <button
      type="button"
      className={`track-card${selected ? " track-card--selected" : ""}`}
      style={{ "--track-tint": tint, "--track-accent": accent }}
      aria-label={selected ? `Return to all event categories from ${label}` : `Show ${label} events`}
      aria-expanded={selected}
      onClick={onClick}
    >
      <div className="track-header">
        <span className="track-icon">{icons[label] || "✦"}</span>
        <p>{label}</p>
      </div>
      <div className="track-card-art">
        <img src={image} alt={`${label} category artwork`} loading="lazy" />
      </div>
      {selected && <span className="track-card-return">← All categories</span>}
    </button>
  );
}
