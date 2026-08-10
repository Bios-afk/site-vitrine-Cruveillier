import { useEffect, useRef } from "react";
import { getGsap, EASE, STAGGER, prefersReducedMotion } from "../../lib/gsap-core.js";

export default function Rail({ className = "", children, ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    const { gsap } = getGsap();
    const el = ref.current;
    if (!el) return;
    const items = el.querySelectorAll(":scope > *");
    if (!items.length) return;

    if (prefersReducedMotion()) {
      gsap.set(items, { opacity: 1, y: 0 });
      return;
    }
    const tween = gsap.fromTo(
      items,
      { opacity: 0, y: 26 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: EASE,
        force3D: true,
        overwrite: "auto",
        stagger: { each: STAGGER, ease: "none" },
        scrollTrigger: { trigger: el, start: "top 90%" },
      }
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const DRAG_THRESHOLD = 6;
    let isDown = false;
    let dragging = false;
    let pointerId = null;
    let startX = 0;
    let startScroll = 0;
    let moved = 0;

    const onDown = (e) => {

      if (e.pointerType === "touch") return;
      isDown = true;
      dragging = false;
      moved = 0;
      pointerId = e.pointerId;
      startX = e.clientX;
      startScroll = el.scrollLeft;
    };
    const onMove = (e) => {
      if (!isDown) return;
      const dx = e.clientX - startX;
      moved = Math.max(moved, Math.abs(dx));

      // Only promote to a real drag (and capture the pointer) once the
      // movement passes the threshold. Capturing on pointerdown would
      // redirect the click off the card's <a> and break navigation.
      if (!dragging && moved > DRAG_THRESHOLD) {
        dragging = true;
        el.setPointerCapture?.(pointerId);
        el.classList.add("is-dragging");
      }
      if (dragging) el.scrollLeft = startScroll - dx;
    };
    const endDrag = (e) => {
      if (!isDown) return;
      isDown = false;
      if (dragging) {
        el.releasePointerCapture?.(e.pointerId);
        el.classList.remove("is-dragging");
      }
    };

    const onClickCapture = (e) => {
      // Suppress the click only when the press was actually a drag, so plain
      // clicks navigate normally.
      if (dragging || moved > DRAG_THRESHOLD) {
        e.preventDefault();
        e.stopPropagation();
      }
      moved = 0;
      dragging = false;
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", endDrag);
    el.addEventListener("pointercancel", endDrag);
    el.addEventListener("pointerleave", endDrag);
    el.addEventListener("click", onClickCapture, true);

    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", endDrag);
      el.removeEventListener("pointercancel", endDrag);
      el.removeEventListener("pointerleave", endDrag);
      el.removeEventListener("click", onClickCapture, true);
    };
  }, []);

  return (
    <div ref={ref} className={className} {...rest}>
      {children}
    </div>
  );
}
