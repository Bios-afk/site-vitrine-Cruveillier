import { useEffect, useState } from "react";
import { Sun, Moon } from "./Icons.jsx";

export default function ThemeToggle({ className = "" }) {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
    setMounted(true);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("nlm-theme", next ? "dark" : "light");
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={dark}
      className={`nlm-btn nlm-btn--ghost ${className}`}
      style={{ padding: "0.6rem", width: "2.6rem", height: "2.6rem" }}
    >
      {mounted && (dark ? <Sun size={18} /> : <Moon size={18} />)}
    </button>
  );
}
