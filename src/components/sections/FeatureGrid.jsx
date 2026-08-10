import Container from "../common/Container.jsx";
import SectionHeading from "../common/SectionHeading.jsx";
import Stagger from "../common/Stagger.jsx";
import { Icon, ArrowUpRight } from "../common/Icons.jsx";

export default function FeatureGrid({ data = {}, items = [] }) {
  const { eyebrow, title, intro, align = "left", id } = data;

  return (
    <Container as="section" id={id} style={{ paddingBlock: "clamp(2.5rem, 5vw, 4rem)" }}>
      {(title || eyebrow) && (
        <div style={{ marginBottom: "2.5rem" }}>
          <SectionHeading eyebrow={eyebrow} title={title} intro={intro} align={align} />
        </div>
      )}
      <Stagger className="nlm-cluster" style={{ "--cluster-min": "16rem" }}>
        {items.map((item, i) => {
          const Wrapper = item.href ? "a" : "div";
          return (
            <Wrapper
              key={i}
              href={item.href}
              className="nlm-card group"
              style={{
                padding: "1.5rem",
                textDecoration: "none",
                color: "inherit",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <span
                className="grid place-items-center"
                style={{
                  width: "3rem",
                  height: "3rem",
                  borderRadius: "999px",
                  background: "color-mix(in oklab, var(--accent) 22%, transparent)",
                  marginBottom: "0.75rem",
                }}
              >
                <Icon name={item.icon || "spark"} size={22} className="nlm-accent-text" />
              </span>
              <h3
                style={{
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "0.5rem",
                }}
              >
                {item.title}
                {item.href && (
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                )}
              </h3>
              <p style={{ color: "var(--foreground-secondary)", lineHeight: 1.55 }}>{item.description}</p>
            </Wrapper>
          );
        })}
      </Stagger>
    </Container>
  );
}
