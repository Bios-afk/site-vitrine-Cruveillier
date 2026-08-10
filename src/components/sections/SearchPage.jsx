import { useMemo, useState } from "react";
import Container from "../common/Container.jsx";
import ProtectedMedia from "../common/ProtectedMedia.jsx";
import { Search as SearchIcon, ArrowUpRight } from "../common/Icons.jsx";

export default function SearchPage({ data = {} }) {
  const { placeholder = "Search…", index = [] } = data;
  const [q, setQ] = useState("");

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return index;
    return index.filter((item) =>
      [item.title, item.category, item.kind]
        .filter(Boolean)
        .some((f) => f.toLowerCase().includes(term))
    );
  }, [q, index]);

  return (
    <Container as="section" style={{ maxWidth: "52rem", paddingBottom: "clamp(3rem, 6vw, 5rem)" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          padding: "0.85rem 1.25rem",
          borderRadius: "999px",
          border: "1px solid var(--border-strong)",
          background: "var(--surface)",
          boxShadow: "0 12px 30px -22px rgba(0,0,0,0.4)",
        }}
      >
        <SearchIcon size={20} className="nlm-accent-text" />
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={placeholder}
          aria-label="Search"
          autoFocus
          style={{
            flexGrow: 1,
            border: "none",
            outline: "none",
            background: "transparent",
            color: "var(--foreground)",
            fontSize: "1rem",
            fontFamily: "inherit",
          }}
        />
      </div>

      <p style={{ marginTop: "1rem", color: "var(--foreground-muted)", fontSize: "0.88rem" }}>
        {q.trim() ? `${results.length} result${results.length === 1 ? "" : "s"} for “${q.trim()}”` : `${index.length} items`}
      </p>

      <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {results.map((item, i) => (
          <a
            key={i}
            href={item.href}
            className="nlm-card nlm-card--interactive group"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              padding: "0.75rem",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div style={{ width: "4rem", height: "4rem", flexShrink: 0, borderRadius: "var(--radius-sm)", overflow: "hidden" }}>
              <ProtectedMedia src={item.media} alt={item.title} controls={false} autoPlay={false} />
            </div>
            <div style={{ flexGrow: 1, minWidth: 0 }}>
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", color: "var(--foreground-muted)", fontSize: "0.78rem", fontWeight: 600 }}>
                <span className="nlm-accent-text" style={{ textTransform: "uppercase", letterSpacing: "0.06em" }}>{item.kind}</span>
                {item.category && <span>· {item.category}</span>}
              </div>
              <h3 style={{ fontWeight: 600, fontSize: "1.02rem", marginTop: "0.15rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {item.title}
              </h3>
            </div>
            <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        ))}

        {results.length === 0 && (
          <p style={{ padding: "2rem 0", textAlign: "center", color: "var(--foreground-muted)" }}>
            No results. Try a different term.
          </p>
        )}
      </div>
    </Container>
  );
}
