import { getGsap, EASE, DUR, prefersReducedMotion } from "./gsap-core.js";

// Landing the scroll on target isn't the end of the story: sections just
// below the new scroll position only cross the client:visible threshold
// (and hydrate, and call ScrollTrigger.refresh()) *after* we get there. This
// window keeps correcting the position for a short grace period after the
// tween completes, so those latecomers can't yank it off target once we've
// already stopped actively animating toward it.
const SETTLE_MS = 600;

// Bumped on every new scrollToHash() call so a superseded call's settle-hold
// loop stops correcting toward its own (now stale) target if the user clicks
// another anchor before the first hold window has elapsed.
let scrollToken = 0;

function topY(target) {
  const rect = target.getBoundingClientRect();
  // Same offset the browser's own default (non-JS) anchor jump would apply —
  // see `[id] { scroll-margin-top }` in global.css, which compensates for
  // the fixed navbar.
  const scrollMarginTop = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
  const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  const y = rect.top + window.scrollY - scrollMarginTop;
  return Math.min(Math.max(y, 0), maxScroll);
}

function scrollToHash(hash) {
  if (!hash) return;
  let target;
  try {
    target = document.querySelector(hash);
  } catch {
    return;
  }
  if (!target) return;

  const y = topY(target);
  const myToken = ++scrollToken;

  // Below-the-fold sections hydrate lazily (client:visible) as the page
  // scrolls past them (or as they're newly revealed once it lands), and
  // each one calls ScrollTrigger.refresh() to fix up its own trigger
  // positions — which briefly snaps the native scroll to 0 and back. Left
  // unguarded, that kills a plain scrollIntoView() (or even a single
  // instant window.scrollTo()) mid-flight or shortly after it lands.
  //
  // ScrollToPlugin normally disables CSS `scroll-behavior: smooth` on the
  // element it tweens for exactly this reason, but it can't detect that
  // here because it's `window` being tweened, not the scrolling element —
  // getComputedStyle(window) isn't a thing. Left smooth, the global
  // `scroll-behavior: smooth` (global.css) turns every corrective
  // window.scrollTo() call below into its own competing native smooth
  // scroll. Disable it for the duration of our own scroll handling (both
  // paths below) and restore it once we're done.
  const docEl = document.documentElement;
  const previousScrollBehavior = docEl.style.scrollBehavior;
  docEl.style.scrollBehavior = "auto";
  const restore = () => {
    if (myToken !== scrollToken) return;
    docEl.style.scrollBehavior = previousScrollBehavior;
  };

  // Keeps correcting the position for a short grace period after we land on
  // target, so a latecomer refresh() can't yank it back off once we've
  // stopped actively animating toward it. Also bails as soon as a newer
  // scrollToHash() call supersedes this one (rapid link switching).
  const holdUntil = (deadline) => {
    if (myToken !== scrollToken || performance.now() >= deadline) {
      restore();
      return;
    }
    if (Math.abs(window.scrollY - y) > 2) window.scrollTo(0, y);
    requestAnimationFrame(() => holdUntil(deadline));
  };

  if (prefersReducedMotion()) {
    window.scrollTo(0, y);
    holdUntil(performance.now() + SETTLE_MS);
    return;
  }

  // autoKill is ScrollToPlugin's "cancel if the user manually scrolls"
  // guard: it can't tell a real wheel/touch input apart from
  // ScrollTrigger.refresh()'s own internal scroll poke, so left on it
  // cancels our tween the first time a lazy-hydrating section refreshes
  // mid-flight — the same stuck-partway symptom, one layer down.
  const { gsap } = getGsap();
  gsap.to(window, {
    duration: DUR,
    ease: EASE,
    scrollTo: { y, autoKill: false },
    overwrite: true,
    onComplete: () => holdUntil(performance.now() + SETTLE_MS),
    onInterrupt: restore,
  });
}

function handleClick(event) {
  const link = event.target.closest('a[href*="#"]');
  if (!link) return;

  const url = new URL(link.href, window.location.href);
  if (url.pathname !== window.location.pathname || !url.hash) return;

  const target = document.querySelector(url.hash);
  if (!target) return;

  // Astro's ClientRouter also listens for clicks on same-page anchors and,
  // left unchecked, races our own scroll with its own native top-aligned
  // hash jump — the visible symptom is the scroll animation stopping
  // partway. Stop the event here, in the capture phase (which
  // always runs before ClientRouter's bubble-phase listener on document),
  // so we're the only handler that ever sees this click.
  event.preventDefault();
  event.stopPropagation();
  history.pushState(null, "", url.hash);
  scrollToHash(url.hash);
}

document.addEventListener("click", handleClick, { capture: true });
document.addEventListener("astro:page-load", () => scrollToHash(window.location.hash));
