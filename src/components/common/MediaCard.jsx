import ProtectedMedia from "./ProtectedMedia.jsx";
import { Play, ArrowUpRight, Clock, Calendar, Headphones } from "./Icons.jsx";

export default function MediaCard({
  item,
  aspect = "4 / 3",
  showExcerpt = true,
  className = "",
}) {
  if (!item) return null;
  const href = item.href || (item.slug ? `#${item.slug}` : undefined);
  const KindIcon = item.kind === "podcast" ? Headphones : Play;

  const meta = [
    item.duration && { icon: <Clock size={14} />, label: item.duration },
    item.date && { icon: <Calendar size={14} />, label: item.date },
  ].filter(Boolean);

  return (
    <a
      href={href}
      className={`nlm-card nlm-card--interactive group ${className}`}
      style={{ display: "flex", flexDirection: "column", textDecoration: "none", color: "inherit" }}
    >
      <div style={{ position: "relative", aspectRatio: aspect }}>
        <ProtectedMedia src={item.media} alt={item.title} controls={false} autoPlay={item.autoPlay ?? true} />

        {item.category && (
          <span
            className="nlm-chip"
            style={{
              position: "absolute",
              top: "0.85rem",
              left: "0.85rem",
              background: "rgba(255,255,255,0.92)",
              color: "#0b0d07",
              backdropFilter: "blur(6px)",
            }}
          >
            {item.category}
          </span>
        )}

        {(item.kind === "show" || item.kind === "podcast") && (
          <span
            aria-hidden="true"
            className="grid place-items-center"
            style={{
              position: "absolute",
              bottom: "0.85rem",
              right: "0.85rem",
              width: "2.75rem",
              height: "2.75rem",
              borderRadius: "999px",
              background: "var(--accent)",
              color: "var(--accent-foreground)",
              boxShadow: "0 10px 26px -10px rgba(0,0,0,0.5)",
            }}
          >
            <KindIcon size={18} />
          </span>
        )}
      </div>

      <div style={{ padding: "1.25rem 1.25rem 1.4rem", display: "flex", flexDirection: "column", gap: "0.55rem", flexGrow: 1 }}>
        <h3
          className="nlm-text-balance"
          style={{
            fontWeight: 700,
            fontSize: "1.12rem",
            lineHeight: 1.25,
            letterSpacing: "-0.01em",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "0.5rem",
          }}
        >
          <span>{item.title}</span>
          <ArrowUpRight
            size={18}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </h3>

        {showExcerpt && item.excerpt && (
          <p style={{ color: "var(--foreground-secondary)", fontSize: "0.95rem", lineHeight: 1.55 }}>
            {item.excerpt}
          </p>
        )}

        {meta.length > 0 && (
          <div style={{ marginTop: "auto", display: "flex", gap: "1rem", flexWrap: "wrap", paddingTop: "0.4rem" }}>
            {meta.map((m, i) => (
              <span
                key={i}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  fontSize: "0.82rem",
                  color: "var(--foreground-muted)",
                }}
              >
                {m.icon}
                {m.label}
              </span>
            ))}
          </div>
        )}
      </div>
    </a>
  );
}
