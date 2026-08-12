import { prefersReducedMotion } from "./gsap-core.js";

function scrollToHash(hash) {
  if (!hash) return;
  let target;
  try {
    target = document.querySelector(hash);
  } catch {
    return;
  }
  if (!target) return;

  target.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block: "center",
  });
}

function handleClick(event) {
  const link = event.target.closest('a[href*="#"]');
  if (!link) return;

  const url = new URL(link.href, window.location.href);
  if (url.pathname !== window.location.pathname || !url.hash) return;

  const target = document.querySelector(url.hash);
  if (!target) return;

  event.preventDefault();
  history.pushState(null, "", url.hash);
  scrollToHash(url.hash);
}

document.addEventListener("click", handleClick);
document.addEventListener("astro:page-load", () => scrollToHash(window.location.hash));
