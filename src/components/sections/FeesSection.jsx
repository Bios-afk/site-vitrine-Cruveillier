import Container from "../common/Container.jsx";
import Reveal from "../common/Reveal.jsx";
import SectionHeading from "../common/SectionHeading.jsx";
import Button from "../common/Button.jsx";
import { Icon, ArrowRight } from "../common/Icons.jsx";

export default function FeesSection({ data = {}, modes = [] }) {
  const {
    id,
    eyebrow,
    title,
    intro,
    note,
    examplesLabel,
    examples = [],
    examplesNote,
    modesLabel,
    cta,
  } = data;

  return (
    <Container as="section" id={id} style={{ paddingBlock: "clamp(2.5rem, 5vw, 4rem)" }}>
      <SectionHeading eyebrow={eyebrow} title={title} intro={intro} align="left" />

      <div
        className="nlm-split"
        style={{ "--split-cols": "1.15fr 1fr", "--split-align": "start", marginTop: "1.75rem" }}
      >
        {note?.text && (
          <Reveal className="nlm-fee-note">
            <span className="nlm-fee-note__icon">
              <Icon name={note.icon || "insurance-package"} size={18} />
            </span>
            <span>{note.text}</span>
          </Reveal>
        )}

        {examples.length > 0 && (
          <Reveal className="nlm-fee-card" delay={0.05}>
            {examplesLabel && <p className="nlm-fee-card__label">{examplesLabel}</p>}
            <div>
              {examples.map((ex, i) => (
                <div key={i} className="nlm-fee-row">
                  <span className="nlm-fee-row__label">{ex.label}</span>
                  <span className="nlm-fee-row__leader" aria-hidden="true" />
                  <span className={ex.price === "Sur devis" ? "nlm-fee-row__quote" : "nlm-fee-row__price"}>
                    {ex.price}
                  </span>
                </div>
              ))}
            </div>
            {examplesNote && <p className="nlm-fee-card__note">{examplesNote}</p>}
          </Reveal>
        )}
      </div>

      {modes.length > 0 && (
        <div style={{ marginTop: "3rem" }}>
          {modesLabel && (
            <p className="nlm-eyebrow" style={{ marginBottom: "1.5rem" }}>
              {modesLabel}
            </p>
          )}
          <div className="nlm-values">
            {modes.map((m, i) => (
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
                  <Icon name={m.icon} size={22} className="nlm-accent-text" />
                </span>
                <h3 style={{ fontWeight: 700, fontSize: "1.1rem", marginBottom: "0.35rem" }}>{m.title}</h3>
                {(Array.isArray(m.description) ? m.description : [m.description]).map((p, j) => (
                  <p key={j} style={{ color: "var(--foreground-secondary)", lineHeight: 1.55, paddingBottom: "0.25rem" }}>
                    {p}
                  </p>
                ))}
              </Reveal>
            ))}
          </div>
        </div>
      )}

      {cta?.href && (
        <div style={{ marginTop: "2.5rem" }}>
          <Button href={cta.href} variant="ghost" icon={<ArrowRight size={16} />}>
            {cta.label}
          </Button>
        </div>
      )}
    </Container>
  );
}
