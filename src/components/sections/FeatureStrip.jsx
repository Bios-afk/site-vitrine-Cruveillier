import Container from "../common/Container.jsx";
import Reveal from "../common/Reveal.jsx";
import CountUp from "../common/CountUp.jsx";
import { Icon, Spark } from "../common/Icons.jsx";

export default function FeatureStrip({ data }) {
  const { highlight, features = [] } = data || {};

  return (
    <Container as="section" style={{ paddingBlock: "clamp(3rem, 6vw, 5rem)" }}>
      <div
        className="nlm-split"
        style={{ "--split-cols": "1.1fr 1.4fr", "--split-align": "center" }}
      >
        {highlight && (
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span
                style={{
                  fontSize: "clamp(3.5rem, 11vw, 7rem)",
                  fontWeight: 900,
                  letterSpacing: "-0.04em",
                  lineHeight: 0.9,
                }}
              >
                <CountUp value={highlight.value} suffix={highlight.suffix || ""} duration={2} />
              </span>
              <Spark size={48} className="nlm-accent-text" />
            </div>
            <p style={{ marginTop: "0.5rem", fontSize: "clamp(1.1rem, 2vw, 1.5rem)", fontWeight: 500 }}>
              {highlight.label}
            </p>
          </Reveal>
        )}

        <div className="nlm-cluster">
          {features.map((f, i) => {
            return (
              <Reveal key={i} delay={i * 0.08}>
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
                <p style={{ color: "var(--foreground-secondary)", lineHeight: 1.55 }}>{f.description}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Container>
  );
}
