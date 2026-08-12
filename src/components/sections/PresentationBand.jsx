import Container from "../common/Container.jsx";
import Reveal from "../common/Reveal.jsx";
import ProtectedMedia from "../common/ProtectedMedia.jsx";
import { Icon } from "../common/Icons.jsx";

export default function PresentationBand({ data }) {
  const {
    eyebrow,
    title,
    image,
    paragraphsBefore = [],
    badges = [],
    paragraphsAfter = [],
  } = data || {};

  return (
    <Container as="section" style={{ paddingBlock: "clamp(2.5rem, 5vw, 4rem)" }}>
      <Reveal
        style={{
          borderRadius: "var(--radius-xl)",
          background: "var(--hero-surface)",
          color: "var(--on-hero)",
          overflow: "hidden",
        }}
      >
        <div
          className="nlm-split"
          style={{ "--split-cols": "1fr 1.1fr", "--split-align": "stretch", gap: 0 }}
        >
          {image && (
            <div style={{ position: "relative", minHeight: "22rem" }}>
              <ProtectedMedia
                src={image}
                alt={image.alt}
                imgProps={{ loading: "lazy", style: { position: "absolute", inset: 0 } }}
              />
            </div>
          )}

          <div style={{ padding: "clamp(2rem, 5vw, 3.5rem)" }}>
            {eyebrow && (
              <p className="nlm-eyebrow" style={{ color: "var(--on-hero-muted)" }}>
                <Icon name="scales" size={14} className="nlm-accent-text" />
                {eyebrow}
              </p>
            )}

            {title && (
              <h2
                className="nlm-display nlm-text-balance"
                style={{ marginTop: "1rem", fontSize: "clamp(1.7rem, 3.4vw, 2.4rem)" }}
              >
                {title}
              </h2>
            )}

            {paragraphsBefore.map((p, i) => (
              <p key={`before-${i}`} style={{ marginTop: "1.1rem", color: "var(--on-hero-muted)", lineHeight: 1.65 }}>
                {p}
              </p>
            ))}

            {badges.length > 0 && (
              <div style={{ marginTop: "1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {badges.map((b, i) => (
                  <div key={i} className="nlm-presentation-badge">
                    <span className="nlm-presentation-badge__icon">
                      <Icon name={b.icon} size={16} />
                    </span>
                    <span>{b.text}</span>
                  </div>
                ))}
              </div>
            )}

            {paragraphsAfter.map((p, i) => (
              <p key={`after-${i}`} style={{ marginTop: "1.1rem", color: "var(--on-hero-muted)", lineHeight: 1.65 }}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </Reveal>
    </Container>
  );
}
