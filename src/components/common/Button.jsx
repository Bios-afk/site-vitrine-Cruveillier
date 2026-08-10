import { cn } from "../../lib/utils.js";

const VARIANTS = {
  accent: "nlm-btn nlm-btn--accent",
  solid: "nlm-btn nlm-btn--solid",
  ghost: "nlm-btn nlm-btn--ghost",
  onHero: "nlm-btn nlm-btn--on-hero",
};

export default function Button({
  href,
  variant = "accent",
  className,
  children,
  icon = null,
  iconLeft = false,
  ...rest
}) {
  const cls = cn(VARIANTS[variant] || VARIANTS.accent, className);
  const content = (
    <>
      {iconLeft && icon}
      {children}
      {!iconLeft && icon}
    </>
  );

  if (href) {
    return (
      <a href={href} className={cls} {...rest}>
        {content}
      </a>
    );
  }
  return (
    <button className={cls} type={rest.type || "button"} {...rest}>
      {content}
    </button>
  );
}
