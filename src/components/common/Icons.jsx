import IcooniaIcon from "./IcooniaIcon.jsx";

const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" };

export function Spark({ size = 28, className = "", style }) {

  return (
    <svg width={size} height={size} viewBox="0 0 31 31" className={className} style={style} aria-hidden="true">
      <path
        d="M13.87 2.1c.46-1.2.7-1.81 1.03-1.98.29-.15.64-.15.93 0 .33.17.57.78 1.03 1.98l1.96 5.09c.48 1.26.72 1.88 1.1 2.41.33.47.74.88 1.21 1.21.53.38 1.16.62 2.41 1.1l5.09 1.96c1.2.46 1.81.7 1.98 1.03.15.29.15.64 0 .93-.17.33-.78.57-1.98 1.03l-5.09 1.96c-1.26.48-1.88.72-2.41 1.1-.47.33-.88.74-1.21 1.21-.38.53-.62 1.16-1.1 2.41l-1.96 5.09c-.46 1.2-.7 1.81-1.03 1.98-.29.15-.64.15-.93 0-.33-.17-.57-.78-1.03-1.98l-1.96-5.09c-.48-1.26-.72-1.88-1.1-2.41-.33-.47-.74-.88-1.21-1.21-.53-.38-1.16-.62-2.41-1.1L2.1 16.86C.9 16.39.29 16.16.11 15.83c-.15-.29-.15-.64 0-.93.17-.33.78-.57 1.98-1.03l5.09-1.96c1.26-.48 1.88-.72 2.41-1.1.47-.33.88-.74 1.21-1.21.38-.53.62-1.16 1.1-2.41L13.87 2.1Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Play({ size = 18, className = "", style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} style={style} aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

export function ArrowRight({ size = 18, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowUpRight({ size = 18, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

export function Mic({ size = 22, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
    </svg>
  );
}

export function Speaker({ size = 22, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <path d="M4 9v6h4l5 4V5L8 9H4ZM16.5 8.5a5 5 0 0 1 0 7M19 6a8 8 0 0 1 0 12" />
    </svg>
  );
}

export function Search({ size = 18, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

export function User({ size = 18, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20a8 8 0 0 1 16 0" />
    </svg>
  );
}

export function Sun({ size = 18, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

export function Moon({ size = 18, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
    </svg>
  );
}

export function Menu({ size = 22, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function Close({ size = 22, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function Clock({ size = 16, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export function Calendar({ size = 16, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 3v4M16 3v4" />
    </svg>
  );
}

export function Headphones({ size = 22, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
      <rect x="2.5" y="13" width="4" height="7" rx="1.5" />
      <rect x="17.5" y="13" width="4" height="7" rx="1.5" />
    </svg>
  );
}

const BUILTIN = {
  spark: Spark,
  play: Play,
  "arrow-right": ArrowRight,
  "arrow-up-right": ArrowUpRight,
  mic: Mic,
  speaker: Speaker,
  search: Search,
  user: User,
  sun: Sun,
  moon: Moon,
  menu: Menu,
  close: Close,
  clock: Clock,
  calendar: Calendar,
  headphones: Headphones,
};

const ICOONIA_ALIASES = {
  store: "store",
  shop: "store",
  cart: "cart",
  mail: "mail",
  email: "mail",
  phone: "telephone",
  mobile: "calling",
  location: "job-location",
  map: "job-location",
  pin: "job-location",
  video: "file-video",
  star: "star-badge",
  stars: "stars",
  award: "star-award",
  analytics: "analytics",
  timeline: "timeline",
  shield: "shield-mail",
  megaphone: "megaphone",
};

export function Icon({ name, size = 22, className = "", style }) {
  if (!name) return null;
  const Builtin = BUILTIN[name];
  if (Builtin) return <Builtin size={size} className={className} style={style} />;

  const file = ICOONIA_ALIASES[name] || name;
  return <IcooniaIcon name={file} size={size} className={className} style={style} />;
}
