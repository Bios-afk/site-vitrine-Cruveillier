import { useState } from "react";
import Container from "../common/Container.jsx";
import Reveal from "../common/Reveal.jsx";
import Button from "../common/Button.jsx";
import { ArrowUpRight } from "../common/Icons.jsx";

export default function ContactForm({ data = {} }) {
  const {
    eyebrow, title, intro,
    fields = [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "message", label: "Message", type: "textarea", required: true },
    ],
    submitLabel = "Send message",
    action,
    successNote = "Thanks — we'll be in touch shortly.",
  } = data;

  const [sent, setSent] = useState(false);

  const onSubmit = (e) => {
    if (!action) {
      e.preventDefault();
      setSent(true);
    }
  };

  return (
    <Container as="section" style={{ maxWidth: "40rem", paddingBlock: "clamp(2rem, 4vw, 3rem)" }}>
      <Reveal>
        {eyebrow && <p className="nlm-eyebrow">{eyebrow}</p>}
        {title && (
          <h2 style={{ marginTop: "0.75rem", fontWeight: 800, fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", letterSpacing: "-0.02em" }}>
            {title}
          </h2>
        )}
        {intro && (
          <p style={{ marginTop: "0.85rem", color: "var(--foreground-secondary)", lineHeight: 1.6 }}>{intro}</p>
        )}
      </Reveal>

      <Reveal delay={0.05} style={{ marginTop: "2rem" }}>
        {sent ? (
          <p
            role="status"
            style={{
              padding: "1.25rem 1.5rem",
              borderRadius: "var(--radius)",
              background: "color-mix(in oklab, var(--accent) 18%, transparent)",
              fontWeight: 600,
            }}
          >
            {successNote}
          </p>
        ) : (
          <form
            action={action}
            method={action ? "POST" : undefined}
            onSubmit={onSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}
          >
            {fields.map((f) => (
              <label key={f.name} style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--foreground-secondary)" }}>
                  {f.label}
                  {f.required && <span style={{ color: "var(--accent-strong)" }}> *</span>}
                </span>
                {f.type === "textarea" ? (
                  <textarea
                    name={f.name}
                    required={f.required}
                    rows={5}
                    style={fieldStyle}
                  />
                ) : (
                  <input type={f.type || "text"} name={f.name} required={f.required} style={fieldStyle} />
                )}
              </label>
            ))}
            <Button type="submit" variant="accent" icon={<ArrowUpRight size={16} />} style={{ alignSelf: "flex-start", marginTop: "0.25rem" }}>
              {submitLabel}
            </Button>
          </form>
        )}
      </Reveal>
    </Container>
  );
}

const fieldStyle = {
  padding: "0.8rem 1rem",
  borderRadius: "var(--radius-sm)",
  border: "1px solid var(--border-strong)",
  background: "var(--surface)",
  color: "var(--foreground)",
  fontSize: "0.95rem",
  fontFamily: "inherit",
  resize: "vertical",
};
