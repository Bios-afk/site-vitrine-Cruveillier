import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const VIDEO_EXT = /\.(mp4|webm|mov|m4v|ogv)(\?.*)?$/i;

export function isVideoSrc(src) {
  return typeof src === "string" && VIDEO_EXT.test(src.trim());
}

export function resolveMedia(media, fallbackAlt = "") {
  if (!media) return null;
  const obj = typeof media === "string" ? { src: media } : { ...media };
  if (!obj.src) return null;
  return {
    ...obj,
    alt: obj.alt ?? fallbackAlt,
    kind: isVideoSrc(obj.src) ? "video" : "image",
  };
}
