import ProtectedMedia from "./ProtectedMedia.jsx";
import { Play } from "./Icons.jsx";

export default function MosaicCard({ item }) {
  if (!item) return null;
  const { title, author, action, media, color, size = "box", href } = item;
  const hasMedia = !!media;
  const tone = item.tone || (hasMedia ? "light" : color ? "light" : "dark");

  const Wrapper = href ? "a" : "div";

  return (
    <Wrapper
      href={href}
      className={`nlm-mosaic-card nlm-mosaic-card--${size} group`}
      data-tone={tone}
      style={color && !hasMedia ? { background: color } : undefined}
    >
      {hasMedia && (
        <div className="nlm-mosaic-card__bg">
          <ProtectedMedia src={media} alt={title} controls={false} autoPlay={item.autoPlay ?? false} />
          <span className="nlm-mosaic-card__scrim" aria-hidden="true" />
        </div>
      )}

      <div className="nlm-mosaic-card__content">
        <div className="nlm-mosaic-card__top">
          {title && <h3 className="nlm-mosaic-card__title">{title}</h3>}
          {author && <p className="nlm-mosaic-card__author">{author}</p>}
        </div>

        <div className="nlm-mosaic-card__bottom">
          <span className="nlm-mosaic-card__play" aria-hidden="true">
            <Play size={16} />
          </span>
          {action?.label && (
            <span className="nlm-mosaic-card__action">{action.label}</span>
          )}
        </div>
      </div>
    </Wrapper>
  );
}
