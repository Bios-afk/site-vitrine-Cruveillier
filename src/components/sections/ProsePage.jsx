import Container from "../common/Container.jsx";
import Reveal from "../common/Reveal.jsx";
import { Spark } from "../common/Icons.jsx";

export default function ProsePage({ data = {} }) {
  const { eyebrow, title, updated, intro, sections = [] } = data;

  return (
    <Container style={{ maxWidth: "48rem", paddingTop: "9rem", paddingBottom: "clamp(3rem, 6vw, 5rem)" }}>
      <Reveal>
        {eyebrow && (
          <p className="nlm-eyebrow">
            <Spark size={14} className="nlm-accent-text" />
            {eyebrow}
          </p>
        )}
        <h1
          style={{
            marginTop: "1rem",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
            fontSize: "clamp(2.2rem, 5vw, 3.4rem)",
          }}
        >
          {title}
        </h1>
        {updated && (
          <p style={{ marginTop: "0.75rem", color: "var(--foreground-muted)", fontSize: "0.9rem" }}>
            Last updated {updated}
          </p>
        )}
        {intro && (
          <p style={{ marginTop: "1.25rem", color: "var(--foreground-secondary)", fontSize: "1.1rem", lineHeight: 1.7 }}>
            {intro}
          </p>
        )}
      </Reveal>

      <div style={{ marginTop: "2.5rem" }}>
        {sections.map((s, i) => (
          <Reveal key={i} delay={i * 0.03} style={{ marginBottom: "2rem" }}>
            {s.heading && (
              <h2 style={{ fontWeight: 700, fontSize: "1.35rem", letterSpacing: "-0.01em", marginBottom: "0.75rem" }}>
                {s.heading}
              </h2>
            )}
            {(s.paragraphs || []).map((p, j) => (
              <p
                key={j}
                style={{
                  color: "var(--foreground-secondary)",
                  fontSize: "1.02rem",
                  lineHeight: 1.7,
                  marginBottom: "0.9rem",
                }}
              >
                {p}
              </p>
            ))}
          </Reveal>
        ))}
      </div>
    </Container>
  );
}
