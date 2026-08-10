import MediaCard from "./MediaCard.jsx";
import RailCard from "./RailCard.jsx";
import MosaicCard from "./MosaicCard.jsx";
import Rail from "./Rail.jsx";
import Stagger from "./Stagger.jsx";

export default function CardGrid({ items = [], layout = "asymmetric", columns = 3 }) {
  if (!items.length) return null;

  if (layout === "rail") {
    return (
      <Rail className="nlm-rail nlm-scrollbar-hide">
        {items.map((item, i) => (
          <div key={item.slug || i} className="nlm-reveal" style={{ minWidth: 0 }}>
            <RailCard item={item} />
          </div>
        ))}
      </Rail>
    );
  }

  if (layout === "mosaic") {
    return (
      <Stagger className="nlm-mosaic">
        {items.map((item, i) => (
          <MosaicCard key={item.slug || i} item={item} />
        ))}
      </Stagger>
    );
  }

  if (layout === "uniform") {
    const colClass = columns <= 2 ? "nlm-grid--uniform-2" : "nlm-grid--uniform";
    return (
      <Stagger className={`nlm-grid ${colClass}`}>
        {items.map((item, i) => (
          <MediaCard key={item.slug || i} item={item} aspect="4 / 3" />
        ))}
      </Stagger>
    );
  }

  const [feature, ...rest] = items;
  return (
    <Stagger className="nlm-grid nlm-grid--asym">
      <div className="nlm-grid__feature">
        <MediaCard item={feature} aspect="16 / 11" className="h-full" />
      </div>
      {rest.map((item, i) => (
        <MediaCard key={item.slug || i} item={item} aspect="4 / 3" showExcerpt={false} />
      ))}
    </Stagger>
  );
}
