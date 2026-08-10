import { useEffect, useRef } from "react";
import ProtectedMedia from "../common/ProtectedMedia.jsx";
import AvatarGroup from "../common/AvatarGroup.jsx";
import Button from "../common/Button.jsx";
import { getGsap, EASE, prefersReducedMotion } from "../../lib/gsap-core.js";
import { Play, Spark } from "../common/Icons.jsx";

export default function Hero({ data }) {
  const rootRef = useRef(null);
  const {
    eyebrow,
    headline = [],
    subline,
    description,
    primaryCta,
    watchCta,
    media,
    stat,
    avatars = [],
  } = data || {};

  useEffect(() => {
    const { gsap } = getGsap();
    const root = rootRef.current;
    if (!root) return;
    if (prefersReducedMotion()) {
      gsap.set(root.querySelectorAll("[data-hero-anim]"), { opacity: 1, y: 0 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-hero-anim]",
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: EASE,
          force3D: true,
          stagger: 0.1,
          delay: 0.12,
          clearProps: "transform",
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="nlm-container nlm-hero">
      <div className="nlm-hero__card">
        <div style={{ position: "absolute", inset: 0 }}>
          <ProtectedMedia
            src={media}
            alt={subline || "Next Level Mentors"}
            controls={false}
            autoPlay
            imgProps={{ loading: "eager", fetchPriority: "high" }}
          />
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(8,9,6,0.18) 0%, rgba(8,9,6,0.00) 30%, rgba(8,9,6,0.00) 62%, rgba(8,9,6,0.34) 100%)",
            }}
          />
        </div>

        <div className="nlm-hero__content">

          <div className="nlm-hero__middle">
            <h1 className="nlm-display nlm-hero__title" data-hero-anim>
              {headline.map((word, i) => (
                <span key={i} style={{ color: word.accent ? "var(--accent)" : "var(--on-hero)" }}>
                  {word.text}{" "}
                </span>
              ))}
            </h1>

            {description && (
              <p className="nlm-hero__desc" data-hero-anim>
                {description}
              </p>
            )}
          </div>
          
          <div className="nlm-hero__top" data-hero-anim>
            {eyebrow && (
              <p className="nlm-hero__eyebrow">
                {eyebrow}
                <Spark size={15} className="nlm-accent-text" style={{ flexShrink: 0, marginTop: "0.1rem" }} />
              </p>
            )}
            {primaryCta && (
              <Button href={primaryCta.href} variant="accent" style={{ fontWeight: 700 }}>
                {primaryCta.label}
              </Button>
            )}
          </div>

          {/* <div className="nlm-hero__bottom">
            {stat && (
              <div className="nlm-hero__stat" data-hero-anim>
                <div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "0.15rem" }}>
                    <span className="nlm-hero__stat-value">{stat.value?.replace("+", "")}</span>
                    <Spark size={17} className="nlm-accent-text" style={{ marginTop: "0.1rem" }} />
                  </div>
                  <p className="nlm-hero__stat-label">{stat.label}</p>
                </div>
                {avatars.length > 0 && (
                  <AvatarGroup avatars={avatars} maxVisible={3} size={44} overlap={18} variant="light" />
                )}
              </div>
            )}

            {watchCta && (
              <a href={watchCta.href} className="nlm-hero__watch" data-hero-anim>
                <span className="nlm-hero__watch-btn">
                  <Play size={24} />
                </span>
                <span style={{ textShadow: "0 1px 10px rgba(0,0,0,0.5)" }}>{watchCta.label}</span>
              </a>
            )}
          </div> */}
        </div>
      </div>
    </section>
  );
}
