import Container from "../common/Container.jsx";
import ProtectedMedia from "../common/ProtectedMedia.jsx";
import Rail from "../common/Rail.jsx";

export default function ArtistRail({ data = {}, items = [] }) {
  const { title, cta, id } = data;

  return (
    <Container as="section" id={id} style={{ paddingBlock: "clamp(2.5rem, 5vw, 4rem)" }}>
      {(title || cta) && (
        <div
          className="flex items-end justify-between gap-6"
          style={{ flexWrap: "wrap", marginBottom: "1.5rem" }}
        >
          {title && <h2 className="nlm-rail-title">{title}</h2>}
          {cta && (
            <a href={cta.href} className="nlm-rail-seeall">
              {cta.label}
            </a>
          )}
        </div>
      )}

      <Rail className="nlm-artist-rail nlm-scrollbar-hide">
        {items.map((item, i) => {
          const role = item.role || item.subtitle || item.category;
          return (
            <a key={item.slug || i} href={item.href} className="nlm-artist nlm-reveal group">
              <div className="nlm-artist__avatar">
                <ProtectedMedia src={item.media} alt={item.title} controls={false} autoPlay={false} />
              </div>
              <span className="nlm-artist__name">{item.title}</span>
              {role && <span className="nlm-artist__role">{role}</span>}
            </a>
          );
        })}
      </Rail>
    </Container>
  );
}
