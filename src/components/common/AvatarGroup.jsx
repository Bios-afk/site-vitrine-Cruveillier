import { useState } from "react";

export default function AvatarGroup({
  avatars = [],
  maxVisible = 4,
  size = 44,
  overlap = 14,
  variant = "light",
}) {
  const [hovered, setHovered] = useState(null);
  const visible = avatars.slice(0, maxVisible);
  const extra = avatars.length - maxVisible;
  const borderColor = variant === "light" ? "rgba(255,255,255,0.9)" : "var(--background)";

  return (
    <div className="flex" style={{ paddingLeft: overlap }}>
      {visible.map((a, idx) => {
        const isHovered = hovered === idx;
        return (
          <div
            key={idx}
            className="relative rounded-full"
            style={{
              width: size,
              height: size,
              marginLeft: -overlap,
              border: `3px solid ${borderColor}`,
              background: "var(--surface-2)",
              zIndex: isHovered ? 50 : visible.length - idx,
              transition: "transform 0.3s var(--ease-out)",
              transform: isHovered ? "translateY(-8px)" : "translateY(0)",
            }}
            onMouseEnter={() => setHovered(idx)}
            onMouseLeave={() => setHovered(null)}
          >
            <img
              src={a.src}
              alt={a.alt || a.label || `Mentor ${idx + 1}`}
              width={size}
              height={size}
              draggable={false}
              loading="eager"
              decoding="async"
              className="rounded-full object-cover w-full h-full"
            />
            {isHovered && a.label && (
              <span
                className="pointer-events-none absolute left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md px-2 py-1 text-xs font-semibold"
                style={{
                  bottom: "calc(100% + 8px)",
                  background: "var(--foreground)",
                  color: "var(--background)",
                }}
              >
                {a.label}
              </span>
            )}
          </div>
        );
      })}
      {extra > 0 && (
        <div
          className="flex items-center justify-center rounded-full font-semibold"
          style={{
            width: size,
            height: size,
            marginLeft: -overlap,
            border: `3px solid ${borderColor}`,
            background: "var(--accent)",
            color: "var(--accent-foreground)",
            fontSize: size * 0.3,
          }}
        >
          +{extra}
        </div>
      )}
    </div>
  );
}
