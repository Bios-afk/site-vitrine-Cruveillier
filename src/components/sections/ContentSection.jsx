import Container from "../common/Container.jsx";
import SectionHeading from "../common/SectionHeading.jsx";
import CardGrid from "../common/CardGrid.jsx";
import Button from "../common/Button.jsx";
import { ArrowRight } from "../common/Icons.jsx";

export default function ContentSection({ data = {}, items = [] }) {
  const { eyebrow, title, intro, align = "left", layout = "asymmetric", cta, id } = data;
  const isRail = layout === "rail";

  return (
    <Container as="section" id={id} style={{ paddingBlock: "clamp(2.5rem, 5vw, 4rem)" }}>
      <div
        className="flex items-end justify-between gap-6"
        style={{ flexWrap: "wrap", marginBottom: isRail ? "1.5rem" : "2.5rem" }}
      >
        {isRail ? (
          <h2 className="nlm-rail-title">{title}</h2>
        ) : (
          <SectionHeading eyebrow={eyebrow} title={title} intro={intro} align={align} />
        )}

        {cta &&
          (isRail ? (
            <a href={cta.href} className="nlm-rail-seeall">
              {cta.label}
            </a>
          ) : (
            <Button href={cta.href} variant="ghost" icon={<ArrowRight size={16} />}>
              {cta.label}
            </Button>
          ))}
      </div>

      <CardGrid items={items} layout={layout} />
    </Container>
  );
}
