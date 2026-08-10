import { useEffect, useRef } from "react";
import { getGsap, prefersReducedMotion } from "../../lib/gsap-core.js";

export default function PageTransition({ children }) {
  const ref = useRef(null);

  useEffect(() => {
    const { gsap } = getGsap();
    const el = ref.current;
    if (!el) return;

    const reduce = prefersReducedMotion();

    const playIn = () => {

      gsap.killTweensOf(el);
      if (reduce) {
        gsap.set(el, { opacity: 1, clearProps: "opacity" });
        return;
      }
      gsap.fromTo(
        el,
        { opacity: 0 },
        { opacity: 1, duration: 0.22, ease: "power1.out", clearProps: "opacity" }
      );
    };

    playIn();

    const onAfterSwap = () => playIn();
    document.addEventListener("astro:after-swap", onAfterSwap);

    return () => {
      document.removeEventListener("astro:after-swap", onAfterSwap);
    };
  }, []);

  return (
    <div ref={ref} data-page-transition>
      {children}
    </div>
  );
}
