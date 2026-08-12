import {
  SiX,
  SiYoutube,
  SiSpotify,
  SiApplepodcasts,
  SiSoundcloud,
  SiInstagram,
  SiThreads,
} from "react-icons/si";
import Container from "../common/Container.jsx";
import Reveal from "../common/Reveal.jsx";
import { Spark } from "../common/Icons.jsx";

const SOCIAL_ICONS = {
  x: SiX,
  youtube: SiYoutube,
  spotify: SiSpotify,
  applepodcasts: SiApplepodcasts,
  soundcloud: SiSoundcloud,
  instagram: SiInstagram,
  threads: SiThreads,
};

export default function Footer({ data }) {
  const {
    brand = "Anaïs Cruveiller",
    tagline,
    columns = [],
    social = [],
    legal = [],
    copyright,
  } = data || {};

  return (
    <footer style={{ background: "var(--background-subtle)", borderTop: "1px solid var(--border)" }}>
      <Container style={{ paddingBlock: "clamp(3rem, 6vw, 5rem)" }}>
        <Reveal className="nlm-split" style={{ "--split-cols": "1.4fr 2fr" }}>
          <div>
            <a href="/" className="flex items-center gap-2" style={{ textDecoration: "none", color: "var(--foreground)" }}>
              <Spark size={26} className="nlm-accent-text" />
              <span style={{ fontWeight: 700, fontSize: "1.1rem" }}>{brand}</span>
            </a>
            {tagline && (
              <p style={{ marginTop: "1rem", maxWidth: "32ch", color: "var(--foreground-secondary)", lineHeight: 1.6 }}>
                {tagline}
              </p>
            )}
          </div>

          <div className="nlm-cluster" style={{ "--cluster-min": "8rem" }}>
            {columns.map((col) => (
              <div key={col.title}>
                <h3
                  style={{
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "var(--foreground-muted)",
                    marginBottom: "0.9rem",
                  }}
                >
                  {col.title}
                </h3>
                <ul style={{ display: "flex", flexDirection: "column", gap: "0.6rem", listStyle: "none", padding: 0, margin: 0 }}>
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        style={{
                          color: "var(--foreground-secondary)",
                          textDecoration: "none",
                          fontSize: "0.95rem",
                          transition: "color 0.2s ease",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--foreground)")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--foreground-secondary)")}
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>

        <div
          className="flex items-center justify-between gap-4"
          style={{
            marginTop: "3rem",
            paddingTop: "1.5rem",
            borderTop: "1px solid var(--border)",
            flexWrap: "wrap",
          }}
        >
          <p style={{ color: "var(--foreground-muted)", fontSize: "0.85rem" }}>
            {copyright || `© ${new Date().getFullYear()} ${brand}. Tous droits réservés.`}
          </p>
          <div className="flex items-center gap-4" style={{ flexWrap: "wrap" }}>
            {legal.map((l) => (
              <a key={l.href} href={l.href} style={{ color: "var(--foreground-muted)", fontSize: "0.85rem", textDecoration: "none" }}>
                {l.label}
              </a>
            ))}
            {social.length > 0 && (
              <div className="flex items-center gap-2">
                {social.map((s) => {
                  const Glyph = SOCIAL_ICONS[s.icon];
                  return (
                    <a
                      key={s.href}
                      href={s.href}
                      aria-label={s.label}
                      title={s.label}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="nlm-social"
                    >
                      {Glyph ? <Glyph aria-hidden /> : <span>{s.label}</span>}
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </Container>
    </footer>
  );
}
