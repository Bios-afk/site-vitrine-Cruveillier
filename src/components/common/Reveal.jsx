import { useEffect, useRef } from "react";
import { getGsap, EASE, DUR, prefersReducedMotion } from "../../lib/gsap-core.js";
import { cn } from "../../lib/utils.js";

export default function Reveal({
  as: Tag = "div",
  direction = "up",
  delay = 0,
  distance = 28,
  duration = DUR,
  once = true,
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

    if (prefersReducedMotion()) {
      gsap.set(el, { opacity: 1, x: 0, y: 0 });
      return;
    }

    const offset = {
      up: { y: distance },
      down: { y: -distance },
      left: { x: distance },
      right: { x: -distance },
      none: {},
    }[direction] || { y: distance };

    // When hydrated via client:visible, the element can already be in (or past)
    // the viewport. In that case a ScrollTrigger started at "top 92%" never
    // fires its onEnter, leaving the element stuck at opacity:0 + offset and
    // overlapping other content. Detect that and just play in immediately.
    const rect = el.getBoundingClientRect();
    const alreadyInView = rect.top < window.innerHeight && rect.bottom > 0;

    if (alreadyInView) {
      const tween = gsap.fromTo(
        el,
        { opacity: 0, ...offset },
        { opacity: 1, x: 0, y: 0, duration, delay, ease: EASE, force3D: true, overwrite: "auto" }
      );
      return () => tween.kill();
    }

    const tween = gsap.fromTo(
      el,
      { opacity: 0, ...offset },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration,
        delay,
        ease: EASE,
        force3D: true,
        overwrite: "auto",
        scrollTrigger: {
          trigger: el,

          start: "top 92%",
          toggleActions: once
            ? "play none none none"
            : "play none none reverse",
        },
      }
    );

    // Late hydration (client:visible) can leave ScrollTrigger with stale start/
    // end positions measured before layout settled. Recompute once.
    ScrollTrigger.refresh();

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [direction, delay, distance, duration, once]);

  return (
    <Tag ref={ref} className={cn("nlm-reveal", className)} style={style} {...rest}>
      {children}
    </Tag>
  );
}
