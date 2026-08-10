import { useEffect, useRef } from "react";
import { getGsap, EASE, STAGGER, prefersReducedMotion } from "../../lib/gsap-core.js";

export default function Stagger({
  as: Tag = "div",
  delay = 0,
  stagger = STAGGER,
  distance = 26,
  className,
  style,
  children,
  ...rest
}) {
  const ref = useRef(null);

  useEffect(() => {
    const { gsap, ScrollTrigger } = getGsap();
    const el = ref.current;
    if (!el) return;

    const items = el.querySelectorAll(":scope > *");
    if (!items.length) return;

    if (prefersReducedMotion()) {
      gsap.set(items, { opacity: 1, y: 0 });
      return;
    }

    // With client:visible the grid can hydrate already in view, where a
    // ScrollTrigger started at "top 90%" never fires onEnter — leaving the
    // cards stuck at opacity:0. Detect that and play in immediately.
    const rect = el.getBoundingClientRect();
    const alreadyInView = rect.top < window.innerHeight && rect.bottom > 0;

    const base = {
      opacity: 1,
      y: 0,
      duration: 0.7,
      delay,
      ease: EASE,
      force3D: true,
      overwrite: "auto",
      stagger: { each: stagger, ease: "none" },
    };

    if (alreadyInView) {
      const tween = gsap.fromTo(items, { opacity: 0, y: distance }, base);
      return () => tween.kill();
    }

    const tween = gsap.fromTo(
      items,
      { opacity: 0, y: distance },
      { ...base, scrollTrigger: { trigger: el, start: "top 90%" } }
    );

    ScrollTrigger.refresh();

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [delay, stagger, distance]);

  return (
    <Tag ref={ref} className={className} style={style} {...rest}>
      {children}
    </Tag>
  );
}
