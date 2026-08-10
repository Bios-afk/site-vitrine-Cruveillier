import Container from "../common/Container.jsx";
import ProtectedMedia from "../common/ProtectedMedia.jsx";
import Reveal from "../common/Reveal.jsx";
import Button from "../common/Button.jsx";
import AvatarGroup from "../common/AvatarGroup.jsx";
import { Clock, Calendar, ArrowRight, Spark } from "../common/Icons.jsx";

export default function MediaDetail({ item }) {
  if (!item) return null;
  const { category, title, excerpt, media, duration, date, hosts = [], body = [], cta, kindLabel } = item;

  return (
    <article style={{ paddingTop: "7.5rem" }}>
      <Container style={{ maxWidth: "60rem" }}>
        <Reveal>
          {(category || kindLabel) && (
            <p className="nlm-eyebrow">
              <Spark size={14} className="nlm-accent-text" />
              {kindLabel || category}
            </p>
          )}
          <h1
            className="nlm-text-balance"
            style={{
              marginTop: "1rem",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              fontSize: "clamp(2.2rem, 5vw, 3.6rem)",
            }}
          >
            {title}
          </h1>
          {excerpt && (
            <p style={{ marginTop: "1.1rem", color: "var(--foreground-secondary)", fontSize: "1.15rem", lineHeight: 1.6 }}>
              {excerpt}
            </p>
          )}

          <div className="flex items-center" style={{ gap: "1.25rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
            {hosts.length > 0 && <AvatarGroup avatars={hosts} maxVisible={3} size={40} overlap={12} variant="default" />}
            {duration && (
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "var(--foreground-muted)", fontSize: "0.9rem" }}>
                <Clock size={15} /> {duration}
              </span>
            )}
            {date && (
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "var(--foreground-muted)", fontSize: "0.9rem" }}>
                <Calendar size={15} /> {date}
              </span>
            )}
          </div>
        </Reveal>
      </Container>

      {media && (
        <Container style={{ maxWidth: "72rem", marginTop: "2.5rem" }}>
          <Reveal style={{ borderRadius: "var(--radius-xl)", overflow: "hidden", aspectRatio: "16 / 9" }}>
            <ProtectedMedia src={media} alt={title} autoPlay controls />
          </Reveal>
        </Container>
      )}

      <Container style={{ maxWidth: "60rem", paddingBlock: "clamp(2.5rem, 5vw, 4rem)" }}>
        {/* Match the header container width (60rem) so the body's left edge
            aligns with the title, while keeping a comfortable reading measure
            by capping the text column and left-aligning it. */}
        <div style={{ maxWidth: "46rem" }}>
          {body.map((block, i) => (
            <Reveal key={i} delay={i * 0.04} style={{ marginBottom: "1.75rem" }}>
              {block.heading && (
                <h2 style={{ fontWeight: 700, fontSize: "1.5rem", letterSpacing: "-0.01em", marginBottom: "0.75rem" }}>
                  {block.heading}
                </h2>
              )}
              {block.text && (
                <p style={{ color: "var(--foreground-secondary)", fontSize: "1.05rem", lineHeight: 1.7 }}>{block.text}</p>
              )}
            </Reveal>
          ))}

          {cta && (
            <Reveal style={{ marginTop: "2rem" }}>
              <Button href={cta.href} variant="accent" icon={<ArrowRight size={16} />}>
                {cta.label}
              </Button>
            </Reveal>
          )}
        </div>
      </Container>
    </article>
  );
}
