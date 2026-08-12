import Container from "../common/Container.jsx";
import SectionHeading from "../common/SectionHeading.jsx";
import Stagger from "../common/Stagger.jsx";
import { ArrowUpRight, Spark } from "../common/Icons.jsx";

export default function GradientCards({ data = {}, items = [] }) {
  const { eyebrow, title, intro, align = "left", id } = data;

  return (
    <Container as="section" id={id} style={{ paddingBlock: "clamp(2.5rem, 5vw, 4rem)" }}>
      {(title || eyebrow) && (
        <div style={{ marginBottom: "2.5rem" }}>
          <SectionHeading eyebrow={eyebrow} title={title} intro={intro} align={align} />
        </div>
      )}

      <Stagger className="nlm-cluster" style={{ "--cluster-min": "17rem" }}>
        {items.map((item, i) => {
          const Wrapper = item.href ? "a" : "div";
          return (
            <Wrapper key={i} href={item.href} className="nlm-gcard group">
              <div className="nlm-gcard__body flex flex-col justify-between gap-2">
                <div>
                  {item.badge && (
                    <p className="nlm-eyebrow" style={{ marginBottom: "0.6rem" }}>
                      <Spark size={12} className="nlm-accent-text" />
                      {item.badge}
                    </p>
                  )}
                  <h3 className="nlm-gcard__title">{item.title}</h3>
                  {item.description && <p className="nlm-gcard__desc">{item.description}</p>}
                </div>
                <div>
                  {item.tags?.length > 0 && (
                    <div className="nlm-gcard__tags">
                      {item.tags.map((tag, j) => (
                        <span key={j} className="nlm-gcard__tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="nlm-gcard__footer">
                <span className="nlm-gcard__arrow" aria-hidden="true">
                  <ArrowUpRight size={18} />
                </span>
              </div>
            </Wrapper>
          );
        })}
      </Stagger>
    </Container>
  );
}
