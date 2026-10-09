import "@/src/styles/components/pixel-loader.css";

const ghostBlocks = ["top0", "top1", "top2", "top3", "top4", "st0", "st1", "st2", "st3", "st4", "st5"];
const flickerPixels = Array.from({ length: 18 }, (_, index) => index + 1);

export default function Loader({ label = "Loading", variant = "panel" }) {
  const safeVariant = ["page", "panel", "compact"].includes(variant) ? variant : "panel";

  return (
    <div className={`pixel-loader pixel-loader--${safeVariant}`} role="status" aria-live="polite">
      <span className="pixel-loader__sr-only">{label}</span>
      <div className="pixel-loader__scene" aria-hidden="true">
        <div className="pixel-loader__ghost">
          {ghostBlocks.map((block) => <i className={`pixel-loader__block pixel-loader__block--${block}`} key={block} />)}
          <i className="pixel-loader__eye pixel-loader__eye--left" />
          <i className="pixel-loader__eye pixel-loader__eye--right" />
          <i className="pixel-loader__pupil pixel-loader__pupil--left" />
          <i className="pixel-loader__pupil pixel-loader__pupil--right" />
          {flickerPixels.map((item) => <i className={`pixel-loader__pixel pixel-loader__pixel--${item}`} key={item} />)}
        </div>
        <span className="pixel-loader__shadow" />
      </div>
      <small className="pixel-loader__label" aria-hidden="true">{label}</small>
    </div>
  );
}
