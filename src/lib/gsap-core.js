import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

let registered = false;

export function getGsap() {
  if (typeof window !== "undefined" && !registered) {
    gsap.registerPlugin(ScrollTrigger, CustomEase, ScrollToPlugin);

    CustomEase.create("nlm-smooth", "0.16, 1, 0.3, 1");

    gsap.config({ force3D: true });
    registered = true;
  }
  return { gsap, ScrollTrigger };
}

export const EASE = "nlm-smooth";
export const EASE_INOUT = "power2.inOut";
export const DUR = 0.8;
export const STAGGER = 0.08;

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );
}
