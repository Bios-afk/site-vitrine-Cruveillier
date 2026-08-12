import Container from "../common/Container.jsx";
import Reveal from "../common/Reveal.jsx";
import ProtectedMedia from "../common/ProtectedMedia.jsx";

export default function PortraitBand({ data }) {
  const {
    id,
    title,
    image,
    paragraphs = [],
    transition,
    quotes = [],
  } = data || {};

  return (
    <Container as="section" id={id} style={{ paddingBlock: "clamp(2.5rem, 5vw, 4rem)" }}>
      <Reveal
        className="nlm-split"
        style={{ "--split-cols": "2fr 3fr", gap: "2.5rem" }}
      >
        {image?.src && (
          <div style={{ position: "relative" }}>
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: "1rem -1rem -1rem 1rem",
                background: "var(--accent)",
                borderRadius: "var(--radius-lg)",
                zIndex: -1,
              }}
            />
            <div
              style={{
                position: "relative",
                aspectRatio: "4 / 5",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                boxShadow: "0 24px 50px -28px rgba(0, 0, 0, 0.35)",
              }}
            >
              <ProtectedMedia src={image} />
            </div>
          </div>
        )}

        <div>
          {title && (
            <h2
              className="nlm-display nlm-text-balance"
              style={{ fontSize: "clamp(1.7rem, 3.4vw, 2.4rem)" }}
            >
              {title}
            </h2>
          )}

          {paragraphs.map((p, i) => (
            <p key={i} style={{ marginTop: "1.1rem", color: "var(--foreground-secondary)", lineHeight: 1.65 }}>
              {p}
            </p>
          ))}

          {transition && (
            <p style={{ marginTop: "1.1rem", color: "var(--foreground-secondary)", lineHeight: 1.65 }}>
              {transition}
            </p>
          )}

          {quotes.map((q, i) => (
            <blockquote key={i} className="nlm-pullquote">
              « {q} »
            </blockquote>
          ))}
        </div>
      </Reveal>
    </Container>
  );
}
