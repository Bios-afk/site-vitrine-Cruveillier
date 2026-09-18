import { useEffect, useRef, useState } from "react";
import Container from "../common/Container.jsx";
import Button from "../common/Button.jsx";
import ThemeToggle from "../common/ThemeToggle.jsx";
import { getGsap, EASE, prefersReducedMotion } from "../../lib/gsap-core.js";
import { User } from "../common/Icons.jsx";

export default function Navigation({ data }) {
  const { brand = "Anaïs Cruveiller", links = [], cta, account } = data || {};
  const [scrolled, setScrolled] = useState(false);
  const [path, setPath] = useState("/");
  const [activeId, setActiveId] = useState("");
  const [open, setOpen] = useState(false);

  const rootRef = useRef(null);
  const openTl = useRef(null);
  const closeTl = useRef(null);
  const active = useRef(false);
  const navRailRef = useRef(null);
  const pillRef = useRef(null);
  const linkRefs = useRef({});

  useEffect(() => {
    const syncPath = () => {
      setPath(window.location.pathname.replace(/\/$/, "") || "/");
      closeMenu();
    };
    syncPath();

    // Section ids live only on the homepage; on any other page these simply
    // won't be found and updateActiveSection() resolves to "" every time.
    const sectionIds = links.map((l) => l.href.split("#")[1]).filter(Boolean);

    let ticking = false;
    const updateActiveSection = () => {
      ticking = false;
      const line = window.innerHeight / 2;
      let current = "";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActiveId(current);
    };

    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateActiveSection);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("astro:page-load", syncPath);
    document.addEventListener("astro:page-load", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("astro:page-load", syncPath);
      document.removeEventListener("astro:page-load", updateActiveSection);
    };
  }, [links]);

  useEffect(() => {
    const rail = navRailRef.current;
    const pill = pillRef.current;
    if (!rail || !pill) return;

    const activeLink = links.find((l) => isActive(l.href));
    const el = activeLink && linkRefs.current[activeLink.href];
    const { gsap } = getGsap();

    if (!el) {
      gsap.to(pill, { opacity: 0, duration: 0.2, overwrite: true });
      return;
    }

    const vars = { x: el.offsetLeft, width: el.offsetWidth, opacity: 1 };

    if (prefersReducedMotion()) {
      gsap.set(pill, vars);
    } else {
      gsap.to(pill, { ...vars, duration: 0.45, ease: EASE, overwrite: true });
    }
  }, [activeId, path, links]);

  useEffect(() => {
    const onResize = () => {
      const rail = navRailRef.current;
      const pill = pillRef.current;
      if (!rail || !pill) return;
      const activeLink = links.find((l) => isActive(l.href));
      const el = activeLink && linkRefs.current[activeLink.href];
      if (!el) return;
      getGsap().gsap.set(pill, { x: el.offsetLeft, width: el.offsetWidth });
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [links]);

  useEffect(() => {
    const { gsap } = getGsap();
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {

      const origin = "circle(0% at calc(100% - 2.6rem) 2.4rem)";
      const full = "circle(150% at calc(100% - 2.6rem) 2.4rem)";

      gsap.set(".nlm-mnav", { clipPath: origin, pointerEvents: "none" });
      gsap.set(".nlm-mnav__item", { x: -120, opacity: 0 });
      gsap.set(".nlm-burger__close", { opacity: 0, yPercent: 125 });

      openTl.current = gsap
        .timeline({ paused: true })
        .set(".nlm-mnav", { pointerEvents: "auto" })
        .to(".nlm-mnav", { clipPath: full, duration: 1.1, ease: "power4.out" }, 0)
        .to(
          ".nlm-mnav__item",
          { x: 0, opacity: 1, duration: 1.1, stagger: 0.08, ease: "elastic.out(1.05, 0.95)" },
          0.05
        )
        .to(".nlm-burger__close", { opacity: 1, yPercent: 0, duration: 0.5, ease: "power3.out" }, 0)
        .to(".nlm-burger__line", { opacity: 0, yPercent: -125, duration: 0.5, ease: "power3.out" }, 0);

      closeTl.current = gsap
        .timeline({ paused: true })
        .to(
          ".nlm-mnav__item",
          { x: -120, opacity: 0, duration: 0.6, stagger: 0.05, ease: "power3.in" },
          0
        )
        .to(".nlm-mnav", { clipPath: origin, duration: 0.7, ease: "power4.inOut" }, 0.15)
        .set(".nlm-mnav", { pointerEvents: "none" })
        .to(".nlm-burger__close", { opacity: 0, yPercent: 125, duration: 0.45, ease: "power3.out" }, 0)
        .to(".nlm-burger__line", { opacity: 1, yPercent: 0, duration: 0.45, ease: "power3.out" }, 0);
    }, root);

    return () => ctx.revert();
  }, [links.length]);

  const openMenu = () => {
    if (active.current) return;
    active.current = true;
    setOpen(true);
    document.documentElement.style.overflow = "hidden";
    closeTl.current?.pause();
    openTl.current?.seek(0).play();
  };
  const closeMenu = () => {
    if (!active.current) {

      setOpen(false);
      document.documentElement.style.overflow = "";
      return;
    }
    active.current = false;
    setOpen(false);
    document.documentElement.style.overflow = "";
    openTl.current?.pause();
    closeTl.current?.seek(0).play();
  };
  const toggleMenu = () => (active.current ? closeMenu() : openMenu());

  const isActive = (href) => {
    if (href.includes("#")) {
      return href.split("#")[1] === activeId;
    }
    const clean = href.replace(/\/$/, "") || "/";
    return clean === "/" ? path === "/" && !activeId : path === clean || path.startsWith(clean + "/");
  };

  return (
    <header
      ref={rootRef}
      style={{
        position: "fixed",
        insetInline: 0,
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          transition: "background-color 0.3s ease, box-shadow 0.3s ease",
          backgroundColor: scrolled ? "color-mix(in oklab, var(--background) 82%, transparent)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        }}
      />
      <Container
        style={{
          height: "4.75rem",
          position: "relative",
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <a href="/" className="flex items-center gap-2 nlm-nav-brand" style={{ textDecoration: "none", color: "var(--foreground)" }}>
          <img src="/logo.svg" alt="" width={52} height={52} style={{ borderRadius: "8px" }} />
          <span style={{ fontWeight: 700, letterSpacing: "-0.01em", fontSize: "1.05rem" }}>{brand}</span>
        </a>

        <nav
          ref={navRailRef}
          className="hidden md:flex items-center"
          style={{
            position: "relative",
            justifySelf: "center",
            gap: "0.25rem",
            padding: "0.35rem",
            borderRadius: "999px",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            boxShadow: "0 8px 24px -18px rgba(0,0,0,0.3)",
          }}
        >
          <div
            ref={pillRef}
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "0.35rem",
              left: 0,
              height: "calc(100% - 0.7rem)",
              borderRadius: "999px",
              background: "var(--accent)",
              opacity: 0,
              pointerEvents: "none",
              willChange: "transform, width",
            }}
          />
          {links.map((link) => {
            const isOn = isActive(link.href);
            return (
              <a
                key={link.href}
                ref={(el) => (linkRefs.current[link.href] = el)}
                href={link.href}
                aria-current={isOn ? "page" : undefined}
                style={{
                  position: "relative",
                  zIndex: 1,
                  padding: "0.5rem 1.05rem",
                  borderRadius: "999px",
                  fontWeight: 500,
                  fontSize: "0.94rem",
                  textDecoration: "none",
                  transition: "color 0.25s ease",
                  color: isOn ? "var(--accent-foreground)" : "var(--foreground-secondary)",
                }}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2" style={{ justifySelf: "end" }}>
          <ThemeToggle className="hidden sm:inline-flex" />
          {account && (
            <a
              href={account.href}
              aria-label={account.label || "Account"}
              className="hidden sm:grid place-items-center nlm-btn nlm-btn--ghost"
              style={{ padding: "0.6rem", width: "2.6rem", height: "2.6rem" }}
            >
              <User size={18} />
            </a>
          )}
          {cta && (
            <Button href={cta.href} variant="accent" className="hidden sm:inline-flex">
              {cta.label}
            </Button>
          )}

          <button
            type="button"
            className="nlm-burger md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={toggleMenu}
          >
            <span className="nlm-burger__icons">
              <svg className="nlm-burger__line" viewBox="0 0 448 512" aria-hidden="true">
                <path d="M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z" />
              </svg>
              <svg className="nlm-burger__close" viewBox="0 0 320 512" aria-hidden="true">
                <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" />
              </svg>
            </span>
          </button>
        </div>
      </Container>

      <nav className="nlm-mnav md:hidden" aria-hidden={!open}>
        <ul className="nlm-mnav__list">
          {links.map((link) => (
            <li key={link.href} className="nlm-mnav__item">
              <a
                href={link.href}
                onClick={closeMenu}
                className={isActive(link.href) ? "is-active" : undefined}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="nlm-mnav__footer">
          {cta && (
            <a href={cta.href} onClick={closeMenu} className="nlm-mnav__cta">
              {cta.label}
            </a>
          )}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
