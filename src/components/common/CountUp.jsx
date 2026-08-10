import { useEffect, useRef, useState } from "react";
import { getGsap, prefersReducedMotion } from "../../lib/gsap-core.js";

export default function CountUp({
  value = 0,
  prefix = "",
  suffix = "",
  duration = 1.6,
  className = "",
  style = {},
}) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const { gsap } = getGsap();
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      setDisplay(value);
      return;
    }

    const counter = { n: 0 };
    const tween = gsap.to(counter, {
      n: value,
      duration,
      ease: "power2.out",
      onUpdate: () => setDisplay(Math.round(counter.n)),
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}
