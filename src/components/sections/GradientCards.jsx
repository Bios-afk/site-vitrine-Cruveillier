import Container from "../common/Container.jsx";
import SectionHeading from "../common/SectionHeading.jsx";
import ProtectedMedia from "../common/ProtectedMedia.jsx";
import Stagger from "../common/Stagger.jsx";
import { Play } from "../common/Icons.jsx";

const FALLBACK_GRADIENTS = [
  "linear-gradient(150deg, #FF8A5B 0%, #FF6FB5 55%, #C86DD7 100%)",
  "linear-gradient(150deg, #2AF598 0%, #1CB5E0 60%, #4F8DFD 100%)",
  "linear-gradient(150deg, #7B5CFF 0%, #9D50FF 55%, #C86DD7 100%)",
  "linear-gradient(150deg, #FBAB7E 0%, #F7CE68 100%)",
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
                <div className="nlm-gcard__meta">
                  {item.author && <span className="nlm-gcard__author">{item.author}</span>}
                  {item.role && <span className="nlm-gcard__role">{item.role}</span>}
                </div>
              </div>

              <div className="nlm-gcard__footer">
                <span className="nlm-gcard__play" aria-hidden="true">
                  <Play size={18} />
                </span>
                {item.avatar && (
                  <span className="nlm-gcard__avatar">
                    <ProtectedMedia src={item.avatar} alt={item.author || item.title} controls={false} autoPlay={false} />
                  </span>
                )}
              </div>
            </Wrapper>
          );
        })}
      </Stagger>
    </Container>
  );
}
