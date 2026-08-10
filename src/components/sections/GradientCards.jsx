import Container from "../common/Container.jsx";
import SectionHeading from "../common/SectionHeading.jsx";
import Stagger from "../common/Stagger.jsx";
import { ArrowUpRight } from "../common/Icons.jsx";

const FALLBACK_GRADIENTS = [
  "linear-gradient(150deg, #2f2a1a 0%, #4a3d20 55%, #6b5226 100%)",
  "linear-gradient(150deg, #1c2412 0%, #2a3319 55%, #3d4a26 100%)",
  "linear-gradient(150deg, #241f14 0%, #3a2f1c 55%, #8a6a2e 100%)",
  "linear-gradient(150deg, #221f1a 0%, #33302a 55%, #4a4438 100%)",
];

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
          const gradient = item.gradient || FALLBACK_GRADIENTS[i % FALLBACK_GRADIENTS.length];
          const Wrapper = item.href ? "a" : "div";
          return (
            <Wrapper key={i} href={item.href} className="nlm-gcard group" style={{ background: gradient }}>
              <span className="nlm-gcard__pattern" aria-hidden="true" />

              <div className="nlm-gcard__body">
                <h3 className="nlm-gcard__title">{item.title}</h3>
                {item.description && <p className="nlm-gcard__desc">{item.description}</p>}
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
