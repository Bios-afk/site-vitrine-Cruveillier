import { useEffect, useRef, useState } from "react";
import {
  SiSpotify,
  SiApplepodcasts,
  SiYoutube,
  SiSoundcloud,
  SiOvercast,
  SiPocketcasts,
  SiX,
} from "react-icons/si";
import Container from "../common/Container.jsx";
import { getGsap, prefersReducedMotion } from "../../lib/gsap-core.js";

const ICONS = {
  spotify: SiSpotify,
  applepodcasts: SiApplepodcasts,
  youtube: SiYoutube,
  soundcloud: SiSoundcloud,
  overcast: SiOvercast,
  pocketcasts: SiPocketcasts,
  x: SiX,
};

export default function BrandStrip({ data = {} }) {
  const { label = "Used by", fallback = "leading platforms", brands = [] } = data;
  const [hoveredId, setHoveredId] = useState(null);
  const wordRef = useRef(null);

  const active = brands.find((b) => b.id === hoveredId);
  const word = active?.name ?? fallback;

  useEffect(() => {
    const { gsap } = getGsap();
    const el = wordRef.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      gsap.set(el, { y: 0, opacity: 1 });
      return;
    }
    gsap.fromTo(
      el,
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.22, ease: "power2.out", overwrite: "auto" }
    );
  }, [word]);

  return (
    <Container as="section" style={{ paddingBlock: "clamp(2.5rem, 5vw, 4rem)" }}>
      <div className="nlm-brandstrip">
        <div className="nlm-brandstrip__text">
          <p className="nlm-brandstrip__label">{label}</p>
          <div className="nlm-brandstrip__word-wrap">
            <span aria-hidden className="nlm-brandstrip__sizer">{fallback}</span>
            <span ref={wordRef} className="nlm-brandstrip__word">{word}</span>
          </div>
        </div>

        <div className="nlm-brandstrip__logos">
          {brands.map((b) => {
            const Glyph = ICONS[b.icon];
            if (!Glyph) return null;
            const isActive = hoveredId === b.id;
            const isDimmed = hoveredId !== null && !isActive;
            return (
              <button
                key={b.id}
                type="button"
                aria-label={b.name}
                className={`nlm-brandstrip__logo${isActive ? " is-active" : ""}${isDimmed ? " is-dimmed" : ""}`}
                onMouseEnter={() => setHoveredId(b.id)}
                onMouseLeave={() => setHoveredId(null)}
                onFocus={() => setHoveredId(b.id)}
                onBlur={() => setHoveredId(null)}
              >
                <Glyph aria-hidden />
              </button>
            );
          })}
        </div>
      </div>
    </Container>
  );
}
