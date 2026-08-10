import Stagger from "./Stagger.jsx";
import { Spark } from "./Icons.jsx";

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  className = "",
}) {
  const isCenter = align === "center";
  return (
    <Stagger
      className={className}
      stagger={0.07}
      style={{
        textAlign: isCenter ? "center" : "left",
        maxWidth: isCenter ? "44rem" : "40rem",
        marginInline: isCenter ? "auto" : undefined,
      }}
    >
      {eyebrow && (
        <p className="nlm-eyebrow nlm-reveal" style={{ justifyContent: isCenter ? "center" : "flex-start" }}>
          <Spark size={14} className="nlm-accent-text" />
          {eyebrow}
        </p>
      )}
      <h2
        className="nlm-text-balance nlm-reveal"
        style={{
          marginTop: "0.75rem",
          fontWeight: 800,
          letterSpacing: "-0.02em",
          lineHeight: 1.04,
          fontSize: "clamp(1.9rem, 4vw, 3.1rem)",
        }}
      >
        {title}
      </h2>
      {intro && (
        <p
          className="nlm-reveal"
          style={{
            marginTop: "1rem",
            color: "var(--foreground-secondary)",
            fontSize: "clamp(1rem, 1.4vw, 1.15rem)",
            lineHeight: 1.6,
          }}
        >
          {intro}
        </p>
      )}
    </Stagger>
  );
}
