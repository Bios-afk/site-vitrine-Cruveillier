export default function IcooniaIcon({ name, size = 22, className = "", style }) {
  if (!name) return null;
  const url = `/icoonia/${name}.svg`;
  return (
    <span
      role="img"
      aria-hidden="true"
      className={className}
      style={{
        display: "inline-block",
        width: size,
        height: size,
        backgroundColor: "currentColor",
        WebkitMaskImage: `url(${url})`,
        maskImage: `url(${url})`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        flexShrink: 0,
        ...style,
      }}
    />
  );
}
