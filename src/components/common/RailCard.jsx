import ProtectedMedia from "./ProtectedMedia.jsx";
import { Play } from "./Icons.jsx";

export default function RailCard({ item, aspect = "1 / 1" }) {
  if (!item) return null;
  const href = item.href || (item.slug ? `#${item.slug}` : undefined);
  const subtitle =
    item.subtitle ||
    item.category ||
    (item.kind === "podcast" ? "Podcast" : item.kind === "show" ? "Show" : item.excerpt);

  return (
    <a href={href} className="nlm-rail-card group">
      <div className="nlm-rail-card__art" style={{ aspectRatio: aspect }}>
        <ProtectedMedia src={item.media} alt={item.title} controls={false} autoPlay={item.autoPlay ?? false} />
        <span className="nlm-rail-card__play" aria-hidden="true">
          <Play size={20} />
        </span>
      </div>
      <h3 className="nlm-rail-card__title">{item.title}</h3>
      {subtitle && <p className="nlm-rail-card__subtitle">{subtitle}</p>}
    </a>
  );
}
