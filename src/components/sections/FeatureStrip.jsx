import Container from "../common/Container.jsx";
import Reveal from "../common/Reveal.jsx";
import { Icon } from "../common/Icons.jsx";

export default function FeatureStrip({ data }) {
  const { features = [] } = data || {};

  return (
    <Container as="section" style={{ paddingBlock: "clamp(3rem, 6vw, 5rem)" }}>
      <div className="nlm-values">
        {features.map((f, i) => (
          <Reveal key={i} delay={i * 0.08} className="nlm-values__item">
            <span
              className="grid place-items-center"
              style={{
                width: "3rem",
                height: "3rem",
                borderRadius: "999px",
                background: "color-mix(in oklab, var(--accent) 22%, transparent)",
                color: "var(--foreground)",
                marginBottom: "0.9rem",
              }}
            >
              <Icon name={f.icon || "spark"} size={22} className="nlm-accent-text" />
            </span>
            <h3 style={{ fontWeight: 700, fontSize: "1.1rem", marginBottom: "0.35rem" }}>{f.title}</h3>
            {(Array.isArray(f.description) ? f.description : [f.description]).map((p, j) => (
              <p key={j} style={{ color: "var(--foreground-secondary)", lineHeight: 1.55 , paddingBottom: "0.25rem"}}>
                {p}
              </p>
            ))}
          </Reveal>
        ))}
      </div>
    </Container>
  );
}
