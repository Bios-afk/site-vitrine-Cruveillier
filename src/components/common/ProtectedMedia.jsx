import { useEffect, useRef, useState } from "react";
import { resolveMedia } from "../../lib/utils.js";

export default function ProtectedMedia({
  src,
  alt = "",
  autoPlay = true,
  controls = true,
  className = "",
  imgProps = {},
  videoProps = {},
}) {
  const media = resolveMedia(src, alt);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || media?.kind !== "video") return;

    if (autoPlay) {
      video.muted = true;
      video.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  }, [media?.src, media?.kind, autoPlay]);

  if (!media) return null;

  const blockSave = (e) => e.preventDefault();

  if (media.kind === "video") {
    const togglePlay = async () => {
      const video = videoRef.current;
      if (!video) return;
      if (!video.paused) {
        video.pause();
      } else {
        try {
          await video.play();
        } catch {

        }
      }
    };

    return (
      <div className={`nlm-media ${className}`} onContextMenu={blockSave}>
        <video
          ref={videoRef}
          src={media.src}
          poster={media.poster}
          aria-label={media.alt || undefined}
          loop
          muted={autoPlay}
          playsInline
          preload="metadata"
          controlsList="nodownload noplaybackrate noremoteplayback"
          disablePictureInPicture
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onClick={controls ? togglePlay : undefined}
          {...videoProps}
        />
        {controls && (
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause video" : "Play video"}
            style={btnStyle}
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
        )}
      </div>
    );
  }

  return (
    <div className={`nlm-media ${className}`} onContextMenu={blockSave}>
      <img
        src={media.src}
        alt={media.alt}
        loading="lazy"
        decoding="async"
        draggable={false}
        onDragStart={blockSave}
        {...imgProps}
      />
    </div>
  );
}

const btnStyle = {
  position: "absolute",
  bottom: "0.85rem",
  right: "0.85rem",
  width: "2.5rem",
  height: "2.5rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "999px",
  background: "rgba(255,255,255,0.92)",
  color: "#0b0d07",
  boxShadow: "0 8px 24px -10px rgba(0,0,0,0.5)",
  cursor: "pointer",
  transition: "transform 0.2s ease",
  zIndex: 5,
};

function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
function PauseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
    </svg>
  );
}
