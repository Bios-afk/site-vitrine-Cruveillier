import Container from "../common/Container.jsx";
import Button from "../common/Button.jsx";
import Reveal from "../common/Reveal.jsx";
import { Spark, ArrowUpRight } from "../common/Icons.jsx";

export default function CtaBand({ data }) {
  const { eyebrow, title, description, primaryCta, secondaryCta } = data || {};

  return (
    <Container as="section" style={{ paddingBlock: "clamp(2rem, 5vw, 4rem)" }}>
      <Reveal
        style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: "var(--radius-xl)",
          background: "var(--hero-surface)",
          color: "var(--on-hero)",
          padding: "clamp(2.5rem, 6vw, 5rem)",
          textAlign: "center",
        }}
      >
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "-3rem",
            right: "-2rem",
            opacity: 0.12,
            color: "var(--accent)",
          }}
        >
          <Spark size={220} className="nlm-accent-text" />
        </span>

        <div style={{ position: "relative", maxWidth: "46ch", marginInline: "auto" }}>
          {eyebrow && (
            <p className="nlm-eyebrow" style={{ justifyContent: "center", color: "var(--on-hero-muted)" }}>
              <Spark size={14} className="nlm-accent-text" />
              {eyebrow}
            </p>
          )}
          <h2
            className="nlm-display nlm-text-balance"
            style={{ marginTop: "1rem", fontSize: "clamp(2rem, 5vw, 3.4rem)" }}
          >
            {title}
          </h2>
          {description && (
            <p style={{ marginTop: "1rem", color: "var(--on-hero-muted)", lineHeight: 1.6 }}>{description}</p>
          )}
          <div className="flex items-center justify-center gap-3" style={{ marginTop: "2rem", flexWrap: "wrap" }}>
            {primaryCta && (
              <Button href={primaryCta.href} variant="accent" icon={<ArrowUpRight size={16} />}>
                {primaryCta.label}
              </Button>
            )}
            {secondaryCta && (
              <Button href={secondaryCta.href} variant="onHero">
                {secondaryCta.label}
              </Button>
            )}
          </div>
        </div>
      </Reveal>
    </Container>
  );
}
