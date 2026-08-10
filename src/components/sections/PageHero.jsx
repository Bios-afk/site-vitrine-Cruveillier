import { useEffect, useRef } from "react";
import Button from "../common/Button.jsx";
import { getGsap, EASE, prefersReducedMotion } from "../../lib/gsap-core.js";
import { Spark } from "../common/Icons.jsx";

export default function PageHero({ data }) {
  const ref = useRef(null);
  const { eyebrow, title, accentWord, description, cta, stats = [] } = data || {};

  useEffect(() => {
    const { gsap } = getGsap();
    const root = ref.current;
    if (!root) return;
    if (prefersReducedMotion()) {
      gsap.set(root.querySelectorAll("[data-anim]"), { opacity: 1, y: 0 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-anim]",
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: EASE,
          force3D: true,
          stagger: 0.09,
          delay: 0.1,
          clearProps: "transform",
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="nlm-container" style={{ paddingTop: "9rem", paddingBottom: "2rem" }}>
      {eyebrow && (
        <p className="nlm-eyebrow" data-anim>
          <Spark size={15} className="nlm-accent-text" />
          {eyebrow}
        </p>
      )}
      <h1
        className="nlm-display nlm-text-balance"
        style={{ marginTop: "1rem", maxWidth: "18ch", fontSize: "clamp(2.5rem, 6.5vw, 5rem)" }}
        data-anim
      >
        {title}{" "}
        {accentWord && <span className="nlm-accent-text">{accentWord}</span>}
      </h1>
      {description && (
        <p
          style={{
            marginTop: "1.25rem",
            maxWidth: "52ch",
            color: "var(--foreground-secondary)",
            fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
            lineHeight: 1.6,
          }}
          data-anim
        >
          {description}
        </p>
      )}
      {cta && (
        <div style={{ marginTop: "1.75rem" }} data-anim>
          <Button href={cta.href} variant="accent">
            {cta.label}
          </Button>
        </div>
      )}
      {stats.length > 0 && (
        <div className="flex" style={{ gap: "clamp(2rem, 5vw, 4rem)", marginTop: "2.5rem", flexWrap: "wrap" }} data-anim>
          {stats.map((s, i) => (
            <div key={i}>
              <div style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 800, letterSpacing: "-0.02em" }}>
                {s.value}
              </div>
              <div style={{ color: "var(--foreground-muted)", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
